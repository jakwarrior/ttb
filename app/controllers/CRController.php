<?php

class CRController extends Controller
{

    public function index()
    {
        $CRs = new CR($this->db);
        $this->f3->set('list', $CRs->all(12));

        $Game = new Game($this->db);
        $this->f3->set('games', $Game->all());

        $Game = new Game($this->db);
        $this->f3->set('gamesother', $Game->allOther());

        $this->f3->set('site_title', 'CR, Tests, Reviews 100% Tartuffe | CROTYpedia');
        $this->f3->set('view', 'cr/index.htm');
        echo \Template::instance()->render('layout.htm');

    }

    public function view()
    {
        $CRs = new CR($this->db);
        $utils = new Utils();
        $user = new User($this->db);

        $myCR = $CRs->byId($this->f3->get('PARAMS.id'));

        foreach ($myCR as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);
            $subArray['username'] = html_entity_decode($subArray['username']);
            $myCR[$subKey] = $subArray;
        }

        $this->f3->set('cr', $myCR = $myCR[0]);

        $Game = new Game($this->db);
        $this->f3->set('games', $Game->byCR($myCR['id']));

        $utils->updateCookies();

        $check = $user->loginCheck();

        if (count($check) == 2) {
            $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
            $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);

            if (($check['normalLoginCheck'] == 'true') && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.username'))
                && ($this->f3->get('COOKIE.username') == $myCR['username'])
            ) {
                //apparemment l'utilisateur a les droits d'éditer le CR mais on va quand même vérifier son identité
                if ($user->checkCrPossession($myCR['id'])) {
                    $this->f3->set('checkCrPossession', 'true');
                }
            }
        }

        $this->f3->set('site_title', 'CR de ' . $myCR['games'] . ' par ' . $myCR['username'] . ' | CROTYpedia');
        $this->f3->set('view', 'cr/view.htm');

        echo \Template::instance()->render('layout.htm');
    }

    public function byGame()
    {
        $CRs = new CR($this->db);
        $utils = new Utils();

        $myCR = $CRs->byGame($this->f3->get('PARAMS.id'));

        foreach ($myCR as $subKey => $subArray) {
            $subArray['username'] = html_entity_decode($subArray['username']);
            $myCR[$subKey] = $subArray;
        }

        $this->f3->set('list', $myCR);

        $Game = new Game($this->db);

        $this->f3->set('game', $myGame = $Game->load(array('id=?', $this->f3->get('PARAMS.id'))));

        $this->f3->set('site_title', 'CRs de ' . $myGame['name'] . ' | CROTYpedia');
        $this->f3->set('view', 'cr/indexGame.htm');
        echo \Template::instance()->render('layout.htm');
    }

    public function byAlpha()
    {
        $CRs = new CR($this->db);
        $this->f3->set('list', $CRs->byAlpha(), 86400);

        $this->f3->set('site_title', 'Tous les CRs | CROTYpedia');
        $this->f3->set('view', 'cr/index.htm', 86400);
        echo \Template::instance()->render('layout.htm');
    }

    public function editCr()
    {
        if (!($this->f3->exists('COOKIE.pwd_string')) || !($this->f3->exists('COOKIE.username'))) {
            $this->f3->reroute('@auth');
        } else {
            $utils = new Utils();
            $utils->updateCookies();

            $CRs = new CR($this->db);
            $user = new User($this->db);

            $myCR = $CRs->byId($this->f3->get('PARAMS.id'));

            foreach ($myCR as $subKey => $subArray) {
                $subArray['content'] = html_entity_decode($subArray['content']);
                $subArray['username'] = html_entity_decode($subArray['username']);
                $myCR[$subKey] = $subArray;
            }

            $this->f3->set('cr', $myCR = $myCR[0]);

            $Game = new Game($this->db);

            $this->f3->set('games', $Game->byCR($myCR['id']));

            $check = $user->loginCheck();

            if (count($check) == 2) {
                $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
                $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);

                if (($check['normalLoginCheck'] == 'true') && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.username'))
                    && ($this->f3->get('COOKIE.username') == $myCR['username'])
                ) {

                    if ($user->checkCrPossession($myCR['id'])) {
                        $this->f3->set('checkCrPossession', 'true');
                    }
                }
            }

            $this->f3->set('view', 'cr/edit.html');
            $this->f3->set('includeJsCssEdition', 'true');
            $this->f3->set('site_title','Edition de CR — TTB');
            echo \Template::instance()->render('layout.htm');
        }
    }

    public function editCr_ajax()
    {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.content') || empty($this->f3->get('POST.content')))
            $errors['content'] = "Une erreur s'est produite";

        if (!$this->f3->exists('POST.crId') || empty($this->f3->get('POST.crId')))
            $errors['crId'] = "Une erreur s'est produite";

        if (!empty($errors)) {
            $data['success'] = false;
        } else {
            $utils = new Utils();
            $utils->updateCookies();

            $CRs = new CR($this->db);
            $content = htmlEntities($this->f3->get('POST.content'), ENT_QUOTES);
            $response = $CRs->updateCR($this->f3->get('POST.crId'), $content);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "Le CR a bien été mis à jour";
            } else if ($response == "problem") {
                $data['success'] = false;
                $data['message'] = "Une erreur s'est produite";
                $errors['else'] = "Une erreur s'est produite";
            }
        }

        $data['errors'] = $errors;
        echo json_encode($data);
    }
}
