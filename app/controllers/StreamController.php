<?php

class StreamController extends Controller {

	public function index()
    {
        $Streams = new Stream($this->db);
        $this->f3->set('streams',$Streams->find(NULL, array('order'=>'username ASC')));
        $this->f3->set('includeJsCssStream','true');
        $this->f3->set('view','stream/list.htm');
        echo \Template::instance()->render('layout.htm');
	}

    public function agenda()
    {
        $this->f3->set('view','stream/agenda.html');
        echo \Template::instance()->render('layout.htm');
    }

    public function profil()
    {
        $Streams = new Stream($this->db);
        $streamer = $Streams->byUserName($this->f3->get('PARAMS.name'));

        if (count($streamer) != 1) {
            $this->f3->error(404);
        }

        $this->f3->set('streamer', $streamer[0]);

        $this->f3->set('view','stream/profil.html');
        echo \Template::instance()->render('layout.htm');
    }
}
