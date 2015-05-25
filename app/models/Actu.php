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
  			' ORDER by a.date_posted DESC, a.id DESC'.
            ' LIMIT :limit';

        return $this->db->exec($request, array(':limit' => $limit));
    }

    public function byHFRUserId($hfr_user_id, $limit = 0) {
        $request =
            'SELECT *'.
            ' FROM actu as a'.
            ' WHERE active = 1'.
            ' AND hfr_user_id = :userId'.
            ' ORDER by a.date_posted DESC, a.id DESC'.
            ' LIMIT :limit';

        return $this->db->exec($request, array(':userId' => $hfr_user_id, ':limit' => $limit));
    }
}
