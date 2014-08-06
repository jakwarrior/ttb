<?php

class Game extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'game');
    }

    public function all() {
      return $this->db->exec(
        'SELECT g.id AS id, g.name AS name, g.api_image AS api_image, COUNT(cg.cr_id) as nombre_cr'.
        ' FROM game as g'.
        ' INNER JOIN cr_game as cg'.
        ' ON g.id = cg.game_id'.
        ' WHERE g.type_id = 1'.
        ' GROUP BY g.id'.
        ' ORDER BY g.name ASC'
      );
    }


    public function allOther() {
      return $this->db->exec(
        'SELECT g.id AS id, g.name AS name, g.api_image AS api_image, COUNT(cg.cr_id) as nombre_cr'.
        ' FROM game as g'.
        ' INNER JOIN cr_game as cg'.
        ' ON g.id = cg.game_id'.
        ' WHERE g.type_id = 2'.
        ' GROUP BY g.id'.
        ' ORDER BY g.name ASC'
      );
    }

    public function allAPI($term) {
      $res = $this->db->exec(

          'SELECT g.id AS id, g.name AS name, g.api_image AS api_image, g.api_date AS date, "bdd" AS origin '.
          ' FROM game as g'.
          " WHERE g.name LIKE ?".
          ' ORDER BY g.name ASC',
        '%'.$term.'%'

      );

      return $res;
    }

    public function byCR($idCR) {

      return $this->db->exec(
        'SELECT g.id AS id, g.name AS name, g.api_image AS api_image, COUNT(cg.cr_id) as nombre_cr'.
        ' FROM game as g'.
        ' INNER JOIN cr_game as cg'.
        ' ON g.id = cg.game_id'.
        ' WHERE cg.cr_id = ?'.
        ' GROUP BY g.id'.
        ' ORDER BY g.name ASC',
        $idCR
      );
    }
}
