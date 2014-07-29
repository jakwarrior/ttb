<div id="hfrtv" class="homebox">
	<h2><a href="<?php echo $ALIASES['streams_list']; ?>">HFR.tv</a></h2>
	<ul class="name">
		<?php foreach (($streams?:array()) as $item): ?>
			<?php echo $this->render('stream/li.htm',$this->mime,get_defined_vars()); ?>			
		<?php endforeach; ?>
	</ul>

</div><!-- #hfrtv -->