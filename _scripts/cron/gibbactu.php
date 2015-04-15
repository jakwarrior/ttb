#!/usr/local/bin/php
<?php
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://www.thetartuffebay.org/cron/gibbactu");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);

		echo $output;


		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "http://www.thetartuffebay.org/cron/gibbactuprocess");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($ch);
		curl_close($ch);

		echo $output;
?>
