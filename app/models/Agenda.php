<?php

class Agenda extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'agenda');
    }

    public function addEvent($google_event_id, $streamer, $streamer_id, $game, $date) {
        return $this->db->exec(
            'INSERT INTO `agenda`(`google_event_id`, `streamer`, `streamer_id`, `game`, `date`) VALUES (:google_event_id ,:streamer, :streamer_id, :game, :date)',
            array(':google_event_id' => $google_event_id,
                ':streamer' => $streamer,
                ':streamer_id' => $streamer_id,
                ':game' => $game,
                ':date' => $date)
        );
    }
}
