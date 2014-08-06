<?php

function toAscii($str) {
	$clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $str);
	$clean = strtolower(trim($clean, '-'));
	$clean = preg_replace("/[\/_|+ -]+/", '-', $clean);

	return $clean;
}

$f3=require('lib/base.php');
$f3->config('config.ini');
$f3->config('routes.ini');
$f3->set('LANGUAGE', 'fr-FR');
$f3->run();

?>
