<?php

class CRController extends Controller {

	public function index()
  {
	  $CRs = new CR($this->db);
	  $this->f3->set('list',$CRs->all());

		$Game = new Game($this->db);
		$this->f3->set('games',$Game->all());

	  $this->f3->set('view','cr/index.htm');
	}

	public function view()
	{
		$CRs = new CR($this->db);
		$this->f3->set('cr',$CRs->load(array('id=?',$this->f3->get('PARAMS.id'))));

		$Game = new Game($this->db);
		$this->f3->set('game',$Game->byCR($CRs->id)[0]);

		$this->f3->set('view','cr/view.htm');
	}

	public function byGame()
	{
		$CRs = new CR($this->db);
		$this->f3->set('list',$CRs->byGame($this->f3->get('PARAMS.id')));

		$Game = new Game($this->db);

		$this->f3->set('game',$Game->load(array('id=?',$this->f3->get('PARAMS.id'))));
		$this->f3->set('view','cr/index.htm');
	}

}
