#!/usr/local/bin/php
<?php
$date = date('d-m-Y');

// Répertoire de destination des backups (chemin absolu !)
define('DIR_DEST', '/home/XXXXX/_archives/');

// Paramètres de connexion à la base de données
define('DB_HOST', 'XXXXX.mysql.db');
define('DB_USER', 'XXXXX');
define('DB_PWD', 'XXXXX');
define('DB_NAME', 'XXXXXX');

//echo "mysqldump --host=".DB_HOST." --user=".DB_USER." --password=".DB_PWD." ".DB_NAME." > ".DIR_DEST.DB_NAME."-".$date.".sql";

// Lancement du backup
system("mysqldump --host=".DB_HOST." --user=".DB_USER." --password=".DB_PWD." ".DB_NAME." > ".DIR_DEST.DB_NAME."-".$date.".sql");
system("gzip ".DIR_DEST.DB_NAME."-".$date.".sql");

//Suppression des vieux fichiers
/** define the directory **/
$dir = "/home/XXXXXX/_archives/"; // chemin absolu exemple:"/homez.xxxx/xxxxx/www/_archives/"

/*** cycle through all files in the directory ***/
foreach (glob($dir."*.gz") as $file) {

    /*** if file is 30 days (2592000 seconds) old then delete it ***/
    if (filemtime($file) < time() - 2592000) { //temps en seconde (30jours)
        unlink($file);
    }
}
?>