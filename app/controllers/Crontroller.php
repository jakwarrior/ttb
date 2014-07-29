<?php

class Crontroller extends Controller {

	public function gibbactu()
    {
        $crons = new Cron($this->db);
		$cron = $crons->load(array('name = ?','gibbactu'));
		
		//On va récupérer les messages :
		$url = "http://forum.hardware.fr/forum2.php?post=177180&cat=5&config=hfr.inc&cache=&page=1&sondage=0&owntopic=0&word=GIBBACTU&spseudo=gibbonaz&firstnum=". $cron->last_id .'&currentnum=0&filter=1';
		
		$ch = curl_init();
		//curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
		curl_setopt($ch, CURLOPT_URL,$url);
		//curl_setopt($ch, CURLOPT_FAILONERROR, true);
		//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		//curl_setopt($ch, CURLOPT_AUTOREFERER, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
		//curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		$html = curl_exec($ch);

		libxml_use_internal_errors(true);

		$dom = new DOMDocument();
		@$dom->loadHTML($html);
		@$xpath = new DomXpath($dom);
		
		$messages = $xpath->query("//td[@class='messCase2']");

		$newActus = array();
		$last_id = $cron->last_id;
		foreach($messages as $element)
		{
			//echo $dom->saveHTML($element);
			
			//Les actus eventuelles du post
			$divActus = $xpath->query('div[starts-with(@id, "para")]',$element);
			
			if (!$divActus->length) { //bug :o
				continue;
			}
						
			//La date du post
			$divDate = $xpath->query('div[@class="toolbar"]/div[@class="left"]',$element);
			$oldate = preg_replace("/[^0-9:-]+/", "", $divDate->item(0)->nodeValue);
			$newdate = date('Y-m-d H:i', strtotime($oldate));
						
			//l'URL du post
			$divURL = $xpath->query('a[@class="cLink"]',$element);
			
			//On choppe les différentes actus dans le ul/li
			$divLi = $xpath->query('ul/li',$divActus->item(0));
			
			$uneActu = array();
			foreach($divLi as $actuLi)
			{
				
				$uneActu['hfr_url'] = $divURL->item(0)->getAttribute('href');
				
				$last_id = str_replace('t', '', parse_url($uneActu['hfr_url'])['fragment']) + 1;

				$uneActu['date_posted'] = $newdate;
				$uneActu['content'] = str_replace(array('<ul>', '<li>', '</li>', '</ul>'), '', trim($dom->saveHTML($actuLi)));
				
				$newActus[] = $uneActu;
			}

		}
		
		//print_r($newActus);
		
		$cron->date_last_executed = date('Y-m-d H:i:s');
		$cron->last_id = $last_id;
		$cron->save();
		
		//On ajoute en DB

		$actu = new Actu($this->db);
		
		foreach($newActus as $actus)
		{
	        
			$actu->hfr_url = $actus['hfr_url'];
			$actu->date_posted = $actus['date_posted'];
			$actu->content = $actus['content'];
			$actu->save();
			$actu->reset();
			
		}

		libxml_use_internal_errors(false);
		
		$this->f3->set('report','Actu(s) ajoutée(s) :'.count($newActus));
       	$this->f3->set('view','cron.htm');
	}

}