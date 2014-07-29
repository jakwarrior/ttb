<li>
	<?php echo $this->raw($item['content']); ?>
	<span class="date"><?php echo date('j/m/y à G\hi', strtotime($item['date_posted']) ); ?></span>
</li>