<?php

class HomeController extends Controller {

	public function index()
    {
        $CRs = new CR($this->db);
        $Actus = new Actu($this->db);
        $Streams = new Stream($this->db);

        $this->f3->set('actus',$Actus->all(10));
		//$this->f3->set('streams',$Streams->find(NULL, array('order'=>'twitch_username ASC')));



        $this->f3->set('crs',$CRs->all(20));

		$crss = array (
			array('image' => 'http://image.jeuxvideo.com/images/pc/s/t/starcraft-ii-heart-of-the-swarm-pc-00b.jpg', 'username' => 'Zuukaa', 'games' => 'Stacraft 2', 'date' => '29/09@18h15', 'description' => 'Top Master@Europe'),
			array('image' => 'http://farm6.staticflickr.com/5512/9674184368_51841e9b56.jpg', 'username' => 'Gracchus', 'games' => 'Dark Souls 2', 'date' => '30/09@21h00', 'description' => 'DLC, part.3'),
			//array('image' => 'http://www.gamerobs.com/galerie/upload/data/8200147588b526f402ff2b591c3ffd49.jpg', 'username' => 'bultom', 'games' => 'SimCity 2013', 'date' => '01/10@21h00', 'description' => 'Run sous contrainte'),
			array('image' => 'http://www.dlcompare.fr/img/banished-img-4.jpg', 'username' => 'Nightbringer57', 'games' => 'Banished', 'date' => '02/10@21h30', 'description' => 'Plus fort que le blabla, le TT, la sodogravier...'),
			//array('image' => 'http://cdn.akamai.steamstatic.com/steam/apps/211420/header.jpg?t=1414091965', 'username' => 'bauer_attitude', 'games' => 'Dark Souls', 'date' => '03/10@21h00', 'description' => 'J\'ai Mal'),
			array('image' => 'http://g3ar.co.za/wp-content/uploads/2014/02/Rouge-light-FPS-Tower-of-Guns-Comes-to-PC-on-March-4th-News-G3AR-600x300.jpg', 'username' => 'Ze_Fly', 'games' => 'Tower Of Guns', 'date' => '04/09@18h00', 'description' => 'L\'école du skill :o')
		);

		$this->f3->set('streams',$crss);


		$this->f3->set('site_title','Un torrent d\'informations — TTB');

        $this->f3->set('page_head','Le premier site d\'information des tartuffes :o');
        $this->f3->set('view','home.htm');

	}

}
