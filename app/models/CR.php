<?php

class CR extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'cr');
    }

    public function all() {
		return $this->db->exec(
			'SELECT cr.id AS id, username AS username, GROUP_CONCAT( g.name SEPARATOR \', \') as games'.
			' FROM cr as cr'.
			' INNER JOIN cr_game as cg'.
			' ON cr.id = cg.cr_id'.
			' INNER JOIN game as g'.
			' ON g.id = cg.game_id'.
			' GROUP BY cr.id'.
			' ORDER BY cr.id DESC'
		);
    }

}