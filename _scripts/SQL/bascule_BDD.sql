-- creation table user
CREATE TABLE IF NOT EXISTS `user` (
  `hfr_user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `isAdmin` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`hfr_user_id`),
  UNIQUE KEY `hfr_user_id` (`hfr_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

INSERT IGNORE INTO `user`(`username`, `hfr_user_id`) SELECT `username`, `hfr_user_id` FROM `cr`;
INSERT IGNORE INTO `user`(`username`, `hfr_user_id`) SELECT `username`, `hfr_user_id` FROM `actu`;

-- jakwarrior est admin
UPDATE `user` SET `isAdmin`=1, `email`='jakwarrior45@hotmail.com' WHERE `hfr_user_id`=929138; 
-- gibbonaz est admin
UPDATE `user` SET `isAdmin`=1 WHERE `hfr_user_id`=266770;
-- thefolken est admin
UPDATE `user` SET `isAdmin`=1 WHERE `hfr_user_id`=89386;

-- update id Etahos
UPDATE `cr` SET `hfr_user_id`=1024630, `username`='Etahos', `comment`='' WHERE `comment`='Etahos';

-- suppression Taxalot vu qu'il ne veut plus apparaitre
UPDATE `cr` SET `comment`='' WHERE `comment`='Taxalot';