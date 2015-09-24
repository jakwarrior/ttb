<?php

class SondagesController extends Controller {

  public function index()
    {
        $this->f3->set('view','sondages/sondages.html');
        $this->f3->set('site_title','L\'historique des sondages' );
        echo \Template::instance()->render('layout.htm');
  }

}
