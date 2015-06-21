<?php

class Agenda extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'agenda');
    }

    public function addEvent($google_event_id, $streamer, $streamer_id, $game, $date, $completeDate) {
        return $this->db->exec(
            'INSERT INTO `agenda`(`google_event_id`, `streamer`, `streamer_id`, `game`, `date`, `completeDate`) VALUES (:google_event_id ,:streamer, :streamer_id, :game, :date, :completeDate)',
            array(':google_event_id' => $google_event_id,
                ':streamer' => $streamer,
                ':streamer_id' => $streamer_id,
                ':game' => $game,
                ':date' => $date,
                ':completeDate' => $completeDate)
        );
    }

    public function getListStreamFromNow() {
        return $this->db->exec('SELECT * FROM agenda a WHERE a.completeDate >= ?  ORDER by a.completeDate ASC LIMIT 4', date('Y-m-d'));
    }
}
