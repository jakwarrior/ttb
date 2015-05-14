<?php

class ActuController extends Controller {

	var $nbPage = 10;

	public function index()
    {
        $actus = new Actu($this->db);
        $utils = new Utils();

		$page=$actus->paginate(0,$this->nbPage, array('active = 1'), array('order'=>'date_posted DESC, id DESC'));

        foreach ($page['subset'] as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);
        }

		$this->f3->set('page',$page);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
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
	}
}
