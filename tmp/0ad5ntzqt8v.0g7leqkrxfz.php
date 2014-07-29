<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="<?php echo $ENCODING; ?>" />
		<title><?php echo $site; ?></title>
		<base href="<?php echo $SCHEME.'://'.$HOST.':'.$PORT.$BASE.'/'; ?>" />
		<link rel="stylesheet" href="ui/css/base.css" type="text/css" />
		<link rel="stylesheet" href="ui/css/theme.css" type="text/css" />
		<link rel="stylesheet" href="lib/code.css" type="text/css" />
	</head>
	<body>
		<div class="container">
			<div class="header">
			
				<h1><a href="/" title="<?php echo $site; ?>"><?php echo $site; ?></a></h1>
				<h3>&laquo; Seulement -80% ? J'attendrais les soldes. &raquo; <i>Un Maitre Tartuffier</i></h3>
					
				<ul>
					<li class="gibbactu"><a href="/gibbactu" title="Gibb'Actu">Gibb'Actu</a></li>
					<li class="hfrtv"><a href="/hfrtv" title="HFRtv">HFRtv</a></li>			
					<li class="crotypedia"><a href="/crotypedia" title="">CROTYpedia</a></li>
				</ul>					
			</div>
		</div>

		<div class="container">
			<?php echo $this->render($view,$this->mime,get_defined_vars()); ?>
		</div>
		
		<div class="container">
			<div class="footer">
				<h3>Sponsorisé par :</h3>
				
				<h5>soon&copy;</h2>
				
				<span class="copy">ⓣ tartufferight 2014 FLK. No Rights Reserved. </span
			</div>
		</div>
	</body>
</html>
