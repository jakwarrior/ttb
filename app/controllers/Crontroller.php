<?php

class Crontroller extends Controller {

	function afterroute() {

	}

	public function gibbactuRaw()
  {
	  $crons = new Cron($this->db);
		$cron = $crons->load(array('name = ?','gibbactu'));

		//On va récupérer les messages :
		$url = "http://forum.hardware.fr/forum2.php?post=177180&cat=5&config=hfr.inc&cache=&page=1&sondage=0&owntopic=0&word=GIBBACTU&firstnum=". $cron->last_id ."&currentnum=0&filter=1";
		//echo $url."<br/>";

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
		$html = curl_exec($ch);

		libxml_use_internal_errors(true);

		$dom = new DOMDocument();
		@$dom->loadHTML($html);
		@$xpath = new DomXpath($dom);

		$divsMessage = $xpath->query("//table[@class='messagetable']");

		$newActus = array();
		$last_id = $cron->last_id;
		foreach ($divsMessage as $key => $node)
		{
			$newActu = array();
			//echo $dom->saveHTML($node);
			//var_dump($xpath->query('.//td[@class = "messCase2"]//a[contains(@href, "profil-")]', $node)->item(0)->getAttribute('href')) ;

			//Le contenu du message
			$divActus = $xpath->query('.//div[starts-with(@id, "para")]',$node);

			if (!$divActus->length) { //c'est la pub, on skip
				//echo "<< la pub\n";
				continue;
			}

			//Check le smiley [:gibbactu]
			$checkSmileyGA = $xpath->query('.//img[contains(@title, "[:gibbactu]")]', $node)->item(0);
			if (!$checkSmileyGA) { //pas de smiley, on skip
				//echo "<< pas de smiley\n";
				continue;
			}

			//le message est candidat à l'actu, on sauvegarde le contenu du message pour le post Process
			$newActu['content_raw'] = $dom->saveHTML($node);
			$newActus[] = $newActu;

			//On enregistre l'ID du message pour le cron.
			$divURL = $xpath->query('.//a[@class="cLink"]',$node);
			$newActu['hfr_url'] = $divURL->item(0)->getAttribute('href');

			$last_id = str_replace('t', '', parse_url($newActu['hfr_url'])['fragment']) + 1;
			echo $last_id."\n";

		}

		//Mise à jour du CRON avec le last_ID
		$cron->date_last_executed = date('Y-m-d H:i:s');
		$cron->last_id = $last_id;
		$cron->save();

		//On ajoute en les actus pour le PostProcess
		$actu = new Actu($this->db);

		foreach($newActus as $actus)
		{
			$actu->content_raw = $actus['content_raw'];
			$actu->content_raw = $actus['content_raw'];
			$actu->save();
			$actu->reset();
		}

		libxml_use_internal_errors(false);

		$this->f3->set('report','Actu(s) ajoutée(s) :'.count($newActus));
		echo Template::instance()->render('cron.htm');
	}

