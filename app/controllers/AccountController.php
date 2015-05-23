<?php
include_once 'app/vendor/functions.php';

class AccountController extends Controller
{
    public function index()
    {
        sec_session_start();

        if (null === $this->f3->get('SESSION.username')) {
            $this->f3->reroute('@auth');
        } else {
            echo($this->f3->get('SESSION.username'));
            $this->f3->set('view', 'error.html');
            echo \Template::instance()->render('layout.htm');
        }
    }

    public function auth()
    {
        $this->f3->set('view', 'account/auth.html');
        echo \Template::instance()->render('layout.htm');
    }

    public function login()
    {
        $user = new User($this->db);

        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.email') || empty($this->f3->get('POST.email')))
            $errors['email'] = "L'email est requis";

        if (!$this->f3->exists('POST.password') || empty($this->f3->get('POST.password')))
            $errors['password'] = 'Le mot de passe est requis';

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {

            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
            $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

            $response = $user->login($email, $password);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "L'authentification s'est bien déroulée";

                //$this->f3->reroute('@account');
            }
            else if($response == "incorrect") {
                $data['success'] = false;
                $data['message'] = 'Le mot de passe est incorrect';
                $errors['else'] = 'Le mot de passe est incorrect';
                //echo("cancel");
                //$this->f3->set('view', 'account/auth.html');
            }
            else if ($response == "problem") {
                $data['success'] = false;
                $data['message'] = "Une erreur s'est produite";
                $errors['else'] = "Une erreur s'est produite";
            }

            //$this->f3->set('view', 'error.html');
        }

        $data['errors']  = $errors;
        echo json_encode($data);

/*        if ($this->f3->exists('POST.email') && $this->f3->exists('POST.password')) {
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
            $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

            $response = $user->login($email, $password);

            if ($response) {
                echo($this->f3->get('SESSION.username'));
                $this->f3->set('view', 'account/auth.html');
            } else {
                echo("cancel");
                $this->f3->set('view', 'account/auth.html');
            }

            $this->f3->set('view', 'error.html');
        }*/
    }

    public function reset()
    {
        $user = new User($this->db);
        $user->resetLogin();

        $this->f3->set('view', 'error.html');
        echo \Template::instance()->render('layout.htm');
    }
}
