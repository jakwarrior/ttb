<?php

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

        foreach ($page['subset'] as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('SESSION.username'))
                && ($this->f3->get('SESSION.username') == $subArray['username'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $subArray['checkActuPossession'] = 'true';
                }
            }
            //var_dump(isset($page['checkActuPossession']));
            //$page['subset'][$subKey] = $subArray;
        }
        //var_dump($page['subset']);
        $plop = $page['subset'];
/*        if (isset($plop['checkActuPossession']))
            var_dump($plop['checkActuPossession']);*/

        foreach ($plop as $test) {
            //var_dump($test);
        }

		$this->f3->set('page',$page);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
        echo \Template::instance()->render('layout.htm');
	}

	public function page()
    {
        $utils = new Utils();
	    $pageNum = $this->f3->get('PARAMS.page');
		$pageNum--;

		if($pageNum == 0 || !is_numeric($pageNum)) { //On vérifie que le numéro de page soit valide
			$this->f3->reroute('@actus_list');
		}

        $actus = new Actu($this->db);
		$page=$actus->paginate($pageNum,$this->nbPage, array('active = 1'), array('order'=>'date_posted DESC, id DESC'));

        foreach ($page['subset'] as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);
        }

		if($pageNum > $page['count']) { //On vérifie que le numéro de page existe
			$this->f3->reroute('@actus_list');
		}

		$this->f3->set('page',$page);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
        echo \Template::instance()->render('layout.htm');
	}
}
