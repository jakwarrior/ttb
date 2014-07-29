<div id="gibbactu" class="homebox">
	<h2><a href="<?php echo $ALIASES['actus_list']; ?>">Gibb'Actu</a></h2>
	<ul>
		<?php foreach (($page['subset']?:array()) as $item): ?>
			<?php echo $this->render('actu/li.htm',$this->mime,get_defined_vars()); ?>
		<?php endforeach; ?>		
	</ul>

	<?php if ($page['pos']+1 < $page['count']): ?>	
		<a class="allinks" href="<?php echo $ALIASES['actus_list']; ?>/<?php echo $page['pos']+2; ?>" title="">plus anciennes &rsaquo;</a>	
	<?php endif; ?>
		
	<?php if ($page['pos'] > 0): ?>
		<a class="allinks" href="<?php echo $ALIASES['actus_list']; ?>/<?php echo $page['pos']; ?>" title="">&lsaquo; plus recentes</a>		
	<?php endif; ?>
	
	<?php if ($page['pos'] > 1): ?>	
		<a class="allinks" href="<?php echo $ALIASES['actus_list']; ?>" title="Gibb'Actu">&lsaquo;&lsaquo; toutes les actus </a>
	<?php endif; ?>	
	
</div><!-- #gibbactu -->