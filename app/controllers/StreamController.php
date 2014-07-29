<?php

class StreamController extends Controller {

	public function index()
    {
        $Streams = new Stream($this->db);
        $this->f3->set('streams',$Streams->find());
        $this->f3->set('view','stream/list.htm');
	}
}