<?php

class CrGame extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'cr_game');
    }

    public function insertCG($cr, $game) {
        $request = "INSERT INTO 'cr_game' ('cr_id', 'game_id') VALUES (:cr, :game)";

        return $this->db->exec($request, array(':cr' => $cr, ':game' => $game));
    }

}
