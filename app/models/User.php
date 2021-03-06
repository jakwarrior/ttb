<?php

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
                $utils = new Utils();
                $utils->createCookies(html_entity_decode($result[0]['username']), $result[0]['hfr_user_id'], hash('sha512', $result[0]['password']), $result[0]['email']);

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

    function loginCheck() {
        $return = array();

        // Check if all session variables are set
        if ($this->f3->exists('COOKIE.username') && $this->f3->exists('COOKIE.hfr_user_id') && $this->f3->exists('COOKIE.pwd_string')) {

            $user_id = $this->f3->get('COOKIE.hfr_user_id');
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $user_id));

            if (is_array($result) && count($result) == 1) {
                // If the user exists get variables from result.
                $login_check = hash('sha512', $result[0]['password']);

                if ($login_check == $pwd_string) {
                    if ($result[0]['isAdmin'] == 1) {
                        $return['adminLoginCheck'] = 'true';
                        $return['normalLoginCheck'] = 'true';
                    } else {
                        $return['adminLoginCheck'] = 'false';
                        $return['normalLoginCheck'] = 'true';
                    }

                    return $return;
                } else {
                    // Not logged in
                    return $return;
                }
            } else {
                // Not logged in
                return $return;
            }
        } else {
            // Not logged in
            return $return;
        }
    }

    function changeEmail($hfr_user_id, $newEmail) {
        if ($this->f3->exists('COOKIE.pwd_string')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $hfr_user_id));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);

                if (($login_check == $pwd_string)) {
                    $request2 = 'UPDATE user SET email= :email WHERE hfr_user_id= :user_id';
                    $result2 = $this->db->exec($request2, array(':email' => $newEmail, ':user_id' => $hfr_user_id));

                    if ($result2 == 1) {
                        $this->f3->set('COOKIE.email', $newEmail);
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

    function changePwd($hfr_user_id, $oldPwd, $newPwd) {
        if ($this->f3->exists('COOKIE.pwd_string')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $hfr_user_id));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);

                if (($login_check == $pwd_string)) {

                    $verifyPwd = password_verify($oldPwd, $result[0]['password']);

                    if ($verifyPwd == true)
                    {
                        $hash_pwd = password_hash($newPwd, PASSWORD_DEFAULT);

                        $request2 = 'UPDATE user SET password= :password WHERE hfr_user_id= :user_id';
                        $result2 = $this->db->exec($request2, array(':password' => $hash_pwd, ':user_id' => $hfr_user_id));

                        if ($result2 == 1) {
                            $this->f3->set('COOKIE.pwd_string', hash('sha512', $hash_pwd));

                            return "OK";
                        } else {
                            return "problem";
                        }
                    } else {
                        return "incorrect";
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

    public function checkCrPossession($CrId) {
        if ($this->f3->exists('COOKIE.pwd_string') && $this->f3->exists('COOKIE.hfr_user_id')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');
            $hfr_user_id = $this->f3->get('COOKIE.hfr_user_id');

            $request = 'SELECT cr.id AS id, cr.username as username, cr.hfr_user_id as hfr_user_id, user.password as password FROM cr as cr LEFT JOIN user as user ON cr.hfr_user_id = user.hfr_user_id  WHERE cr.id = :crId';
            $result = $this->db->exec($request, array(':crId' => $CrId));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);
                if (($login_check == $pwd_string) && $hfr_user_id ==  $result[0]['hfr_user_id']) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function checkActuPossession($actuId) {
        if ($this->f3->exists('COOKIE.pwd_string') && $this->f3->exists('COOKIE.hfr_user_id')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');
            $hfr_user_id = $this->f3->get('COOKIE.hfr_user_id');

            $request = 'SELECT actu.id AS id, actu.username as username, actu.hfr_user_id as hfr_user_id, user.password as password FROM actu as actu LEFT JOIN user as user ON actu.hfr_user_id = user.hfr_user_id  WHERE actu.id = :actuId';
            $result = $this->db->exec($request, array(':actuId' => $actuId));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);
                if (($login_check == $pwd_string) && $hfr_user_id ==  $result[0]['hfr_user_id']) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function addUser($hfr_user_id, $username, $email) {
        if ($this->f3->exists('COOKIE.pwd_string') && $this->f3->exists('COOKIE.hfr_user_id')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $this->f3->get('COOKIE.hfr_user_id')));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);

                if ($login_check == $pwd_string && $this->f3->get('COOKIE.hfr_user_id') ==  $result[0]['hfr_user_id'] && $result[0]['isAdmin'] == 1) {

                    $request2 = 'INSERT INTO `user`(`hfr_user_id`, `username`, `email`, `isAdmin`) VALUES (:hfr_user_id, :username, :email, 0)';
                    $result2 = $this->db->exec($request2, array(':hfr_user_id' => $hfr_user_id, ':username' => $username, ':email' => $email));

                    if ($result2 == 1) {
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

    public function getAllUsers() {
        $request = 'SELECT * FROM user ORDER BY username ASC';
        return $this->db->exec($request);
    }

    function changeEmailAdmin($hfr_user_id, $newEmail) {
        if ($this->f3->exists('COOKIE.pwd_string') && $this->f3->exists('COOKIE.hfr_user_id')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $this->f3->get('COOKIE.hfr_user_id')));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);

                if ($login_check == $pwd_string && $this->f3->get('COOKIE.hfr_user_id') ==  $result[0]['hfr_user_id'] && $result[0]['isAdmin'] == 1) {

                    $request2 = 'UPDATE user SET email= :email WHERE hfr_user_id= :user_id';
                    $result2 = $this->db->exec($request2, array(':email' => $newEmail, ':user_id' => $hfr_user_id));

                    if ($result2 == 1) {
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

    public function resetPasswordAdmin($hfr_user_id)
    {
        if ($this->f3->exists('COOKIE.pwd_string') && $this->f3->exists('COOKIE.hfr_user_id')) {
            $pwd_string = $this->f3->get('COOKIE.pwd_string');

            $request = 'SELECT * FROM user WHERE hfr_user_id = :user_id';

            $result = $this->db->exec($request, array(':user_id' => $this->f3->get('COOKIE.hfr_user_id')));

            if (is_array($result) && count($result) == 1) {
                $login_check = hash('sha512', $result[0]['password']);

                if ($login_check == $pwd_string && $this->f3->get('COOKIE.hfr_user_id') ==  $result[0]['hfr_user_id'] && $result[0]['isAdmin'] == 1) {
                    $request2 = 'SELECT * FROM user WHERE hfr_user_id = :user_id';
                    $result2 = $this->db->exec($request2, array(':user_id' => $hfr_user_id));

                    if (is_array($result2) && count($result2) == 1) {
                        if ($result2[0]['email'] != '') {
                            $newPwd = $this->random_password(12);
                            $hash_pwd = password_hash(hash('sha512', $newPwd), PASSWORD_DEFAULT);

                            $request3 = 'UPDATE user SET password= :password WHERE hfr_user_id= :user_id';
                            $result3 = $this->db->exec($request3, array(':password' => $hash_pwd, ':user_id' => $hfr_user_id));

                            if ($result3 == 1) {
                                $message = html_entity_decode("Bonjour " . html_entity_decode($result2[0]['username']) . ",<br><br>Vous avez demandé la réinitialisation de votre mot de passe. Votre nouveau mot de passe est " . $newPwd . "<br><br>A bientôt sur <a href='www.thetartuffebay.org'>TheTartuffeBay.org</a>");

                                $smtp=new SMTP ($this->f3->get('smtp_server'), $this->f3->get('smtp_port'), false, $this->f3->get('smtp_account'), $this->f3->get('smtp_pwd'));
                                $smtp->set('Content-Type', 'text/html; charset=UTF-8');
                                $smtp->set('To', $result2[0]['email']);
                                $smtp->set('From', '"The Tartuffe Bay" <no-reply@thetartuffebay.org>');
                                $smtp->set('Subject', 'Réinitialisation de votre mot de passe TheTartuffeBay.org');
                                $smtp->send($message);

                                return "OK";
                            } else {
                                return "problem";
                            }
                        } else {
                            return "email";
                        }
                    } else {
                        return "inconnu";
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
