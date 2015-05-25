<?php
include_once 'app/vendor/functions.php';

class AccountController extends Controller
{
    private $user;

    function __construct() {
        parent::__construct();
        $this->user = new User($this->db);
    }

    public function index()
    {
        sec_session_start();

        if (null === $this->f3->get('SESSION.username')) {
            $this->f3->reroute('@auth');
        } else {
            $this->f3->set('view', 'account/account.html');
            $this->f3->set('includeJsCssAccount', 'true');
            $this->f3->set('normalLoginCheck', $this->user->normalLoginCheck());
            $this->f3->set('adminLoginCheck', $this->user->adminLoginCheck());
            echo \Template::instance()->render('layout.htm');
        }
    }

    public function auth()
    {
        $this->f3->set('view', 'account/auth.html');
        $this->f3->set('includeJsCssAccount', 'true');
        echo \Template::instance()->render('layout.htm');
    }

    public function login()
    {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.email') || empty($this->f3->get('POST.email')))
            $errors['email'] = "L'adresse e-mail est requise";

        if (!$this->f3->exists('POST.password') || (hash('sha512', "") == $this->f3->get('POST.password')))
            $errors['password'] = 'Le mot de passe est requis';

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {

            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
            $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

            $response = $this->user->login($email, $password);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "L'authentification s'est bien déroulée";
            }
            else if($response == "incorrect") {
                $data['success'] = false;
                $data['message'] = 'Le mot de passe est incorrect';
                $errors['else'] = 'Le mot de passe est incorrect';
            }
            else if ($response == "problem") {
                $data['success'] = false;
                $data['message'] = "Une erreur s'est produite";
                $errors['else'] = "Une erreur s'est produite";
            }
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }

    public function reset()
    {
        $this->f3->set('view', 'account/reset.html');
        $this->f3->set('includeJsCssAccount', 'true');
        echo \Template::instance()->render('layout.htm');
    }

    public function reset_ajax()
    {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.email') || empty($this->f3->get('POST.email')))
            $errors['email'] = "L'adresse e-mail est requise";

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
            $response = $this->user->resetPassword($email);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "Le nouveau mot de passe vient de vous être envoyé";
            }
            else if ($response == "inconnu") {
                $data['success'] = false;
                $data['message'] = 'Le compte correspondant à cette adresse est introuvable';
                $errors['else'] = 'Le compte correspondant à cette adresse est introuvable';
            }
            else if ($response == "problem") {
                $data['success'] = false;
                $data['message'] = "Une erreur s'est produite";
                $errors['else'] = "Une erreur s'est produite";
            }
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }

    public function cr() {
        sec_session_start();

        if (null === $this->f3->get('SESSION.username')) {
            $this->f3->reroute('@auth');
        } else {
            $CR = new CR($this->db);
            $this->f3->set('list_cr', $myCr = $CR->byHFRUserId($this->f3->get('SESSION.hfr_user_id')));

            $this->f3->set('view', 'account/cr.html');
            $this->f3->set('includeJsCssAccount', 'true');
            $this->f3->set('normalLoginCheck', $this->user->normalLoginCheck());
            $this->f3->set('adminLoginCheck', $this->user->adminLoginCheck());
            echo \Template::instance()->render('layout.htm');
        }
    }

    public function gibbactu() {
        sec_session_start();

        if (null === $this->f3->get('SESSION.username')) {
            $this->f3->reroute('@auth');
        } else {
            $Actus = new Actu($this->db);
            $utils = new Utils();

            $actus = $Actus->byHFRUserId($this->f3->get('SESSION.hfr_user_id'), 10);

            foreach ($actus as $subKey => $subArray) {
                $subArray['content'] = $utils->content_post_treatment($subArray['content']);
                $actus[$subKey] = $subArray;
            }

            $this->f3->set('actus',$actus);

            $this->f3->set('view', 'account/gibbactu.html');
            $this->f3->set('includeJsCssAccount', 'true');
            $this->f3->set('normalLoginCheck', $this->user->normalLoginCheck());
            $this->f3->set('adminLoginCheck', $this->user->adminLoginCheck());
            echo \Template::instance()->render('layout.htm');
        }
    }

    public function changeEmail() {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.email') || empty($this->f3->get('POST.email')))
            $errors['email'] = "L'adresse e-mail est requise";

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {
            sec_session_start();

            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

            $response = $this->user->changeEmail($this->f3->get('SESSION.hfr_user_id'), $email);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "L'adresse e-mail a bien été enregistrée";
            }
            else if ($response == "problem") {
                $data['success'] = false;
                $data['message'] = "Une erreur s'est produite";
                $errors['else'] = "Une erreur s'est produite";
            }
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }

    public function changePwd() {

        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.newPwd2') || (hash('sha512', "") == $this->f3->get('POST.newPwd2')))
            $errors['password'] = "Veuillez réécrire le nouveau mot de passe";

        if (!$this->f3->exists('POST.newPwd1') || (hash('sha512', "") == $this->f3->get('POST.newPwd1')))
            $errors['password'] = "Le nouveau mot de passe est requis";

        if (!$this->f3->exists('POST.oldPwd') || (hash('sha512', "") == $this->f3->get('POST.oldPwd')))
            $errors['password'] = "L'ancien mot de passe est requis";

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {
            $oldPwd = filter_input(INPUT_POST, 'oldPwd', FILTER_SANITIZE_STRING);
            $newPwd1 = filter_input(INPUT_POST, 'newPwd1', FILTER_SANITIZE_STRING);
            $newPwd2 = filter_input(INPUT_POST, 'newPwd2', FILTER_SANITIZE_STRING);

            if (!($newPwd1 ==  $newPwd2)) {
                $errors['password'] = "Les deux mots de passe ne sont pas identiques";
                $data['success'] = false;
            } else {
                sec_session_start();

                $response = $this->user->changePwd($this->f3->get('SESSION.hfr_user_id'), $oldPwd, $newPwd1);

                if ($response == "OK") {
                    $data['success'] = true;
                    $data['message'] = "Le nouveau mot de passe a bien été enregistré";
                }
                else if ($response == "incorrect") {
                    $data['success'] = false;
                    $data['message'] = "L'ancien mot de passe est incorrect";
                    $errors['else'] = "L'ancien mot de passe est incorrect";
                }
                else if ($response == "problem") {
                    $data['success'] = false;
                    $data['message'] = "Une erreur s'est produite";
                    $errors['else'] = "Une erreur s'est produite";
                }
            }
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }

    public function logout()
    {
        sec_session_start();
        sec_session_destroy();
        $this->f3->reroute('@account');
    }
}
