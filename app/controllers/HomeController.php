<?php

class HomeController extends Controller {

	public function index()
    {
        $Actus = new Actu($this->db);

        $this->f3->set('actus',$Actus->all(10));
		//$this->f3->set('streams',$Streams->find(NULL, array('order'=>'twitch_username ASC')));


		$this->f3->set('site_title','Un torrent d\'informations — TTB');

        $this->f3->set('page_head','Le premier site d\'information des tartuffes :o');
        $this->f3->set('view','home.htm');

	}

}
