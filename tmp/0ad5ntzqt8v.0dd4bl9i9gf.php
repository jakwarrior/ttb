<div id="gibbactu" class="homebox">
	<h2><a href="<?php echo $ALIASES['actus_list']; ?>">Gibb'Actu</a></h2>
	<ul>
		<?php foreach (($actus?:array()) as $item): ?>
			<?php echo $this->render('actu/li.htm',$this->mime,get_defined_vars()); ?>
		<?php endforeach; ?>		
		
	</ul>
	<a class="allinks" href="<?php echo $ALIASES['actus_list']; ?>" title="Gibb'Actu">toutes les actus &rsaquo;</a>
</div><!-- #gibbactu -->

<div id="hfrtv" class="homebox">
	<h2><a href="<?php echo $ALIASES['streams_list']; ?>">HFR.tv</a></h2>
	<ul class="name">
		<?php foreach (($streams?:array()) as $item): ?>
			<?php echo $this->render('stream/li.htm',$this->mime,get_defined_vars()); ?>			
		<?php endforeach; ?>
	</ul>
	<a class="allinks" href="<?php echo $ALIASES['streams_list']; ?>" title="HFR.tv">tous les streams &rsaquo;</a>	
</div><!-- #hfrtv -->

<div id="crotypedia" class="homebox">
	<h2><a href="<?php echo $ALIASES['crs_list']; ?>">CROTYpedia</a></h2>
	<ul>
		<?php foreach (($crs?:array()) as $item): ?>
			<?php echo $this->render('cr/li.htm',$this->mime,get_defined_vars()); ?>
		<?php endforeach; ?>
	</ul>
	<a class="allinks" href="<?php echo $ALIASES['crs_list']; ?>" title="CROTYpedia">tous les CRs &rsaquo;</a>	
</div><!-- #crotypedia -->