<?php

class CRController extends Controller {

	public function index()
  {
	  $CRs = new CR($this->db);
	  $this->f3->set('list',$CRs->all(12));

		$Game = new Game($this->db);
		$this->f3->set('games',$Game->all());

		$Game = new Game($this->db);
		$this->f3->set('gamesother',$Game->allOther());

		$this->f3->set('site_title','CR, Tests, Reviews 100% Tartuffe | CROTYpedia');
	  $this->f3->set('view','cr/index.htm');

	}

	public function view()
	{

		$CRs = new CR($this->db);
		$this->f3->set('cr',$myCR = $CRs->byId($this->f3->get('PARAMS.id'))[0]);

		$Game = new Game($this->db);
		$this->f3->set('games',$Game->byCR($myCR['id']));

		$this->f3->set('site_title','CR de '.$myCR['games'].' par '.$myCR['username'].' | CROTYpedia');
		$this->f3->set('view','cr/view.htm');
	}

	public function byGame()
	{
		$CRs = new CR($this->db);
		$this->f3->set('list',$CRs->byGame($this->f3->get('PARAMS.id')));

		$Game = new Game($this->db);

		$this->f3->set('game',$myGame = $Game->load(array('id=?',$this->f3->get('PARAMS.id'))));

		$this->f3->set('site_title','CRs de '.$myGame['name'].' | CROTYpedia');
		$this->f3->set('view','cr/indexGame.htm');
	}

	public function byAlpha()
	{
		$CRs = new CR($this->db);
		$this->f3->set('list',$CRs->byAlpha(), 86400);

		$this->f3->set('site_title','Tous les CRs | CROTYpedia');
		$this->f3->set('view','cr/index.htm', 86400);
	}


}
