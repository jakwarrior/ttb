<?php

class RSSController extends Controller {

  function afterroute() {

  }

  public function all()
  {

    $RSS = new RSS($this->db);


    $this->f3->set('feed_url',$this->f3->get('site').$this->f3->get('ALIASES')['rss_all']);
    $this->f3->set('feed_title','CR&amp;Actus');
    $this->f3->set('feeds',$RSS->all());

    echo Template::instance()->render('rss/feed.xml','application/xml');
  }

  public function gibbactu()
  {

    $RSS = new RSS($this->db);


    $this->f3->set('feed_url',$this->f3->get('site').$this->f3->get('ALIASES')['rss_all']);
    $this->f3->set('feed_title','Actus');
    $this->f3->set('feeds',$RSS->gibbactu());

    echo Template::instance()->render('rss/feed.xml','application/xml');
  }

  public function crotypedia()
  {

    $RSS = new RSS($this->db);


    $this->f3->set('feed_url',$this->f3->get('site').$this->f3->get('ALIASES')['rss_all']);
    $this->f3->set('feed_title','CR');
    $this->f3->set('feeds',$RSS->crotypedia());

    echo Template::instance()->render('rss/feed.xml','application/xml');
  }

}
