<?php

class ActuController extends Controller {

	var $nbPage = 10;

	public function index()
    {
        $actus = new Actu($this->db);

		$page=$actus->paginate(0,$this->nbPage, NULL, array('order'=>'date_posted DESC, id DESC'));

		//print_r($page);

		$this->f3->set('page',$page);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
	}

	public function page()
    {
	    $pageNum = $this->f3->get('PARAMS.page');

		if($pageNum == 1 || $pageNum == 0 || !is_numeric($pageNum)) { //On vérifie que le numéro de page soit valide
			$this->f3->reroute('@actus_list');
		}

        $actus = new Actu($this->db);
		$page=$actus->paginate($pageNum,$this->nbPage, NULL, array('order'=>'date_posted DESC, id DESC'));

		if($pageNum > $page['count']) { //On vérifie que le numéro de page existe
			$this->f3->reroute('@actus_list');
		}

		$this->f3->set('page',$page);
        $this->f3->set('page_type','gibbactu');
        $this->f3->set('view','actu/list.htm');
	}
}
