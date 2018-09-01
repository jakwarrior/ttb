<?php

class ActuController extends Controller {

	var $nbPage = 10;

	public function index()
    {
        $actus = new Actu($this->db);
        $utils = new Utils();
        $user = new User($this->db);

        $utils = new Utils();
        $utils->updateCookies();

        $check = $user->loginCheck();

        if (count($check) == 2) {
            $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
            $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
        }

		$page=$actus->paginate(0,$this->nbPage, array('active = 1 AND username != "ravenloft"'), array('order'=>'date_posted DESC, id DESC'));

        $page2 = array();
        $page2['pos'] = $page['pos'];
        $page2['count'] = $page['count'];
        $page2['content'] = array();

        foreach ($page['subset'] as $subKey => $subArray) {
            $tmp = array();
            $tmp['id'] = $subArray['id'];
            $tmp['hfr_cat_id'] = $subArray['hfr_cat_id'];
            $tmp['hfr_subcat_id'] = $subArray['hfr_subcat_id'];
            $tmp['hfr_topic_id'] = $subArray['hfr_topic_id'];
            $tmp['hfr_page_id'] = $subArray['hfr_page_id'];
            $tmp['hfr_post_id'] = $subArray['hfr_post_id'];
            $tmp['hfr_user_id'] = $subArray['hfr_user_id'];
            $tmp['username'] = html_entity_decode($subArray['username']);
            $tmp['content'] = $utils->content_post_treatment($subArray['content']);
            $tmp['content_raw'] = $subArray['content_raw'];
            $tmp['date_added'] = $subArray['date_added'];
            $tmp['date_modified'] = $subArray['date_modified'];
            $tmp['date_posted'] = $subArray['date_posted'];
            $tmp['processed'] = $subArray['processed'];
            $tmp['active'] = $subArray['active'];

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.hfr_user_id'))
                && ($this->f3->get('COOKIE.hfr_user_id') == $subArray['hfr_user_id'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $tmp['checkActuPossession'] = 'true';
                }
            }

            array_push($page2['content'], $tmp);
        }

		$this->f3->set('page',$page2);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
        $this->f3->set('site_title','Les dernières actus — TTB');
        echo \Template::instance()->render('layout.htm');
	}

	public function page()
    {
        $utils = new Utils();

        $user = new User($this->db);

        $utils = new Utils();
        $utils->updateCookies();

        $check = $user->loginCheck();

        if (count($check) == 2) {
            $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
            $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
        }

	    $pageNum = $this->f3->get('PARAMS.page');
		$pageNum--;

		if($pageNum == 0 || !is_numeric($pageNum)) { //On vérifie que le numéro de page soit valide
			$this->f3->reroute('@actus_list');
		}

        $actus = new Actu($this->db);
		$page=$actus->paginate($pageNum,$this->nbPage, array('active = 1 AND username != "ravenloft"'), array('order'=>'date_posted DESC, id DESC'));

		if($pageNum > $page['count']) { //On vérifie que le numéro de page existe
			$this->f3->reroute('@actus_list');
		}

        $page2 = array();
        $page2['pos'] = $page['pos'];
        $page2['count'] = $page['count'];
        $page2['content'] = array();

        foreach ($page['subset'] as $subKey => $subArray) {
            $tmp = array();
            $tmp['id'] = $subArray['id'];
            $tmp['hfr_cat_id'] = $subArray['hfr_cat_id'];
            $tmp['hfr_subcat_id'] = $subArray['hfr_subcat_id'];
            $tmp['hfr_topic_id'] = $subArray['hfr_topic_id'];
            $tmp['hfr_page_id'] = $subArray['hfr_page_id'];
            $tmp['hfr_post_id'] = $subArray['hfr_post_id'];
            $tmp['hfr_user_id'] = $subArray['hfr_user_id'];
            $tmp['username'] = html_entity_decode($subArray['username']);
            $tmp['content'] = $utils->content_post_treatment($subArray['content']);
            $tmp['content_raw'] = $subArray['content_raw'];
            $tmp['date_added'] = $subArray['date_added'];
            $tmp['date_modified'] = $subArray['date_modified'];
            $tmp['date_posted'] = $subArray['date_posted'];
            $tmp['processed'] = $subArray['processed'];
            $tmp['active'] = $subArray['active'];

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.hfr_user_id'))
                && ($this->f3->get('COOKIE.hfr_user_id') == $subArray['hfr_user_id'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $tmp['checkActuPossession'] = 'true';
                }
            }

            array_push($page2['content'], $tmp);
        }

		$this->f3->set('page',$page2);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
        $this->f3->set('site_title','Gibbactus - page ' . $this->f3->get('PARAMS.page') . ' — TTB');
        echo \Template::instance()->render('layout.htm');
	}

