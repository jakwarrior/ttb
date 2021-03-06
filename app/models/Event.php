<?php

class Event extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'event');
    }

    public function addEvent($google_event_id, $streamer, $streamer_id, $game, $date, $completeDate, $url) {
        return $this->db->exec(
            'INSERT INTO `event`(`google_event_id`, `streamer`, `streamer_id`, `game`, `date`, `completeDate`, `url`) VALUES (:google_event_id ,:streamer, :streamer_id, :game, :date, :completeDate, :url)',
            array(':google_event_id' => $google_event_id,
                ':streamer' => $streamer,
                ':streamer_id' => $streamer_id,
                ':game' => $game,
                ':date' => $date,
                ':completeDate' => $completeDate,
                ':url' => $url)
        );
    }

    public function getListEvents($limit = 0) {
        return $this->db->exec('SELECT * FROM event a WHERE a.completeDate >= :date  ORDER by a.completeDate ASC LIMIT :limit',
            array( ':date' => date('Y-m-d'),
            ':limit' => $limit));
    }

    public function getAllListEvents() {
        return $this->db->exec('SELECT * FROM event a WHERE a.completeDate >= :date  ORDER by a.completeDate ASC',
            array( ':date' => date('Y-m-d')));
    }

    public function deleteEvent($id) {
        return $this->db->exec('DELETE FROM event WHERE google_event_id = :id',
            array( ':id' => $id));
    }
}
