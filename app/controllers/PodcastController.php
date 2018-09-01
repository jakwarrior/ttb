<?php

class PodcastController extends Controller {

  public function index()
    {
        $this->f3->set('view','podcast/podcast.html');
        $this->f3->set('includePodcast', 'true');
        $this->f3->set('site_title','Les podcasts de TTB' );
        echo \Template::instance()->render('layout.htm');
  }

}
