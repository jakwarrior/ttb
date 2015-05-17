<?php

class User extends DB\SQL\Mapper {

	public function __construct(DB\SQL $db) {
		parent::__construct($db,'user');
	}

    public function login()
    {
        $auth = new \Auth($this, array('id'=>'username', 'pw'=>'password'));
        return $auth->basic(null);
    }
}
