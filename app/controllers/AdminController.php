<?php

ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

class AdminController extends Controller {

  function afterroute() {

  }

  public function importcr() {
    //liste les types
    $types = new CrType($this->db);
    $this->f3->set('types', $types->find());

    //liste les formats
    $formats = new CrFormat($this->db);
    $this->f3->set('formats', $formats->find());

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
    //header("HTTP/1.1 406 Not Found");

    //print_r($request);
//    exit();

    $GamesID = array();
    $CRID = 0;

    //On check les jeux
    $games = new Game($this->db);

    foreach($request['games'] as $key => $value)
    {
    //  print_r($value);

      //si ID == -1 = saisie manuelle
      if ($value['id'] == -1) {

      }
      else if (isset($value['origin']) && $value['origin'] == 'bdd') { // origin = bdd
        $games->load(array('id = ?', $value['id']));
      }
      else
      {
        $games->load(array('api_uid = ?', $value['id']));
      }


      if($games->id) {
        $GamesID[] = $games->id;

      }
      else
      {

        if ($value['id'] == -1) { $value['id'] = 99999999; }

        //on doit l'ajouter
        $games->reset();
        $games->name = $value['name'];
        $games->api_uid = $value['id'];
        $games->api_image = $value['image']['super_url'];
        $games->api_date = $value['date'];
        $games->save();
        $GamesID[] = $games->id;
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
      echo 'CR déjà en base :) > <a target="_blank" href="/crotypedia/'.$newCR->id.'">voir sur le site</a>';
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
    $newCR->username	= $crProcessed['username'];
    $newCR->content = $crProcessed['content'];
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

    $cr['content'] = $cr['content_raw'];
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
    $divCRtotal = $xpath->query('..//..//..', $divCR)->item(0);

    $cr['hfr_post_id'] = $fragment;
    $cr['content_raw'] = $dom->saveHTML($divCRtotal);

    echo json_encode(array('data' => $cr));

  }

  function APIGames() {

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    $query = $request['term'];
//,platforms:94
    $url = 'http://www.giantbomb.com/api/games/?api_key='.$this->f3->get('giantbombAPI').'&format=json&filter=name:'.urlencode($query).',platforms:94&field_list=id,name,image,original_release_date,expected_release_year&sort=name:asc';

    //echo $url;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $html = curl_exec($ch);
    $manage = (array) json_decode($html);

    foreach($manage['results'] as $k => $result) {

      if($result->original_release_date) $result->date_release = date('Y', strtotime($result->original_release_date));
      if($result->expected_release_year) $result->date_expectd = $result->expected_release_year;

      if (property_exists($result, 'date_expectd') && !property_exists($result, 'date_release')) {
        $result->date = $result->date_expectd;
      }
      else if (!property_exists($result, 'date_expectd') && property_exists($result, 'date_release')) {
        $result->date = $result->date_release;
      }

      if (!property_exists($result, 'date')) {
        unset($manage['results'][$k]);
      }

    }

    $Game = new Game($this->db);

    //print_r(array_values($manage['results']));
    //var_dump($Game->allAPI($query));

    $arrfromDB = $Game->allAPI($query);

    foreach($arrfromDB as $k => $result) {

      $arrfromDB[$k]['image']['super_url'] = $result['api_image'];
    }



    $return['games'] = array_merge($arrfromDB, array_values($manage['results']));
    //$return['index'] = $request['index'];
    //print_r($manage);

    echo json_encode($return);
  }
}
