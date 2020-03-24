<?php

class RSS extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'cr');
    }

    public function all() {
/*      $request =
        'SELECT p.id, p.hfr_post_id, p.username, p.date_posted, p.content, p.type, p.games'.
        ' FROM ('.
        ' (SELECT c.id, c.hfr_post_id AS hfr_post_id, IF(c.hfr_user_id = 1, c.comment, c.username) AS username, c.date_posted as date_posted, c.content as content, "cr" as type, GROUP_CONCAT( g.name SEPARATOR \', \') as games FROM cr c'.
        ' INNER JOIN cr_game as cg'.
        ' ON c.id = cg.cr_id'.
        ' INNER JOIN game as g'.
        ' ON g.id = cg.game_id'.
        ' GROUP BY c.id ORDER BY c.date_posted DESC LIMIT 20)'.
        ' UNION'.
        ' (SELECT a.id, a.hfr_post_id AS hfr_post_id, a.username as username, a.date_posted as date_posted, a.content as content, "actu" as type, "" as games FROM actu a WHERE a.active = 1 AND username != "ravenloft" ORDER BY a.date_posted DESC LIMIT 20)'.
        ' ) as p'.
        ' ORDER BY p.date_posted DESC';*/

        $request =
            'SELECT p.id, p.hfr_post_id, p.username, p.date_posted, p.content, p.type, p.games'.
            ' FROM ('.
            ' (SELECT c.id, c.hfr_post_id AS hfr_post_id, IF(c.hfr_user_id = 1, c.comment, c.username) AS username, c.date_posted as date_posted, c.content as content, "cr" as type, GROUP_CONCAT( g.name SEPARATOR \', \') as games FROM cr c'.
            ' INNER JOIN cr_game as cg'.
            ' ON c.id = cg.cr_id'.
            ' INNER JOIN game as g'.
            ' ON g.id = cg.game_id'.
            ' GROUP BY c.id ORDER BY c.date_posted DESC LIMIT 20)'.
            ' UNION'.
            ' (SELECT a.id, a.hfr_post_id AS hfr_post_id, a.username as username, a.date_posted as date_posted, a.content as content, "actu" as type, "" as games FROM actu a WHERE a.active = 1 ORDER BY a.date_posted DESC LIMIT 20)'.
            ' ) as p'.
            ' ORDER BY p.date_posted DESC';

        return $this->rss_post_treatment($this->db->exec($request));
    }

    private function rss_post_treatment($rss) {
        foreach ($rss as $subKey  => $subArray) {
            $subArray['content'] = html_entity_decode($subArray['content']);

            $rss[$subKey] = $subArray;
        }

        return $rss;
    }

}
