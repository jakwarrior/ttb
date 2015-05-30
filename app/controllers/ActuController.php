<?php
include_once 'app/vendor/functions.php';

class ActuController extends Controller {

	var $nbPage = 10;

	public function index()
    {
        $actus = new Actu($this->db);
        $utils = new Utils();
        $user = new User($this->db);

        sec_session_start();

        $check = $user->loginCheck();

        if (count($check) == 2) {
            $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
            $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
        }

		$page=$actus->paginate(0,$this->nbPage, array('active = 1'), array('order'=>'date_posted DESC, id DESC'));

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
            $tmp['username'] = $subArray['username'];
            $tmp['content'] = $utils->content_post_treatment($subArray['content']);
            $tmp['content_raw'] = $subArray['content_raw'];
            $tmp['date_added'] = $subArray['date_added'];
            $tmp['date_modified'] = $subArray['date_modified'];
            $tmp['date_posted'] = $subArray['date_posted'];
            $tmp['processed'] = $subArray['processed'];
            $tmp['active'] = $subArray['active'];

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('SESSION.username'))
                && ($this->f3->get('SESSION.username') == $subArray['username'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $tmp['checkActuPossession'] = 'true';
                }
            }

            array_push($page2['content'], $tmp);
        }

		$this->f3->set('page',$page2);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
        echo \Template::instance()->render('layout.htm');
	}

	public function page()
    {
        $utils = new Utils();

        $user = new User($this->db);

        sec_session_start();

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
		$page=$actus->paginate($pageNum,$this->nbPage, array('active = 1'), array('order'=>'date_posted DESC, id DESC'));

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
            $tmp['username'] = $subArray['username'];
            $tmp['content'] = $utils->content_post_treatment($subArray['content']);
            $tmp['content_raw'] = $subArray['content_raw'];
            $tmp['date_added'] = $subArray['date_added'];
            $tmp['date_modified'] = $subArray['date_modified'];
            $tmp['date_posted'] = $subArray['date_posted'];
            $tmp['processed'] = $subArray['processed'];
            $tmp['active'] = $subArray['active'];

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('SESSION.username'))
                && ($this->f3->get('SESSION.username') == $subArray['username'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $tmp['checkActuPossession'] = 'true';
                }
            }

            array_push($page2['content'], $tmp);
        }

		$this->f3->set('page',$page2);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
        echo \Template::instance()->render('layout.htm');
	}

    public function editActu() {
        sec_session_start();

        if (null === $this->f3->get('SESSION.username')) {
            $this->f3->reroute('@auth');
        } else {

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

                if (($check['normalLoginCheck'] == 'true') && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('SESSION.username'))
                    && ($this->f3->get('SESSION.username') == $myActu['username'])) {

                    if ($user->checkActuPossession($myActu['id'])) {
                        $this->f3->set('checkActuPossession', 'true');
                    }
                }
            }

            $this->f3->set('view', 'actu/edit.html');
            $this->f3->set('includeJsCssEdition', 'true');
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
            sec_session_start();

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
}
