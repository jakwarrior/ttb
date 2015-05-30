<?php
include_once 'app/vendor/functions.php';

class HomeController extends Controller {

	public function index()
    {
        $Actus = new Actu($this->db);
        $CRs = new CR($this->db);
        $utils = new Utils();
        $user = new User($this->db);

        sec_session_start();

        $check = $user->loginCheck();

        if (count($check) == 2) {
            $this->f3->set('normalLoginCheck', $check['normalLoginCheck']);
            $this->f3->set('adminLoginCheck', $check['adminLoginCheck']);
        }

        $actus = $Actus->all(10);

        foreach ($actus as $subKey => $subArray) {
            $subArray['content'] = $utils->content_post_treatment($subArray['content']);

            if ((isset($check['normalLoginCheck'])) && ($check['normalLoginCheck'] == 'true') && (isset($check['adminLoginCheck'])) && ($check['adminLoginCheck'] == 'false') && ($this->f3->exists('SESSION.username'))
                && ($this->f3->get('SESSION.username') == $subArray['username'])) {

                if ($user->checkActuPossession($subArray['id'])) {
                    $subArray['checkActuPossession'] = 'true';
                }
            }

            $actus[$subKey] = $subArray;
        }

        $this->f3->set('actus',$actus);
        $this->f3->set('crs',$CRs->all(20));
		//$this->f3->set('streams',$Streams->find(NULL, array('order'=>'twitch_username ASC')));


		$this->f3->set('site_title','Un torrent d\'informations — TTB');

        $this->f3->set('page_head','Le premier site d\'information des tartuffes :o');
        $this->f3->set('view','home.htm');
        echo \Template::instance()->render('layout.htm');

	}

}
