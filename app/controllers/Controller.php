<?php

class Controller {

    protected $f3;
    protected $db;
    protected $cache;

    function beforeroute() {
        //Header

        $Stream = new Stream($this->db);
        $Event = new Event($this->db);
        $event = $Event->getListEvents(4);

        $crss = array ();

        foreach ($event as $subKey => $sub) {
            $tmp = array();
            if ($sub['streamer_id'] == -1) {
                $tmp['image'] = 'http://i.imgur.com/SmVJZp7.png';
                if ($sub['url'] == '') {
                    $tmp['adress'] = $this->f3->get('ALIASES.streams_list');
                } else {
                    $tmp['adress'] = $sub['url'];
                }
            } else {
                $streamer = $Stream->byId($sub['streamer_id']);

                if (count($streamer) > 0) {
                    $streamer = $streamer[0];
                    $tmp['image'] = $streamer['image_url'];
                    $tmp['adress'] = $this->f3->get('ALIASES.streams_list') . '/' . $sub['streamer'];
                }
            }

            $tmp['username'] = $sub['streamer'];
            $tmp['games'] = $sub['game'];
            $tmp['date'] = $sub['date'];
            array_push($crss, $tmp);
        }

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

        $menu[] = array('title' => 'Salon des Tartuffes',
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
                        /*'url' =>   $this->f3->get('ALIASES.tupc_list'),*/
                        'url' => 'http://forum.hardware.fr/hfr/JeuxVideo/PC/joueurs-downgrade-edition-sujet_177180_1.htm',
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
