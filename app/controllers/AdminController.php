<?php

ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

class AdminController extends Controller {

  function afterroute() {

  }

  public function importcr() {
    $this->f3->set('admin_cat', 'Import CR');
    $this->f3->set('view','admin/importcr.htm');
    echo Template::instance()->render('admin.htm');
  }

  public function APICrImport() {

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    ob_start();
    $this->APICrParseInternal($request);
    $myStr = ob_get_contents();
    ob_end_clean();

    $cr = json_decode($myStr, true)['data'];

    //print_r($request);
    //print_r($cr);
    header("HTTP/1.1 406 Not Found");
    echo "STOP IT";
    exit();

    $GamesID = array();
    $CRID = 0;

    //On check les jeux
    $games = new Game($this->db);

    foreach($request['games']['games'] as $key => $value)
    {
      //print_r($value);

      $games->load(array('name = ?', $value['name']));

      if($games->id) {
        $GamesID[] = $games->id;

      }
      else
      {
        //on doit l'ajouter
        $games->reset();
        $games->name = $value['name'];
        $games->save();
        $GamesID[] = $games->id;
      }

      $games->reset();

    }

    //print_r($GamesID);

    //On ajoute le CR
    $CRs = new CR($this->db);

    //on vérfie si il est pas déjà en base
    $CRs->load(array('hfr_post_id = ?', $cr['hfr_post_id']));
    if ($CRs->id) {
      header("HTTP/1.1 405 Not Found");
      echo 'CR déjà en base :) > <a target="_blank" href="/crotypedia/'.$CRs->id.'">voir sur le site</a>';
      exit();
    }
    $CRs->reset();

    $CRs->hfr_cat_id = 5;
    $CRs->hfr_subcat_id = 249;
    $CRs->hfr_topic_id = 177180;
    $CRs->hfr_page_id = $cr['hfr_page_id'];
    $CRs->hfr_post_id = $cr['hfr_post_id'];
    $CRs->hfr_user_id = $cr['hfr_user_id'];
    $CRs->username	= $cr['username'];
    $CRs->content = $cr['content'];
    $CRs->date_posted = $cr['date_posted'];
    $CRs->date_modified = date('Y-m-d H:i:s');
    $CRs->date_added = date('Y-m-d H:i:s');

    $CRs->save();
    $CRID = $CRs->id;

    $CRs->reset();
    //On ajoute en DB

    $CrGame = new CrGame($this->db);

    foreach($GamesID as $gid) {
      $CrGame->cr_id = $CRID;
      $CrGame->game_id = $gid;
      $CrGame->save();
      $CrGame->reset();
    }

    echo 'CR ajouté > <a target="_blank" href="/crotypedia/'.$CRID.'">voir sur le site</a>';
  }


  public function APICrParse() {

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
      echo 'CR déjà en base :) > <a target="_blank" href="/crotypedia/'.$CRs->id.'">voir sur le site</a>';
      exit();
    }

    $this->f3->set('cr', $cr);
    echo Template::instance()->render('cr/view.htm');
  }


  public function APICrParseInternal($request) {
    //On va récupérer les messages :
    $url = $request['cr_url'];

    $urlf=parse_url($url);
    $fragment = $urlf["fragment"]; //This variable contains the fragment
    $fragment = str_replace('t', '', $fragment);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $html = curl_exec($ch);


    libxml_use_internal_errors(true);

    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    @$xpath = new DomXpath($dom);

    $divCR = $xpath->query('//div[@id = "para'.$fragment.'"]')->item(0);
    $divCRtotal = $xpath->query('..//..', $divCR)->item(0);

    //$cr['content'] = $dom->saveHTML($divCRtotal);

    //PageID
    $pageUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    preg_match_all('!\d+!', $pageUrl, $matches);
    $cr['hfr_page_id'] = $matches[0][1];

    //postID
    $cr['hfr_post_id'] = $fragment;
    //echo $crPostID.' ';

    //userID :
    $crUserID = $xpath->query('td[@class = "messCase2"]//a[contains(@href, "profil-")]', $divCRtotal)->item(0)->getAttribute('href');
    $cr['hfr_user_id'] = preg_replace("/[^0-9]+/", "", $crUserID);
    //echo $crUserID;

    //pseudo :
    $cr['username'] = $xpath->query('td[@class = "messCase1"]//b[@class = "s2"]', $divCRtotal)->item(0)->textContent;
    //echo $crPseudo.' ';

    //content
    $cr['content'] = trim($dom->saveHTML($divCR));

    //date posted
    $divDate = $xpath->query('td[@class = "messCase2"]//div[@class="toolbar"]/div[@class="left"]', $divCRtotal);
    $oldate = preg_replace("/[^0-9:-]+/", "", $divDate->item(0)->nodeValue);
    $cr['date_posted'] = date('Y-m-d H:i', strtotime($oldate));
    //echo $crDatePosted.' ';

    //print_r($cr);



    echo json_encode(array('data' => $cr));

  }

  function APIGames() {

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    $query = $request['term'];
//,platforms:94
    $url = 'http://www.giantbomb.com/api/games/?api_key='.$this->f3->get('giantbombAPI').'&format=json&filter=name:'.$query.',platforms:94&field_list=id,name,image,original_release_date,expected_release_year&sort=name:asc';

    //echo $url;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $html = curl_exec($ch);
    $manage = (array) json_decode($html);

    $return['games'] = $manage['results'];
    $return['index'] = $request['index'];
    //print_r($manage);

    echo json_encode($return);
  }
}
