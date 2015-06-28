<?php

class ModsController extends Controller {

  public function index()
    {
        $this->f3->set('view','mods/mods.html');
        echo \Template::instance()->render('layout.htm');
  }

}
