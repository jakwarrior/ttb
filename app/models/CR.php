<?php

class CR extends DB\SQL\Mapper
{
    private $f3;

    public function __construct(DB\SQL $db)
    {
        parent::__construct($db, 'cr');
        $this->f3 = \Base::instance();
    }

    public function all($limit = 0)
    {
        $request =
            'SELECT cr.id AS id, cr.username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, IF(cr.hfr_user_id = 1, \'\', cr.comment)  as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted, cr.hfr_post_id' .
            ', g.name AS name, g.api_image AS api_image' .
            ' FROM cr as cr' .
            ' INNER JOIN cr_game as cg' .
            ' ON cr.id = cg.cr_id' .
            ' INNER JOIN game as g' .
            ' ON g.id = cg.game_id' .
            ' INNER JOIN cr_type as ct' .
            ' ON ct.id = cr.type_id' .
            ' INNER JOIN cr_format as cf' .
            ' ON cf.id = cr.format_id' .
            ' GROUP BY cr.id, g.id' .
            ' ORDER BY cr.date_posted DESC' .
            ' LIMIT :limit';

        return $this->db->exec($request, array(':limit' => $limit));

    }


    public function byGame($idGame)
    {
        $Res = 'SELECT cr.id AS id, cr.username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, IF(cr.hfr_user_id = 1, \'\', cr.comment)  as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted, cr.hfr_post_id' .
            ' FROM cr as cr' .
            ' INNER JOIN cr_game as cg' .
            ' ON cr.id = cg.cr_id' .
            ' INNER JOIN game as g' .
            ' ON g.id = cg.game_id' .
            ' INNER JOIN cr_type as ct' .
            ' ON ct.id = cr.type_id' .
            ' INNER JOIN cr_format as cf' .
            ' ON cf.id = cr.format_id' .
            ' WHERE g.id = ?' .
            ' GROUP BY cr.id, g.id' .
            ' ORDER BY cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC';


        return $this->db->exec($Res, $idGame);
    }

    public function byUserName($userName)
    {
        $Res = 'SELECT cr.id AS id, cr.username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, IF(cr.hfr_user_id = 1, \'\', cr.comment)  as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted, cr.hfr_post_id' .
            ', g.api_image AS api_image' .
            ' FROM cr as cr' .
            ' INNER JOIN cr_game as cg' .
            ' ON cr.id = cg.cr_id' .
            ' INNER JOIN game as g' .
            ' ON g.id = cg.game_id' .
            ' INNER JOIN cr_type as ct' .
            ' ON ct.id = cr.type_id' .
            ' INNER JOIN cr_format as cf' .
            ' ON cf.id = cr.format_id' .
            ' WHERE cr.username = :userName' .
            ' GROUP BY cr.id, g.id' .
            ' ORDER BY cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC';

        return $this->db->exec($Res, array(':userName' => htmlentities($userName)));
    }

    public function byHFRUserId($hfr_user_id)
    {
        $Res = 'SELECT cr.id AS id, cr.username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, IF(cr.hfr_user_id = 1, \'\', cr.comment)  as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted, cr.hfr_post_id' .
            ', g.api_image AS api_image' .
            ' FROM cr as cr' .
            ' INNER JOIN cr_game as cg' .
            ' ON cr.id = cg.cr_id' .
            ' INNER JOIN game as g' .
            ' ON g.id = cg.game_id' .
            ' INNER JOIN cr_type as ct' .
            ' ON ct.id = cr.type_id' .
            ' INNER JOIN cr_format as cf' .
            ' ON cf.id = cr.format_id' .
            ' WHERE cr.hfr_user_id = :userId' .
            ' GROUP BY cr.id, g.id' .
            ' ORDER BY cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC';

        return $this->db->exec($Res, array(':userId' => $hfr_user_id));
    }

    public function byId($idCR)
    {

        $Res = 'SELECT cr.id AS id, cr.username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, IF(cr.hfr_user_id = 1, \'\', cr.comment)  as comment, ct.name as type, cf.name as format, cr.date_posted as date_posted, cr.content as content, cr.hfr_post_id' .
            ' FROM cr as cr' .
            ' INNER JOIN cr_game as cg' .
            ' ON cr.id = cg.cr_id' .
            ' INNER JOIN game as g' .
            ' ON g.id = cg.game_id' .
            ' INNER JOIN cr_type as ct' .
            ' ON ct.id = cr.type_id' .
            ' INNER JOIN cr_format as cf' .
            ' ON cf.id = cr.format_id' .
            ' WHERE cr.id = ?' .
            ' GROUP BY cr.id' .
            ' ORDER BY cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC';

        return $this->db->exec($Res, $idCR);
    }

