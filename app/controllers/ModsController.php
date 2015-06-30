<?php

class ModsController extends Controller {

  public function index()
    {
        $this->f3->set('view','mods/mods.html');
        $this->f3->set('site_title','Les mods made in TTB');
        echo \Template::instance()->render('layout.htm');
  }

}
