<?php
include_once 'app/vendor/functions.php';

class User extends DB\SQL\Mapper {

    private $f3;

	public function __construct(DB\SQL $db) {
		parent::__construct($db,'user');
        $this->f3 = \Base::instance();
	}

    public function login($email, $password)
    {
        $request = 'SELECT *'.
            ' FROM user '.
            ' WHERE email = :email';

        $result = $this->db->exec($request, array(':email' => $email));

        if (is_array($result) && count($result) == 1)
        {
            $verifyPwd = password_verify($password, $result[0]['password']);

            if ($verifyPwd == true)
            {
                sec_session_start();

                $user_browser = $_SERVER['HTTP_USER_AGENT'];
                $this->f3->set('SESSION.username', html_entity_decode($result[0]['username']));
                $this->f3->set('SESSION.hfr_user_id', $result[0]['hfr_user_id']);
                $this->f3->set('SESSION.login_string', hash('sha512', $password . $user_browser));

                return "OK";
            } else {
                return "incorrect";
            }
        } else {
            return "problem";
        }
    }

    public function resetLogin($email)
    {
        $request = 'SELECT *'.
            ' FROM user '.
            ' WHERE email = :email';

        $result = $this->db->exec($request, array(':email' => $email));

        if (is_array($result) && count($result) == 1)
        {
            $newPwd = $this->random_password(12);
            $hash_pwd = password_hash(hash('sha512', $newPwd), PASSWORD_DEFAULT);

            $request2 = 'UPDATE user SET password= :password WHERE hfr_user_id= :user_id';
            $result2 = $this->db->exec($request2, array(':password' => $hash_pwd, ':user_id' => $result[0]['hfr_user_id']));

            if ($result2 == 1) {
                $message = html_entity_decode("Bonjour " . html_entity_decode($result[0]['username']) . ",<br><br>Vous avez demandé la réinitialisation de votre mot de passe. Votre nouveau mot de passe est " . $newPwd . "<br><br>A bientôt sur <a href='www.thetartuffebay.org'>TheTartuffeBay.org</a>");

                $smtp=new SMTP ($this->f3->get('smtp_server'), $this->f3->get('smtp_port'), false, $this->f3->get('smtp_account'), $this->f3->get('smtp_pwd'));
                $smtp->set('Content-Type', 'text/html; charset=UTF-8');
                $smtp->set('To', $email);
                $smtp->set('From', '"The Tartuffe Bay" <no-reply@thetartuffebay.org>');
                $smtp->set('Subject', 'Réinitialisation de votre mot de passe TheTartuffeBay.org');
                $smtp->send($message);

                return "OK";
            } else {
                return "problem";
            }
        }
        else {
            return "problem";
        }
    }

    function random_password( $length = 8 ) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?";
        $password = substr( str_shuffle( $chars ), 0, $length );
        return $password;
    }
}
