<div id="crotypedia" class="homebox">
	<h2><a href="<?php echo $ALIASES['crs_list']; ?>">CROTYpedia</a></h2>
	<ul>
		<?php foreach (($list?:array()) as $item): ?>
			<?php echo $this->render('cr/li.htm',$this->mime,get_defined_vars()); ?>
		<?php endforeach; ?>
	</ul>
</div><!-- #crotypedia -->