    public function byAlpha()
    {
        return $this->db->exec(
            'SELECT  cr.id AS id, cr.username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games, IF(cr.hfr_user_id = 1, \'\', cr.comment) AS comment, ct.name as type, cf.name as format, cr.date_posted as date_posted, cr.hfr_post_id' .
            ' FROM cr as cr' .
            ' INNER JOIN cr_game as cg' .
            ' ON cr.id = cg.cr_id' .
            ' INNER JOIN game as g' .
            ' ON g.id = cg.game_id' .
            ' INNER JOIN cr_type as ct' .
            ' ON ct.id = cr.type_id' .
            ' INNER JOIN cr_format as cf' .
            ' ON cf.id = cr.format_id' .
            ' GROUP BY cr.id, g.id' .
            ' ORDER BY g.name ASC, cr.username ASC, cr.date_posted ASC, cr.comment ASC, ct.id ASC, cf.id ASC', NULL, 86400
        );
    }

    public function updateCR($idCR, $content) {
        if ($this->f3->exists('SESSION.login_string') && $this->f3->exists('SESSION.hfr_user_id')) {
            $login_string = $this->f3->get('SESSION.login_string');
            $user_browser = $this->f3->get('SERVER.HTTP_USER_AGENT');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';
            $result = $this->db->exec($request, array(':user_id' => $this->f3->get('SESSION.hfr_user_id')));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password'] . $user_browser);

                if (($login_check == $login_string)) {
                    $request = 'UPDATE cr SET content = :content WHERE id = :idCR';
                    $result = $this->db->exec($request, array(':content' => $content, ':idCR' => $idCR));

                    if ($result == 1) {
                        return "OK";
                    } else {
                        return "problem";
                    }
                } else {
                    return "problem";
                }
            } else {
                return "problem";
            }
        } else {
            return "problem";
        }
    }

    public function processRawContent($cr)
    {

        $processCR = array();

        //Raw HTML to DOM/XPATH
        $dom = new DOMDocument();

        $searchPage = mb_convert_encoding($cr['content_raw'], 'HTML-ENTITIES', "UTF-8");
        @$dom->loadHTML($searchPage);
        @$xpath = new DomXpath($dom);

        $processCR['content_raw'] = $cr['content_raw'];

        //userID :
        $divProfil = $xpath->query('//td[@class = "messCase2"]//a[contains(@href, "profil-")]');

        if ($divProfil->length == 0) { //pas de profil
            $processCR['hfr_user_id'] = 1;
        } else {
            $processCR['hfr_user_id'] = $divProfil->item(0)->getAttribute('href');
            $processCR['hfr_user_id'] = preg_replace("/[^0-9]+/", "", $processCR['hfr_user_id']);
        }

        //echo $processActu['hfr_user_id']."<br>";

        //post ID
        $processCR["hfr_post_id"] = $xpath->query('//a[contains(@href, "#t")]')->item(0)->getAttribute('href');
        $processCR['hfr_post_id'] = str_replace("#t", "", $processCR["hfr_post_id"]);

        //pseudo :
        $processCR['username'] = $xpath->query('//td[@class = "messCase1"]//b[@class = "s2"]')->item(0)->textContent;
        $processCR['username'] = preg_replace('/[^(\x20-\x7F)]*/', '', htmlentities($processCR['username']));

        //date posted
        $divDate = $xpath->query('//div[@class="toolbar"]/div[@class="left"]');
        $oldate = preg_replace("/[^0-9:-]+/", "", $divDate->item(0)->nodeValue);
        $processCR['date_posted'] = date('Y-m-d H:i', strtotime($oldate));
        //echo $crDatePosted.' ';

        //le contenu du CR
        $divCR = $xpath->query('//div[@id = "para' . $processCR['hfr_post_id'] . '"]/node()');
        //print_r($divCR);

        $processHTMLstep1 = '';

        foreach ($divCR as $node) {
            //var_dump($actuNode);
            //echo $dom->saveHTML($actuNode)."\n";

            if ($node->nodeType == XML_ELEMENT_NODE && ($node->getAttribute('class') == 'edited' ||
                    $node->getAttribute('class') == 'signature' ||
                    $node->getAttribute('style') == 'clear: both;')
            ) {
                continue;
            }

            if ($node->nodeValue || $node->childNodes) {
                $processHTMLstep1 .= htmlentities($dom->saveHTML($node));
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

        $processHTMLfinal = html_entity_decode($processHTMLfinal);

        $processCR['content'] = $processHTMLfinal;


        return $processCR;
    }
}
