<?php

class HomeController extends Controller {

	public function index()
    {
        $CRs = new CR($this->db);
        $Actus = new Actu($this->db);
        $Streams = new Stream($this->db);

        $this->f3->set('actus',$Actus->all(10));
		//$this->f3->set('streams',$Streams->find(NULL, array('order'=>'twitch_username ASC')));



        $this->f3->set('crs',$CRs->all(6));

		$crss = array (
			array('username' => 'Zuukaa', 'games' => 'Stacraft 2', 'date' => '29/09@18h15', 'description' => 'Top Master@Europe'),
			array('username' => 'Gracchus', 'games' => 'Dark Souls 2', 'date' => '30/09@21h00', 'description' => 'DLC, part.3'),
			array('username' => 'bultom', 'games' => 'SimCity 2013', 'date' => '01/10@21h00', 'description' => 'Run sous contrainte'),
			array('username' => 'Nightbringer57', 'games' => 'Banished', 'date' => '02/10@21h30', 'description' => 'Plus fort que le blabla, le TT, la sodogravier...'),
			array('username' => 'bauer_attitude', 'games' => 'Dark Souls', 'date' => '03/10@21h00', 'description' => 'J\'ai Mal'),
			array('username' => 'Ze_Fly', 'games' => 'Tower Of Guns', 'date' => '04/09@18h00', 'description' => 'L\'école du skill :o')
		);

		$this->f3->set('streams',$crss);


		$this->f3->set('site_title','Un torrent d\'informations — TTB');

        $this->f3->set('page_head','Le premier site d\'information des tartuffes :o');
        $this->f3->set('view','home.htm');

	}

}
