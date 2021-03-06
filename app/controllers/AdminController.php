<?php

/*ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");*/

require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

class AdminController extends Controller
{

    function afterroute()
    {

    }

    public function importcr()
    {

        if (!($this->f3->exists('COOKIE.pwd_string')) || !($this->f3->exists('COOKIE.username'))) {
            $this->f3->reroute('@auth');
        } else {
            $utils = new Utils();
            $utils->updateCookies();

            $user = new User($this->db);

            //liste les types
            $types = new CrType($this->db);
            $this->f3->set('types', $types->find());

            //liste les formats
            $formats = new CrFormat($this->db);
            $this->f3->set('formats', $formats->find());

            $check = $user->loginCheck();

            if (count($check) == 2) {
                $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
                $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
            }

            $this->f3->set('includeJsCssImportCr', 'true');
            $this->f3->set('includeJsCssAccount', 'true');
            $this->f3->set('admin_cat', 'Import CR');
            $this->f3->set('view', 'admin/importcr.htm');
            $this->f3->set('site_title', 'Import CR — TTB');
            echo Template::instance()->render('layout.htm');
        }
    }

    public function APICrImport()
    {

        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata, true);

        ob_start();
        $this->APICrParseInternal($request);
        $myStr = ob_get_contents();
        ob_end_clean();

        $cr = json_decode($myStr, true)['data'];

        //print_r($request);
        //print_r($cr);
        //header("HTTP/1.1 406 Not Found");

        //print_r($request);
//    exit();

        $GamesID = array();
        $CRID = 0;

        //On check les jeux
        $games = new Game($this->db);

        foreach ($request['games'] as $key => $value) {
            //  print_r($value);

            //si ID == -1 = saisie manuelle
            if ($value['id'] == -1) {

            } else if (isset($value['origin']) && $value['origin'] == 'bdd') { // origin = bdd
                $games->load(array('id = ?', $value['id']));
            } else {
                $games->load(array('api_uid = ?', $value['id']));
            }


            if ($games->id) {
                $GamesID[] = $games->id;
                $tmpGame = $games->name;

            } else {

                if ($value['id'] == -1) {
                    $value['id'] = 99999999;
                }

                //on doit l'ajouter
                $games->reset();
                $games->name = $value['name'];
                $games->api_uid = $value['id'];
                $games->api_image = $value['image']['super_url'];
                $games->api_date = $value['date'];
                $games->save();
                $GamesID[] = $games->id;
                $tmpGame = $games->name;
            }

            $games->reset();

        }

        //print_r($GamesID);

        //On ajoute le CR
        $newCR = new CR($this->db);

        //on vérfie si il est pas déjà en base
        $newCR->load(array('hfr_post_id = ?', $cr['hfr_post_id']));
        if ($newCR->id) {
            header("HTTP/1.1 405 Not Found");
            echo 'CR déjà en base :) > <a target="_blank" href="/crotypedia/' . $newCR->id . '">voir sur le site</a>';
            exit();
        }
        $newCR->reset();

        $crProcessed = $newCR->processRawContent($cr);


        //print_r($crProcessed);

        $newCR->hfr_cat_id = 5;
        $newCR->hfr_subcat_id = 249;
        $newCR->hfr_topic_id = 177180;
        //$newCR->hfr_page_id = $crProcessed['hfr_page_id'];
        $newCR->hfr_post_id = $crProcessed['hfr_post_id'];
        $newCR->hfr_user_id = $crProcessed['hfr_user_id'];
        $newCR->username = $crProcessed['username'];
        $tmpUsername = $newCR->username;
        $newCR->content = htmlentities($crProcessed['content']);
        $newCR->content_raw = $crProcessed['content_raw'];
        $newCR->date_posted = $crProcessed['date_posted'];
        $newCR->date_modified = date('Y-m-d H:i:s');
        $newCR->date_added = date('Y-m-d H:i:s');
        $newCR->active = 1;

        $newCR->type_id = $request['type'];
        $newCR->format_id = $request['format'];
        $newCR->comment = $request['comment'];

        $newCR->save();
        $CRID = $newCR->id;

        $newCR->reset();
        //On ajoute en DB

        $CrGame = new CrGame($this->db);

        foreach ($GamesID as $gid) {
            $CrGame->cr_id = $CRID;
            $CrGame->game_id = $gid;
            $CrGame->save();
            $CrGame->reset();
        }

        if ($this->f3->get('enableTwitter') == "true") {

            $connection = new TwitterOAuth($this->f3->get('consumerKey'), $this->f3->get('consumerSecret'), $this->f3->get('accessToken'), $this->f3->get('accessTokenSecret'));
            $connection->get("account/verify_credentials");

            $configuration = $connection->get("help/configuration");

            if (isset($configuration->short_url_length)) {

                $nbChar = 280 - $configuration->short_url_length - 3;
                $CR = "CR de " . $tmpGame . " par " . $tmpUsername;

                if (strlen($CR) > ($nbChar + 3)) {
                    $CR2 = substr($CR, 0, $nbChar);
                    $CR2 .= "..|";
                } else {
                    $CR2 = $CR;
                    $CR2 .= " | ";
                }

                $tweet = $CR2 . "http://www.thetartuffebay.org/crotypedia/" . $CRID;
                $connection->post("statuses/update", array("status" => $tweet));
            }
        }

