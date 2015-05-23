<?php

class StreamController extends Controller {

	public function index()
    {
        $Streams = new Stream($this->db);
        $this->f3->set('streams',$Streams->find(NULL, array('order'=>'twitch_username ASC')));
        $this->f3->set('view','stream/list.htm');
        echo \Template::instance()->render('layout.htm');
	}
}
