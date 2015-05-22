<?php

class TUPCController extends Controller {

  public function index()
  {
      $this->f3->set('view', 'error.html');
      //$this->f3->redirect('GET /external-link', 'http://www.google.fr');
  }

}