	public function gibbactuPostProcess()
	{
		$Actu = new Actu($this->db);

		$NotProcessedActus = $Actu->find(array('processed = ?', 0));
		//print_r($NotProcessedActus);
		libxml_use_internal_errors(true);
		ob_start();

		foreach($NotProcessedActus as $NPA) {
			$processActu = array();

			//echo $NPA->id."<br>";

			//Raw HTML to DOM/XPATH
			$dom = new DOMDocument();

			$searchPage = mb_convert_encoding($NPA->content_raw, 'HTML-ENTITIES', "UTF-8");
			@$dom->loadHTML($searchPage);
			@$xpath = new DomXpath($dom);

			//userID :
			$processActu['hfr_user_id'] = $xpath->query('//td[@class = "messCase2"]//a[contains(@href, "profil-")]')->item(0)->getAttribute('href');
			$processActu['hfr_user_id'] = preg_replace("/[^0-9]+/", "", $processActu['hfr_user_id']);
			//echo $processActu['hfr_user_id']."<br>";

			//pseudo :
			$processActu['username'] = $xpath->query('//td[@class = "messCase1"]//b[@class = "s2"]')->item(0)->textContent;
			$processActu['username'] = preg_replace('/[^(\x20-\x7F)]*/','', htmlentities($processActu['username']));
			//echo $processActu['username']."<br>";

			//if ($processActu['username'] <> 'roswellent​ongues') {
				//continue;
			//}

			//Check si le smiley est bien directement dans le message
			$checkSmileyGAParent = $xpath->query('//img[contains(@title, "[:gibbactu]")]//..//..//..//div[starts-with(@id, "para")]');

			if (!$checkSmileyGAParent->length) { //pas de smiley, on skip
				//echo "smiley pas à la racine<br/><br/><br/>";
				$NPA->active = 0;
				$NPA->save();
				continue;
			}

			//post ID
			$processActu["hfr_post_id"] = $xpath->query('//a[contains(@href, "#t")]')->item(0)->getAttribute('href');
			$processActu['hfr_post_id'] = str_replace("#t", "", $processActu["hfr_post_id"]);
			//echo $processActu['hfr_post_id'];
			//if ($processActu['hfr_post_id'] <> '11231611') {
			//	continue;
			//}

			//date posted
			$divDate = $xpath->query('//div[@class="toolbar"]/div[@class="left"]');
			$oldate = preg_replace("/[^0-9:-]+/", "", $divDate->item(0)->nodeValue);
			$processActu['date_posted'] = date('Y-m-d H:i', strtotime($oldate));
			//echo $crDatePosted.' ';

			//echo $processActu['username']."\n";
			//le contenu au même niveau que le smiley
			$actuNodesZero = $xpath->query('//img[contains(@title, "[:gibbactu]")]/../node()');

			$processHTMLstep0 = '';
			$startInsert = false;

			foreach ($actuNodesZero as $actuNodeZ)
			{
				if ($actuNodeZ->nodeType == XML_ELEMENT_NODE && $actuNodeZ->getAttribute('title') == '[:gibbactu]') {
					$startInsert = true;
					continue;
				}

				if ($actuNodeZ->nodeType == XML_ELEMENT_NODE && !strcasecmp(trim($actuNodeZ->nodeValue), 'gibbactu')) {
					continue;
				}

				if (!$startInsert) {
					continue;
				}

				//echo "len    =".strlen(trim($actuNodeZ->nodeValue))."\n";
				//echo "htmlen =".strlen(trim($processHTMLstep0))."\n";
				//echo "html   =".($dom->saveHTML($actuNodeZ))."\n";
				if($actuNodeZ->nodeType == XML_ELEMENT_NODE) {
					//echo "tag    =".$actuNodeZ->tagName."\n";
				}
				else {
					//echo "tag    =pasnoded\n";
					if (!strcasecmp(trim(htmlentities($dom->saveHTML($actuNodeZ))), 'gibbactu')) {
						//echo "== gibbactu\n";
						continue;
					}
				}
				if (trim(htmlentities($dom->saveHTML($actuNodeZ))) == '&nbsp;') {
					//echo ">> on skip\n";
					continue;
				}

				if (!strlen(trim($processHTMLstep0)) && $actuNodeZ->nodeType == XML_ELEMENT_NODE && $actuNodeZ->tagName == 'br') {
					//echo ">> on skip\n";
					continue;
				}
				//echo "==\nNew HTML:\n".htmlentities($processHTMLstep0)."\n============\n";

				//var_dump($actuNodeZ);
				$processHTMLstep0.=htmlentities($dom->saveHTML($actuNodeZ));
				//echo htmlentities($dom->saveHTML($actuNodeZ))."\n".$actuNodeZ->nodeValue."\n\n";
			}

			//On va chercher tout le contenu APRES le smiley gibbactu
			$actuNodes = $xpath->query('//img[contains(@title, "[:gibbactu]")]/../following-sibling::*');

			//var_dump($actuNodes);

			$processHTMLstep1 = $processHTMLstep0;

			foreach ($actuNodes as $actuNode)
			{

				//echo $dom->saveHTML($actuNode)."\n";
				//echo "===\n".$actuNode->tagName." = ".$actuNode->getAttribute('class')."\n\n";
				//var_dump($actuNode);
				if ($actuNode->getAttribute('class') == 'edited') {
							//echo "skip";
					break;
				}

				if ($actuNode->getAttribute('class') == 'signature' ||
					$actuNode->getAttribute('style') == 'clear: both;') {
							//echo "skip";
					continue;
				}

				if ($actuNode->nodeValue || $actuNode->childNodes) {
					$processHTMLstep1.=htmlentities($dom->saveHTML($actuNode));
				}
				else {
					//var_dump($actuNode->childNodes);
					//echo "noNodeValue=".$dom->saveHTML($actuNode)."\n\n";
				}

			}

			$processHTMLfinal = $processHTMLstep1;


			$processHTMLfinal = str_replace("\n", '', $processHTMLfinal);
			$processHTMLfinal = str_replace("\r", '', $processHTMLfinal);

			//HFR HTML fix
			$processHTMLfinal = htmlentities(str_replace("<p><br></p>", '', html_entity_decode($processHTMLfinal)));
			$processHTMLfinal = str_replace("&lt;p&gt;&lt;br&gt;&nbsp;&lt;br&gt;&lt;/p&gt;", '', $processHTMLfinal);
			$processHTMLfinal = str_replace("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ", '', $processHTMLfinal);
			$processHTMLfinal = htmlentities(str_replace("<p><br>", '<p>', html_entity_decode($processHTMLfinal)));
			//

			$processHTMLfinal = htmlentities(str_replace('href="/hfr/', 'target="_blank" href="http://forum.hardware.fr/hfr/', html_entity_decode($processHTMLfinal)));
			$processHTMLfinal = htmlentities(preg_replace('/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/i', '', html_entity_decode($processHTMLfinal)));
			$processHTMLfinal = htmlentities(preg_replace('/onload="[^\"]+"/i', 'onload="return;"', html_entity_decode($processHTMLfinal)));
			$processHTMLfinal = htmlentities(preg_replace('/title="[^\"]+"/i', '', html_entity_decode($processHTMLfinal)));

			//echo $processHTMLfinal;

			if (!$processHTMLfinal) {
				echo "aucun contenu = ".$NPA->id."<br/><br/><br/>";
				$NPA->active = 0;
				$NPA->processed = 1;
				$NPA->save();
				continue;
			}


			$NPA->hfr_cat_id = 5;
			$NPA->hfr_subcat_id = 249;
			$NPA->hfr_topic_id = 177180;
			//$NPA->hfr_page_id
			$NPA->hfr_post_id = $processActu['hfr_post_id'];
			$NPA->hfr_user_id = $processActu['hfr_user_id'];
			$NPA->username = $processActu['username'];

			$NPA->date_modified = date('Y-m-d H:i:s');
			$NPA->date_posted = $processActu['date_posted'];

			$NPA->content=$processHTMLfinal;
			$NPA->active = 1;
			$NPA->processed = 1;
			$NPA->save();
			echo "\n\n\n\n\n";

		}

		$myStr = ob_get_contents();
		ob_end_clean();
		libxml_use_internal_errors(false);

			echo $myStr;

		//$this->f3->set('report',$myStr);
		//echo Template::instance()->render('cron.htm');
	}

	public function crotyPostProcess()
	{
		$CR = new CR($this->db);

		$NotProcessed = $CR->find(array('processed = ?', 0));
		//print_r($NotProcessedActus);
		libxml_use_internal_errors(true);
		ob_start();

		foreach($NotProcessed as $NP) {
			//print_r($NP);
			echo "========\nDEBUT\n\n";
			$process = $NP->processRawContent(array('content_raw' => $NP->content_raw));

			$NP->hfr_cat_id = 5;
			$NP->hfr_subcat_id = 249;
			$NP->hfr_topic_id = 177180;
			//$NPA->hfr_page_id
			$NP->hfr_post_id = $process['hfr_post_id'];
			$NP->hfr_user_id = $process['hfr_user_id'];
			$NP->username = $process['username'];

			$NP->date_modified = date('Y-m-d H:i:s');
			$NP->date_posted = $process['date_posted'];

			$NP->content = $process['content'];
			$NP->active = 1;
			$NP->save();
			echo "\n\n\n\n\n";

		}

		$myStr = ob_get_contents();
		ob_end_clean();
		libxml_use_internal_errors(false);

		echo $myStr;

	}
}
