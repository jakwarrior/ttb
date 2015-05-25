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

                $user_browser = $this->f3->get('SERVER.HTTP_USER_AGENT');
                $this->f3->set('SESSION.username', html_entity_decode($result[0]['username']));
                $this->f3->set('SESSION.hfr_user_id', $result[0]['hfr_user_id']);
                $this->f3->set('SESSION.login_string', hash('sha512', $result[0]['password'] . $user_browser));
                $this->f3->set('SESSION.email', $result[0]['email']);

                return "OK";
            } else {
                return "incorrect";
            }
        } else {
            return "problem";
        }
    }

    public function resetPassword($email)
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
            return "inconnu";
        }
    }

    function random_password( $length = 8 ) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?";
        $password = substr( str_shuffle( $chars ), 0, $length );
        return $password;
    }

    function normalLoginCheck() {
        // Check if all session variables are set
        if ($this->f3->exists('SESSION.username') && $this->f3->exists('SESSION.hfr_user_id') && $this->f3->exists('SESSION.login_string')) {

            $user_id = $this->f3->get('SESSION.hfr_user_id');
            $login_string = $this->f3->get('SESSION.login_string');
            $username = $this->f3->get('SESSION.username');

            // Get the user-agent string of the user.
            $user_browser = $this->f3->get('SERVER.HTTP_USER_AGENT');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $user_id));

            if (is_array($result) && count($result) == 1) {
                // If the user exists get variables from result.
                $login_check = hash('sha512', $result[0]['password'] . $user_browser);

                if ($login_check == $login_string) {
                    // Logged In!!!!
                    return true;
                } else {
                    // Not logged in
                    return false;
                }
            } else {
                // Not logged in
                return false;
            }
        } else {
            // Not logged in
            return false;
        }
    }

    function adminLoginCheck() {
        // Check if all session variables are set
        if ($this->f3->exists('SESSION.username') && $this->f3->exists('SESSION.hfr_user_id') && $this->f3->exists('SESSION.login_string')) {

            $user_id = $this->f3->get('SESSION.hfr_user_id');
            $login_string = $this->f3->get('SESSION.login_string');
            $username = $this->f3->get('SESSION.username');

            // Get the user-agent string of the user.
            $user_browser = $this->f3->get('SERVER.HTTP_USER_AGENT');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $user_id));

            if (is_array($result) && count($result) == 1) {
                // If the user exists get variables from result.
                $login_check = hash('sha512', $result[0]['password'] . $user_browser);

                if (($login_check == $login_string) && ($result[0]['isAdmin'] == 1)) {
                    // Logged In!!!!
                    return true;
                } else {
                    // Not logged in
                    return false;
                }
            } else {
                // Not logged in
                return false;
            }
        } else {
            // Not logged in
            return false;
        }
    }

    function changeEmail($hfr_user_id, $newEmail) {
        $request = 'UPDATE user SET email= :email WHERE hfr_user_id= :user_id';
        $result = $this->db->exec($request, array(':email' => $newEmail, ':user_id' => $hfr_user_id));

        if ($result == 1) {
            $this->f3->set('SESSION.email', $newEmail);

            return "OK";
        } else {
            return "problem";
        }
    }
}
