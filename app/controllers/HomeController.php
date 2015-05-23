<?php

class HomeController extends Controller {

	public function index()
    {
        $Actus = new Actu($this->db);
        $CRs = new CR($this->db);
        $utils = new Utils();

        $actus = $Actus->all(10);

        foreach ($actus as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);
            $actus[$subKey] = $subArray;
        }

        $this->f3->set('actus',$actus);
        $this->f3->set('crs',$CRs->all(20));
		//$this->f3->set('streams',$Streams->find(NULL, array('order'=>'twitch_username ASC')));


		$this->f3->set('site_title','Un torrent d\'informations — TTB');

        $this->f3->set('page_head','Le premier site d\'information des tartuffes :o');
        $this->f3->set('view','home.htm');
        echo \Template::instance()->render('layout.htm');

	}

}
