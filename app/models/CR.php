<?php

class CR extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'cr');
    }

    public function all($limit = 0) {
      $request =
        'SELECT cr.id AS id, username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, cr.comment as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted'.
        ' FROM cr as cr'.
        ' INNER JOIN cr_game as cg'.
        ' ON cr.id = cg.cr_id'.
        ' INNER JOIN game as g'.
        ' ON g.id = cg.game_id'.
        ' INNER JOIN cr_type as ct'.
        ' ON ct.id = cr.type_id'.
        ' INNER JOIN cr_format as cf'.
        ' ON cf.id = cr.format_id'.
        ' GROUP BY cr.id'.
        ' ORDER BY cr.date_posted DESC';

      if ($limit > 0) {
        $request .= ' LIMIT '.$limit;
      }

      return $this->db->exec($request);

    }



    public function byGame($idGame) {
      return $this->db->exec(
        'SELECT cr.id AS id, username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, cr.comment as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted'.
        ' FROM cr as cr'.
        ' INNER JOIN cr_game as cg'.
        ' ON cr.id = cg.cr_id'.
        ' INNER JOIN game as g'.
        ' ON g.id = cg.game_id'.
        ' INNER JOIN cr_type as ct'.
        ' ON ct.id = cr.type_id'.
        ' INNER JOIN cr_format as cf'.
        ' ON cf.id = cr.format_id'.
        ' WHERE g.id = "'.$idGame.'"'.
        ' GROUP BY cr.id'.
        ' ORDER BY cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC'
      );
    }

    public function byAlpha() {
      return $this->db->exec(
        'SELECT cr.id AS id, username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, cr.comment as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted'.
        ' FROM cr as cr'.
        ' INNER JOIN cr_game as cg'.
        ' ON cr.id = cg.cr_id'.
        ' INNER JOIN game as g'.
        ' ON g.id = cg.game_id'.
        ' INNER JOIN cr_type as ct'.
        ' ON ct.id = cr.type_id'.
        ' INNER JOIN cr_format as cf'.
        ' ON cf.id = cr.format_id'.
        ' GROUP BY cr.id'.
        ' ORDER BY g.name ASC, cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC'
      );
    }


    public function processRawContent($cr) {

      $processCR = array();

      //Raw HTML to DOM/XPATH
      $dom = new DOMDocument();

      $searchPage = mb_convert_encoding($cr['content_raw'], 'HTML-ENTITIES', "UTF-8");
      @$dom->loadHTML($searchPage);
      @$xpath = new DomXpath($dom);

      $processCR['content_raw'] = $cr['content_raw'];

      //userID :
      $divProfil = $xpath->query('//td[@class = "messCase2"]//a[contains(@href, "profil-")]');

      if($divProfil->length == 0) { //pas de profil
        $processCR['hfr_user_id'] = 1;
      }
      else {
        $processCR['hfr_user_id'] = $divProfil->item(0)->getAttribute('href');
        $processCR['hfr_user_id'] = preg_replace("/[^0-9]+/", "", $processCR['hfr_user_id']);
      }

      //echo $processActu['hfr_user_id']."<br>";

      //post ID
      $processCR["hfr_post_id"] = $xpath->query('//a[contains(@href, "#t")]')->item(0)->getAttribute('href');
      $processCR['hfr_post_id'] = str_replace("#t", "", $processCR["hfr_post_id"]);

      //pseudo :
      $processCR['username'] = $xpath->query('//td[@class = "messCase1"]//b[@class = "s2"]')->item(0)->textContent;
      //echo $processActu['username']."<br>";


      //date posted
      $divDate = $xpath->query('//div[@class="toolbar"]/div[@class="left"]');
      $oldate = preg_replace("/[^0-9:-]+/", "", $divDate->item(0)->nodeValue);
      $processCR['date_posted'] = date('Y-m-d H:i', strtotime($oldate));
      //echo $crDatePosted.' ';

      //le contenu du CR
      $divCR = $xpath->query('//div[@id = "para'.$processCR['hfr_post_id'].'"]/node()');
      //print_r($divCR);

      $processHTMLstep1 = '';

      foreach ($divCR as $node)
      {
        //var_dump($actuNode);
        //echo $dom->saveHTML($actuNode)."\n";

        if ($node->nodeType == XML_ELEMENT_NODE && ($node->getAttribute('class') == 'edited' ||
            $node->getAttribute('class') == 'signature' ||
            $node->getAttribute('style') == 'clear: both;' )
            ) {
          continue;
        }

        if ($node->nodeValue) {
          $processHTMLstep1.=htmlentities($dom->saveHTML($node));
        }
      }

      $processHTMLfinal = $processHTMLstep1;


      $processHTMLfinal = str_replace("\n", '', $processHTMLfinal);
      $processHTMLfinal = str_replace("\r", '', $processHTMLfinal);
      $processHTMLfinal = htmlentities(str_replace('href="/hfr/', 'target="_blank" href="http://forum.hardware.fr/hfr/', html_entity_decode($processHTMLfinal)));
      $processHTMLfinal = htmlentities(preg_replace('/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/i', '', html_entity_decode($processHTMLfinal)));
      $processHTMLfinal = htmlentities(preg_replace('/onload="[^\"]+"/i', 'onload="return;"', html_entity_decode($processHTMLfinal)));
      $processHTMLfinal = htmlentities(preg_replace('/title="[^\"]+"/i', '', html_entity_decode($processHTMLfinal)));


      $processHTMLfinal = str_replace("hfr-rehost.net/", 'reho.st/', $processHTMLfinal);
      $processHTMLfinal = htmlentities(str_replace("<p><br></p>", '', html_entity_decode($processHTMLfinal)));

      $processCR['content'] = $processHTMLfinal;


      return $processCR;
    }
}
