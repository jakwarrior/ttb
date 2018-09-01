<?php

class Actu extends DB\SQL\Mapper {

    private $f3;

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'actu');
        $this->f3 = \Base::instance();
    }

    public function all($limit = 0) {
  		$request =
  			'SELECT *'.
  			' FROM actu as a'.
            ' WHERE active = 1 AND username != "ravenloft"'.
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

    public function byId($idActu) {
        $request =
            'SELECT *'.
            ' FROM actu as a'.
            ' WHERE id = :id';

        return $this->db->exec($request, array(':id' => $idActu));
    }

    public function byDate($dateActu) {
        $request =
            'SELECT *'.
            ' FROM actu as a'.
            ' WHERE date_posted LIKE :date AND username != "ravenloft"'.
            ' ORDER BY date_posted ASC';

        return $this->db->exec($request, array(':date' => ($dateActu . '%')));
    }

    public function byContentLike($content) {
        $request =
            'SELECT *'.
            ' FROM actu as a'.
            ' WHERE content LIKE :content AND username != "ravenloft"'.
            ' ORDER BY date_posted DESC';

        return $this->db->exec($request, array(':content' => '%' . htmlentities($content) . '%'));
    }


    public function updateActu($idActu, $content) {
        if ($this->f3->exists('COOKIE.pwd_string') && $this->f3->exists('COOKIE.hfr_user_id')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';
            $result = $this->db->exec($request, array(':user_id' => $this->f3->get('COOKIE.hfr_user_id')));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);

                if (($login_check == $pwd_string)) {
                    $request = 'UPDATE actu SET content = :content WHERE id = :idActu';
                    $result = $this->db->exec($request, array(':content' => $content, ':idActu' => $idActu));

                    if ($result == 1) {
                        return "OK";
                    } else {
                        return "problem";
                    }
                } else {
                    return "problem";
                }
            } else {
                return "problem";
            }
        } else {
            return "problem";
        }
    }
}
