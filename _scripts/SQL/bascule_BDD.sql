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
UPDATE `user` SET `isAdmin`=1, `email`='jakwarrior45@hotmail.com', password='$2y$10$8UHAMpk61CFeODmnUfpmS.PJA4h59kdyb3h86uDevC5ScsNbDHU2G' WHERE `hfr_user_id`=929138; 
-- gibbonaz est admin
UPDATE `user` SET `isAdmin`=1 WHERE `hfr_user_id`=266770;
-- thefolken est admin
UPDATE `user` SET `isAdmin`=1 WHERE `hfr_user_id`=89386;

-- update id Etahos
UPDATE `cr` SET `hfr_user_id`=1024630, `username`='Etahos', `comment`='' WHERE `comment`='Etahos';

-- suppression Taxalot vu qu'il ne veut plus apparaitre
UPDATE `cr` SET `comment`='' WHERE `comment`='Taxalot';

-- streams
DROP TABLE `stream`;

CREATE TABLE IF NOT EXISTS `stream` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`hfr_user_id` int(11) NOT NULL DEFAULT 0,
	`username` varchar(255) NOT NULL DEFAULT '',
	`twitch_url` varchar(255) NOT NULL DEFAULT '',
	`twitch_username` varchar(255) NOT NULL DEFAULT '',
	`hitbox_url` varchar(255) NOT NULL DEFAULT '',
	`hitbox_username` varchar(255) NOT NULL DEFAULT '',
	`image_url` varchar(255) NOT NULL DEFAULT '',
	`replay_youtube_url` varchar(255) NOT NULL DEFAULT '',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (687533,'Ze_Fly','http://www.twitch.tv/GroMatt', 'GroMatt', 'http://www.hitbox.tv/gromatt', 'gromatt', 'http://static-cdn.jtvnw.net/jtv_user_pictures/gromatt-profile_banner-e6d3c945c3c30aac-480.jpeg','https://www.youtube.com/playlist?list=PLrjcdfa13Z90etCysy22xs1dOvDwn7uh-');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`) VALUES (855779,'Astrain','http://www.twitch.tv/astrain_', 'astrain_', 'http://www.hitbox.tv/Astrain', 'Astrain','http://i.imgur.com/SmVJZp7.png');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`, `replay_youtube_url`) VALUES (683029,'bauer_attitude','http://www.twitch.tv/bauer_attitude', 'bauer_attitude', 'http://static-cdn.jtvnw.net/jtv_user_pictures/bauer_attitude-profile_banner-d7f84c4fd0d41e29-480.png','https://www.youtube.com/playlist?list=PLrjcdfa13Z906sF0X6NZquirfXymg-7TY');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`, `replay_youtube_url`) VALUES (204926,'zephiel','http://www.twitch.tv/Geekopathic', 'Geekopathic', 'http://static-cdn.jtvnw.net/jtv_user_pictures/geekopathic-channel_offline_image-e6be488d4724ea96-640x360.png','https://www.youtube.com/playlist?list=PLrjcdfa13Z91zcg6U5FeFbAQ6GUyixYCd');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`, `replay_youtube_url`) VALUES (354222,'NightEye','http://www.twitch.tv/nighteyehfr', 'nighteyehfr', 'http://static-cdn.jtvnw.net/jtv_user_pictures/nighteyehfr-profile_banner-9fc9bf7493c39c0e-480.jpeg','https://www.youtube.com/playlist?list=PLrjcdfa13Z90Qqf6Y8l5gDBYEtxow0ZhP');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (174957,'Gracchus13','http://www.twitch.tv/Gracchus13', 'Gracchus13', 'http://www.hitbox.tv/Gracchus13', 'Gracchus13', 'http://edge.sf.hitbox.tv/static/img/channel/cover_5540eece3c2d8.jpg','https://www.youtube.com/playlist?list=PLrjcdfa13Z91yBQYQd7tdd3jvYsuzTco_');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`) VALUES (607634,'zad38','http://www.twitch.tv/zadfr', 'zadfr', 'http://static-cdn.jtvnw.net/jtv_user_pictures/zadfr-channel_offline_image-19cda6e51933f8f9-640x360.jpeg');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`, `replay_youtube_url`) VALUES (620710,'blood_sam','http://www.twitch.tv/blood_sam', 'blood_sam', 'http://static-cdn.jtvnw.net/jtv_user_pictures/blood_sam-profile_banner-68fc225a9c5dcb50-480.jpeg','https://www.youtube.com/playlist?list=PLrjcdfa13Z91YK0s3KJqUFg2LVUDutola');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`) VALUES (266770,'gibbonaz','http://www.twitch.tv/gibbonaz', 'gibbonaz', 'http://i.imgur.com/SmVJZp7.png');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (929138,'jakwarrior','http://www.twitch.tv/jakwarrior', 'jakwarrior', 'http://www.hitbox.tv/jakwarrior', 'jakwarrior', 'http://edge.sf.hitbox.tv/static/img/channel/cover_54e9d734482f6.jpg','https://www.youtube.com/playlist?list=PLrjcdfa13Z92NfOH9dmTyVx3-uTYTIEyC');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (1056453,'bultom','http://www.twitch.tv/bultom', 'bultom', 'http://www.hitbox.tv/bultom', 'bultom', 'http://i.imgur.com/SmVJZp7.png','https://www.youtube.com/playlist?list=PLrjcdfa13Z93vgN7C3gJImBiZ_H_u7HUt');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (388129,'Shinseiki','http://www.twitch.tv/shinseiki', 'shinseiki', 'http://www.hitbox.tv/Shinseiki', 'Shinseiki', 'http://edge.sf.hitbox.tv/static/img/channel/cover_54e4f2a87091c.jpg','https://www.youtube.com/playlist?list=PLrjcdfa13Z92fvJGjaxtW_RjyAndKaDzU');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (555927,'nightbringer57','http://www.twitch.tv/nightbringer57', 'nightbringer57', 'http://www.hitbox.tv/nightbringer57', 'nightbringer57', 'http://i.imgur.com/SmVJZp7.png','https://www.youtube.com/playlist?list=PLrjcdfa13Z923ppEbuEs-tDwXWPY7DiZ6');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`, `replay_youtube_url`) VALUES (785598,'Takarajima','http://www.twitch.tv/duckie_dolent', 'duckie_dolent', 'http://i.imgur.com/SmVJZp7.png','https://www.youtube.com/playlist?list=PLrjcdfa13Z920icgHwrbAcYGY6RrZm7eK');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (878509,'elkhoul','http://www.twitch.tv/cptkhoul', 'cptkhoul', 'http://www.hitbox.tv/CptKhoul', 'CptKhoul', 'http://edge.sf.hitbox.tv/static/img/channel/cover_555dc91f82621.jpg','https://www.youtube.com/playlist?list=PLrjcdfa13Z90oW4Fves1QuTLjm30_NWan');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`) VALUES (90165,'dbbg','http://www.twitch.tv/dbbg75', 'dbbg75', 'http://i.imgur.com/SmVJZp7.png');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `hitbox_url`, `hitbox_username`, `image_url`, `replay_youtube_url`) VALUES (197779,'jackie_shan','http://twitch.tv/jackie_shan', 'jackie_shan', 'http://hitbox.tv/jackie-shan', 'jackie-shan', 'http://edge.sf.hitbox.tv/static/img/channel/cover_54ee5b6e89c96.jpg','https://www.youtube.com/playlist?list=PLrjcdfa13Z93dpE_JzQQZ6GGWLytuo16i');

INSERT INTO `stream`(`hfr_user_id`, `username`, `twitch_url`, `twitch_username`, `image_url`, `replay_youtube_url`) VALUES (227480,'P0L0','http://www.twitch.tv/polo9999', 'polo9999', 'http://i.imgur.com/SmVJZp7.png','https://www.youtube.com/playlist?list=PLrjcdfa13Z93dpE_JzQQZ6GGWLytuo16i');

INSERT INTO `stream`(`hfr_user_id`, `username`, `hitbox_url`, `hitbox_username`, `image_url`) VALUES (778245,'Rhadamenthos','http://www.hitbox.tv/Rhadamanthe', 'Rhadamanthe', 'http://i.imgur.com/SmVJZp7.png');