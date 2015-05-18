<?php
include_once 'app/vendor/functions.php';

class User extends DB\SQL\Mapper {

    private $f3;

	public function __construct(DB\SQL $db, $f3) {
		parent::__construct($db,'user');
        $this->f3 = $f3;
	}

    public function login($username, $password)
    {
        $request = 'SELECT *'.
            ' FROM user '.
            ' WHERE username = :username';

        $result = $this->db->exec($request, array(':username' => $username));

        if (is_array($result) && count($result) == 1)
        {
            $verifyPwd = password_verify($password, $result[0]['password']);

            if ($verifyPwd == true)
            {
                sec_session_start();

                $user_browser = $_SERVER['HTTP_USER_AGENT'];
                $this->f3->set('SESSION.username', $result[0]['username']);
                $this->f3->set('SESSION.hfr_user_id', $result[0]['hfr_user_id']);
                $this->f3->set('SESSION.login_string', hash('sha512', $password . $user_browser));

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }


    }

    public function reset()
    {
        $password='azerty';

        $hash_pwd = password_hash($password, PASSWORD_DEFAULT);

        $request = 'UPDATE user SET password= :password WHERE hfr_user_id=929138';

        return $this->db->exec($request, array(':password' => $hash_pwd));
    }
}
