<?php

class Actu extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'actu');
    }

    public function all($limit = 0) {
  		$request =
  			'SELECT *'.
  			' FROM actu as a'.
        ' WHERE active = 1'.
  			' ORDER by a.date_posted DESC, a.id DESC';

  		if ($limit > 0) {
  			$request .= ' LIMIT '.$limit;
  		}

		  return $this->db->exec($request);
    }

}
