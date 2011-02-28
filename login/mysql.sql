#
# Table structure for table 'members'
#

CREATE TABLE `members` (
  `member_id` int(11) unsigned NOT NULL auto_increment,
  `firstname` varchar(100) default NULL,
  `lastname` varchar(100) default NULL,
  `login` varchar(100) NOT NULL default '',
  `passwd` varchar(32) NOT NULL default '',
  PRIMARY KEY  (`member_id`)
);



#
# Dumping data for table 'members'
#
