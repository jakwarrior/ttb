<style>li.<?php echo $item['twitch_username']; ?>:after { background-image:url('<?php echo $item['image_url']; ?>');}</style>
<li class="<?php echo $item['twitch_username']; ?>"><a href="http://twitch.tv/<?php echo $item['twitch_username']; ?>" title=""><?php echo $item['twitch_username']; ?> <?php if ($item['hfr_username'] <> $item['twitch_username']): ?>(<?php echo $item['hfr_username']; ?>)<?php endif; ?></a></li>
