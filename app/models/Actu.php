<?php

class Actu extends DB\SQL\Mapper {

    private $utils;

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'actu');
        $this->utils = new Utils();
    }

    public function all($limit = 0) {
  		$request =
  			'SELECT *'.
  			' FROM actu as a'.
            ' WHERE active = 1'.
  			' ORDER by a.date_posted DESC, a.id DESC'.
            ' LIMIT :limit';

        return $this->utils->content_post_treatment($this->db->exec($request, array(':limit' => $limit)));
    }
}