    public function editActu() {

        if (!($this->f3->exists('COOKIE.pwd_string')) || !($this->f3->exists('COOKIE.username'))) {
            $this->f3->reroute('@auth');
        } else {
            $utils = new Utils();
            $utils->updateCookies();

            $actus = new Actu($this->db);
            $user = new User($this->db);

            $myActu = $actus->byId($this->f3->get('PARAMS.id'));

            foreach ($myActu as $subKey => $subArray) {
                $subArray['content'] = html_entity_decode($subArray['content']);
                $subArray['username'] = html_entity_decode($subArray['username']);
                $myActu[$subKey] = $subArray;
            }

            $this->f3->set('actu',$myActu = $myActu[0]);

            $check = $user->loginCheck();

            if (count($check) == 2) {
                $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
                $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);

                if (($check['normalLoginCheck'] == 'true') && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.hfr_user_id'))
                    && ($this->f3->get('COOKIE.hfr_user_id') == $myActu['hfr_user_id'])) {

                    if ($user->checkActuPossession($myActu['id'])) {
                        $this->f3->set('checkActuPossession', 'true');
                    }
                }
            }

            $this->f3->set('view', 'actu/edit.html');
            $this->f3->set('includeJsCssEdition', 'true');
            $this->f3->set('site_title','Edition gibbactu — TTB');
            echo \Template::instance()->render('layout.htm');
        }
    }

    public function editActu_ajax()
    {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.content') || empty($this->f3->get('POST.content')))
            $errors['content'] = "Une erreur s'est produite";

        if (!$this->f3->exists('POST.actuId') || empty($this->f3->get('POST.actuId')))
            $errors['actuId'] = "Une erreur s'est produite";

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {
            $utils = new Utils();
            $utils->updateCookies();

            $actus = new Actu($this->db);
            $content = htmlEntities($this->f3->get('POST.content'), ENT_QUOTES);
            $response = $actus->updateActu($this->f3->get('POST.actuId'), $content);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "La gibbactu a bien été mise à jour";
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

    public function gibbactuDate() {

        if (!$this->f3->exists('POST.datepicker') || empty($this->f3->get('POST.datepicker'))) {
            $this->f3->reroute('@actus_list');
        } else {
            $date = $this->f3->clean($this->f3->get('POST.datepicker'));
            $tmp = explode('/', $date);

            if (count($tmp) == 3) {
                $jour = $tmp[0];
                $mois = $tmp[1];
                $annee = $tmp[2];

                if (checkdate($mois, $jour, $annee)) {
                    $this->f3->reroute('@showGibbactuDate(@date=' . $jour . '-' . $mois . '-' . $annee  . ')');
                } else {
                    $this->f3->set('view','error.html');
                    $this->f3->set('site_title','Erreur — TTB');
                    echo \Template::instance()->render('layout.htm');
                }
            } else {
                $this->f3->set('view','error.html');
                $this->f3->set('site_title','Erreur — TTB');
                echo \Template::instance()->render('layout.htm');
            }
        }
    }

    public function showGibbactuDate() {
        $utils = new Utils();
        $utils->updateCookies();

        $date = $this->f3->clean($this->f3->get('PARAMS.date'));
        $tmp = explode('-', $date);

        if (count($tmp) == 3) {
            $jour = $tmp[0];
            $mois = $tmp[1];
            $annee = $tmp[2];

            if (checkdate($mois, $jour, $annee)) {
                $searchDate = $annee . '-' . $mois . '-' . $jour;
                $showDate = $jour . '/' . $mois . '/' . $annee;
                $actus = new Actu($this->db);
                $utils = new Utils();
                $user = new User($this->db);

                $result = $actus->byDate($searchDate);

                $check = $check = $user->loginCheck();

                if (count($check) == 2) {
                    $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
                    $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
                }

                foreach ($result as $subKey => $subArray) {
                    $subArray['content'] = $utils->content_post_treatment($subArray['content']);
                    $subArray['username'] = html_entity_decode($subArray['username']);

                    if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.hfr_user_id'))
                        && ($this->f3->get('COOKIE.hfr_user_id') == $subArray['hfr_user_id'])) {

                        if ($user->checkActuPossession($subArray['id'])) {
                            $subArray['checkActuPossession'] = 'true';
                        }
                    }

                    $result[$subKey] = $subArray;
                }

                $tomorrow = new DateTime($annee . '-' . $mois . '-' . $jour);
                $tomorrow->modify('tomorrow');
                $this->f3->set('tomorrow', $tomorrow->format('d-m-Y'));

                $yesterday = new DateTime($annee . '-' . $mois . '-' . $jour);
                $yesterday->modify('yesterday');
                $this->f3->set('yesterday', $yesterday->format('d-m-Y'));

                $this->f3->set('page',$result);
                $this->f3->set('page_type','gibbactu');
                $this->f3->set('showDate', $showDate);
                $this->f3->set('view','actu/date.htm');
                $this->f3->set('site_title','Gibbactus du ' . $showDate . ' — TTB');
                echo \Template::instance()->render('layout.htm');
            } else {
                $this->f3->set('view','error.html');
                $this->f3->set('site_title','Erreur — TTB');
                echo \Template::instance()->render('layout.htm');
            }
        } else {
            $this->f3->set('view','error.html');
            $this->f3->set('site_title','Erreur — TTB');
            echo \Template::instance()->render('layout.htm');
        }
    }
    
    public function id() {
        $actus = new Actu($this->db);
        $utils = new Utils();
        $user = new User($this->db);

        $utils = new Utils();
        $utils->updateCookies();

        $check = $user->loginCheck();

        if (count($check) == 2) {
            $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
            $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
        }
        
        $id = $this->f3->clean($this->f3->get('PARAMS.id'));
        $result = $actus->byId($id);

        if (count($result) == 0) {
            $this->f3->set('view','error.html');
            $this->f3->set('site_title','Erreur — TTB');
            echo \Template::instance()->render('layout.htm');
        }
        
        foreach ($result as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);
            $subArray['username'] = html_entity_decode($subArray['username']);

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('COOKIE.hfr_user_id'))
                && ($this->f3->get('COOKIE.hfr_user_id') == $subArray['hfr_user_id'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $subArray['checkActuPossession'] = 'true';
                }
            }

            $result[$subKey] = $subArray;
        }

        $result = $result[0];
        
        $this->f3->set('page',$result);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/id.html');
        $this->f3->set('site_title','Gibbactu n°' . $this->f3->get('PARAMS.id') . ' — TTB');
        echo \Template::instance()->render('layout.htm');
    }
}
