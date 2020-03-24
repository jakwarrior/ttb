#!/usr/local/bin/php
<?php
        echo 'Launch';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://www.thetartuffebay.dev/cron/gibbactu");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);

		echo $output;


		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "http://www.thetartuffebay.dev/cron/gibbactuprocess");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($ch);
		curl_close($ch);

		echo $output;
?>
