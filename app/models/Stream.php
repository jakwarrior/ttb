<?php

class Stream extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'stream');
    }

    public function byUserName($userName) {

      return $this->db->exec(
        'SELECT *'.
        ' FROM stream s'.
        ' WHERE s.username = ?',
        $userName
      );
    }
}
