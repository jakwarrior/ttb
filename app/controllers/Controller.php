<?php

class Controller {

    protected $f3;
    protected $db;
    protected $cache;

    function beforeroute() {
        //Header

        $Streams = new Stream($this->db);


        $crss = array (
        array('image' => 'http://image.jeuxvideo.com/images/pc/s/t/starcraft-ii-heart-of-the-swarm-pc-00b.jpg', 'username' => 'Zuukaa', 'games' => 'Stacraft 2', 'date' => '29/09@18h15', 'description' => 'Top Master@Europe'),
        array('image' => 'http://farm6.staticflickr.com/5512/9674184368_51841e9b56.jpg', 'username' => 'Gracchus', 'games' => 'Dark Souls 2', 'date' => '30/09@21h00', 'description' => 'DLC, part.3'),
        //array('image' => 'http://www.gamerobs.com/galerie/upload/data/8200147588b526f402ff2b591c3ffd49.jpg', 'username' => 'bultom', 'games' => 'SimCity 2013', 'date' => '01/10@21h00', 'description' => 'Run sous contrainte'),
        array('image' => 'http://www.dlcompare.fr/img/banished-img-4.jpg', 'username' => 'Nightbringer57', 'games' => 'Banished', 'date' => '02/10@21h30', 'description' => 'Plus fort que le blabla, le TT, la sodogravier...'),
        //array('image' => 'http://cdn.akamai.steamstatic.com/steam/apps/211420/header.jpg?t=1414091965', 'username' => 'bauer_attitude', 'games' => 'Dark Souls', 'date' => '03/10@21h00', 'description' => 'J\'ai Mal'),
        array('image' => 'http://g3ar.co.za/wp-content/uploads/2014/02/Rouge-light-FPS-Tower-of-Guns-Comes-to-PC-on-March-4th-News-G3AR-600x300.jpg', 'username' => 'Ze_Fly', 'games' => 'Tower Of Guns', 'date' => '04/09@18h00', 'description' => 'L\'école du skill :o')
        );

        $this->f3->set('inc_streams',$crss);

        //Header

        //Menu
        //$menu = array();
        $menu[] = array('title' => 'Mon Compte',
                        'url' =>   $this->f3->get('ALIASES.account'),
                        'color' => '#B02C2B',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/user.png)');

        $menu[] = array('title' => 'Accueil',
                        'url' =>   $this->f3->get('ALIASES.home'),
                        'color' => '#3F4C6C',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/home.png)');

        $menu[] = array('title' => 'Gibbactus',
                        'url' =>   $this->f3->get('ALIASES.actus_list'),
                        'color' => 'rgb(3, 37, 74)',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/news.png)');

        $menu[] = array('title' => 'HFR.tv',
                        'url' =>   $this->f3->get('ALIASES.streams_list'),
                        'color' => 'rgb(100, 65, 165)',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/hfrtv.png)');

        $menu[] = array('title' => 'CROTYpedia',
                        'url' =>   $this->f3->get('ALIASES.crs_list'),
                        'color' => '#B02C2B',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/book.png)');

        $menu[] = array('title' => 'Tartuffe Chat',
                        'url' =>   $this->f3->get('ALIASES.chat'),
                        'color' => '#3F4C6C',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/chat.png)');

        $menu[] = array('title' => 'Mods',
                        'url' =>   $this->f3->get('ALIASES.mods_list'),
                        'color' => 'rgb(3, 37, 74)',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/mods.png)');

        $menu[] = array('title' => 'Topic PC',
                        'url' =>   $this->f3->get('ALIASES.tupc_list'),
                        'color' => '#f18f18',
                        'tcolor' => 'white',
                        'icon' => 'url(/ui/images/hfr.png)');


        //current URL
        $full_url = str_replace("?".$_SERVER['QUERY_STRING'], "", $_SERVER['REQUEST_URI']);

        $urls = explode("/", $full_url);
        $current_url = "/".$urls[1];

        foreach ($menu as &$menu_item) {
            if($menu_item['url'] == $current_url)
                $menu_item['selected'] = "selected";
            else
                $menu_item['selected'] = "";
        }

        $this->f3->set('menu',$menu);




    }

    function afterroute() {
        echo Template::instance()->render('layout.htm');
    }

    function __construct() {

        $f3=Base::instance();
        $cache=Cache::instance();

        $db=new DB\SQL(
            $f3->get('db_dns') . $f3->get('db_name'),
            $f3->get('db_user'),
            $f3->get('db_pass')
        );

    $this->f3=$f3;
    $this->db=$db;
    $this->cache=$cache;
    }
}
