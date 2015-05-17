<?php

class AccountController extends Controller
{
    public function index()
    {
        new Session();

        if (null === $this->f3->get('SESSION.user')) {
            $this->f3->reroute('@auth');
        } else {
            echo($this->f3->get('SESSION.user'));
            $this->f3->set('view', 'error.html');
        }
    }

    public function auth()
    {
        $this->f3->set('view', 'account/auth.html');
    }

    public function login()
    {
        $user = new User($this->db);
        $response = $user->login();

        if ($response)
        {
            new Session();
            $this->f3->set('SESSION.user', $this->f3->get('SERVER.PHP_AUTH_USER'));
            $this->f3->reroute('@account');
        } else
        {
            $this->f3->set('view', 'account/auth.html');
        }
    }
}