        echo 'CR ajouté > <a target="_blank" href="/crotypedia/' . $CRID . '">voir sur le site</a>';
    }


    public function APICrParse()
    {

        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata, true);

        ob_start();
        $this->APICrParseInternal($request);
        $myStr = ob_get_contents();
        ob_end_clean();

        $cr = json_decode($myStr, true)['data'];

        //print_r($cr);

        //on vérifie si il est pas déjà en base
        $CRs = new CR($this->db);

        $CRs->load(array('hfr_post_id = ?', $cr['hfr_post_id']));
        if ($CRs->id) {
            header("HTTP/1.1 405 Not Found");
            echo 'CR déjà en base :) > <a target="_blank" href="/crotypedia/' . $CRs->id . '">voir sur le site</a>';
            exit();
        }

        $cr['content'] = $cr['content_raw'];
        $this->f3->set('cr', $cr);
        echo Template::instance()->render('cr/view.htm');
    }


    public function APICrParseInternal($request)
    {
        //On va récupérer les messages :
        $url = $request['cr_url'];

        $urlf = parse_url($url);
        $fragment = $urlf["fragment"]; //This variable contains the fragment
        $fragment = str_replace('t', '', $fragment);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        $html = curl_exec($ch);


        libxml_use_internal_errors(true);

        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        @$xpath = new DomXpath($dom);


        $divCR = $xpath->query('//div[@id = "para' . $fragment . '"]')->item(0);
        $divCRtotal = $xpath->query('..//..//..', $divCR)->item(0);

        $cr['hfr_post_id'] = $fragment;
        $cr['content_raw'] = $dom->saveHTML($divCRtotal);

        echo json_encode(array('data' => $cr));

    }

    function APIGames()
    {

        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata, true);

        $query = $request['term'];
//,platforms:94
        $url = 'http://www.giantbomb.com/api/games/?api_key=' . $this->f3->get('giantbombAPI') . '&format=json&filter=name:' . urlencode($query) . ',platforms:94&field_list=id,name,image,original_release_date,expected_release_year&sort=name:asc';

        $context = stream_context_create(['http' => ['user_agent' => 'TheTartuffeBayFaitUneRequeteAGiantBomb']]);
        $response = file_get_contents($url, false, $context);

        //$ch = curl_init();
        //curl_setopt($ch, CURLOPT_URL, $url);
        //curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        //curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 100);
        //curl_setopt($ch, CURLOPT_TIMEOUT, 100);
        //curl_setopt($ch, CURLOPT_USERAGENT,'TheTartuffeBayFaitUneRequeteAGiantBomb');

        //$html = curl_exec($ch);
        //error_log($html);
        $manage = (array)json_decode($response);
        //error_log( print_r($manage, TRUE) );

        //unset($manage);
        //error_log(isset($manage['results']));

        if (isset($manage['results'])) {
            error_log("pas proxy");
            foreach ($manage['results'] as $k => $result) {

                if ($result->original_release_date) $result->date_release = date('Y', strtotime($result->original_release_date));
                if ($result->expected_release_year) $result->date_expectd = $result->expected_release_year;

                if (property_exists($result, 'date_expectd') && !property_exists($result, 'date_release')) {
                    $result->date = $result->date_expectd;
                } else if (!property_exists($result, 'date_expectd') && property_exists($result, 'date_release')) {
                    $result->date = $result->date_release;
                }

                if (!property_exists($result, 'date')) {
                    unset($manage['results'][$k]);
                }
            }
        } else {
            error_log("proxy");
            // si erreur, on tente de passer par un proxy pour faire la requête
            $proxy_host = '88.185.161.92:8432';

            // curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
            //curl_setopt($ch, CURLOPT_PROXY, $proxy_host);
            //curl_setopt($ch, CURLOPT_URL, $url);

            //curl_setopt($ch, CURLOPT_PROXY, '88.185.161.92');
            //curl_setopt($ch, CURLOPT_PROXYPORT, '8432');

            $opts = array(
                'http'=>array(
                    'method'=>"GET",
                    'proxy' => 'tcp://88.185.161.92:8432',
                    'request_fulluri' => true,
                    'user_agent' => 'TheTartuffeBayFaitUneRequeteAGiantBomb',
                )
            );

            $context = stream_context_create($opts);

            $response = file_get_contents($url, false, $context);
            //error_log($response);

            //$html = curl_exec($ch);
            //error_log($html);
            $manage = (array)json_decode($response);

            if (isset($manage['results'])) {
                foreach ($manage['results'] as $k => $result) {

                    if ($result->original_release_date) $result->date_release = date('Y', strtotime($result->original_release_date));
                    if ($result->expected_release_year) $result->date_expectd = $result->expected_release_year;

                    if (property_exists($result, 'date_expectd') && !property_exists($result, 'date_release')) {
                        $result->date = $result->date_expectd;
                    } else if (!property_exists($result, 'date_expectd') && property_exists($result, 'date_release')) {
                        $result->date = $result->date_release;
                    }

                    if (!property_exists($result, 'date')) {
                        unset($manage['results'][$k]);
                    }

                }
            } else {
                $manage = array("results" => array());
            }
        }

        $Game = new Game($this->db);

        //print_r(array_values($manage['results']));
        //var_dump($Game->allAPI($query));

        $arrfromDB = $Game->allAPI($query);

        foreach ($arrfromDB as $k => $result) {

            $arrfromDB[$k]['image']['super_url'] = $result['api_image'];
        }


        $return['games'] = array_merge($arrfromDB, array_values($manage['results']));
        //$return['index'] = $request['index'];
        //print_r($manage);

        unset($manage);

        echo json_encode($return);
    }
}
