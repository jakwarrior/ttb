<?php

class TUPCController extends Controller {

  public function index()
  {
      $this->f3->set('view', 'error.html');
      echo \Template::instance()->render('layout.htm');
  }

}
