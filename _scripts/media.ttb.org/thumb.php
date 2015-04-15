<?php

$dir_cache = 'cache/';

if (!$_GET['format'] && !$_GET['url']) {
  exit();
}
else {
  $img_format = $_GET['format'];
  $img_url = str_replace('/'.$img_format.'/', '', $_SERVER['REQUEST_URI']);
  //echo "\n".$img_url;
  //on hash l'URL pour voir si c'est déjà en cache
  $img_md5 = md5($img_url);

  //on vérifie si la full existe en CACHE
  if (!file_exists($full_url = $dir_cache."full/".$img_md5)) {
    //echo "\nexiste pas=".$full_url;
    $ch = curl_init ($img_url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
    $raw = curl_exec($ch);
    curl_close ($ch);

    $fp = fopen($full_url,'x');
    fwrite($fp, $raw);
    fclose($fp);

  }
  else {
    //echo "\nexiste=".$full_url;
  }

  //on check les mini

  if ($img_format == 'small') {
    $thumb_width = 300;
  }
  elseif ($img_format == 'medium') {
    $thumb_width = 500;
  }
  else
    $thumb_width = 1000;

  //on affiche l'image
  if (($img_info = getimagesize($full_url)) === FALSE)
  die("Image not found or not an image");


  switch ($img_info[2]) {
    case IMAGETYPE_GIF  : $src = imagecreatefromgif($full_url);  break;
    case IMAGETYPE_JPEG : $src = imagecreatefromjpeg($full_url); break;
    case IMAGETYPE_PNG  : $src = imagecreatefrompng($full_url);  break;
    default : die("Unknown filetype");
  }

  //echo "\n".$src;

  $width = $img_info[0];  $height = $img_info[1];
  $original_aspect = $width / $height;

  //echo "\nw=".$width." h=".$height;

  $new_width = $thumb_width;
  $new_height = $height / ($width / $thumb_width);

  //echo "\nw=".$new_width." h=".$new_height;

  $dst = $dir_cache.$img_format."/".$img_md5;

  if (!file_exists($dst)) {
    // create thumbnail
    $tmp = imagecreatetruecolor($thumb_width, $new_height);
    imagecopyresampled($tmp, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    imagejpeg($tmp, $dst, 90);
  }

  header('Content-Type: image/jpeg');
  header('Cache-Control: public');
  header('Expires: '. gmdate( 'D, d M Y H:i:s',time()+60*60*30 ) .' GMT' );

  readfile($dst);
}

?>
