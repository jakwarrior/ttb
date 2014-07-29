<?php

class CRController extends Controller {

	public function index()
    {
        $CRs = new CR($this->db);
        $this->f3->set('list',$CRs->all());
        $this->f3->set('view','cr/list.htm');
	}
	
	public function view()
	{
        $CRs = new CR($this->db);
        $this->f3->set('cr',$CRs->load(array('id=?',$this->f3->get('PARAMS.id'))));
        $this->f3->set('view','cr/view.htm');		
	}
	/*

    public function create()
    {
        if($this->f3->exists('POST.create'))
        {
            $user = new User($this->db);
            $user->add();

            $this->f3->reroute('/success/New User Created');
        } else
        {
            $this->f3->set('page_head','Create User');
            $this->f3->set('view','user/create.htm');
        }

    }
    public function update()
    {

        $user = new User($this->db);

        if($this->f3->exists('POST.update'))
        {
            $user->edit($this->f3->get('POST.id'));
            $this->f3->reroute('/success/User Updated');
        } else
        {
            $user->getById($this->f3->get('PARAMS.id'));
            $this->f3->set('user',$user);
            $this->f3->set('page_head','Update User');
            $this->f3->set('view','user/update.htm');
        }

    }

    public function delete()
    {
        if($this->f3->exists('PARAMS.id'))
        {
            $user = new User($this->db);
            $user->delete($this->f3->get('PARAMS.id'));
        }

        $this->f3->reroute('/success/User Deleted');
    }*/
}