#!/usr/bin/php
<?php

include "linklist.php";
include "websocket.class.php";
# action code: join     a player joins the lobby

class MTG extends WebSocket{
		private $players;
		private $wanderers;
		function __construct($address,$port){
			$this->players = new DoublyLinkedList() or die("Linklist constructor failed");
			$this->wanderers = new DoublyLinkedList() or die("Linklist constructor failed");
			parent::__construct($address,$port);
		}
        function process($user,$msg){
                $this->say("< ".$msg);
				if (strcmp("join:",substr($msg,0,5))==0)
				{
					//client sends a join request.
					$msg = substr($msg,5);
	                $msg = htmlspecialchars($msg);
					$this->players->insertLast($msg);
					foreach($this->users as $buf){
						#while ($CurrentNode!=NULL)
						#{
							#$this->send($buf->socket,$buf->id."&gt; "."join:".$CurrentNode->data);
							#$CurrentNode = $CurrentNode->next;
						#}
						$this->send($buf->socket,$buf->id."&gt; "."join:".$msg);
					}
					if ($this->players->totalNodes() == 2)
					{
						foreach($this->users as $buf2){
							$this->send($buf2->socket,$buf2->id."&gt; "."redy:");
						}
					}
				}
				elseif (strcmp("chat:",substr($msg,0,5))==0)
				{
					//client sends a chat message.
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."chat:".$msg);
					}
				}
				elseif (strcmp("leav:",substr($msg,0,5))==0)
				{
					//client exits the site.
					//need to add code to detect if the user really logged in.
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					$this->players->deleteNode($msg);
					$this->wanderers->deleteNode($msg);
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."leav:".$msg);
					}
				}
				elseif (strcmp("init:",substr($msg,0,5))==0)
				{
					//need to add code to detect if this user already logged in.
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					if (!$this->wanderers->existNode($msg)){
						$this->wanderers->insertLast($msg);	#if timeouted, repush.
					}
					$CurrentNode = $this->wanderers->firstNode();
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."init:".$msg);
					}
				}
				elseif (strcmp("refs:",substr($msg,0,5))==0)
				{
					//client refreshes its list of players and lobby wanderers
					$sendingstring = "";
					$sendingpstring = "";
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					if (!$this->wanderers->existNode($msg)){
						$this->wanderers->insertLast($msg);	#if timeouted, repush.
					}
					$CurrentNode = $this->wanderers->firstNode();
					$CurrentpNode = $this->players->firstNode();
					while ($CurrentNode!=NULL)
					{
						$sendingstring = $sendingstring."|".$CurrentNode->data;
						$CurrentNode = $CurrentNode->next;
					}
					while ($CurrentpNode!=NULL)
					{
						$sendingpstring = $sendingpstring."|".$CurrentpNode->data;
						$CurrentpNode = $CurrentpNode->next;
					}
					$this->send($user->socket,$user->id."&gt; "."refs:".$sendingstring);
					$this->send($user->socket,$user->id."&gt; "."refp:".$sendingpstring);
				}
				elseif (strcmp("lvgm:",substr($msg,0,5))==0)
				{
					//client sends a join request.
					$msg = substr($msg,5);
	                $msg = htmlspecialchars($msg);
					$this->players->deleteNode($msg);
					$CurrentNode = $this->players->firstNode();
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."lvgm:".$msg);
					}
				}
				/*
				elseif (strcmp("seal:",substr($msg,0,5))==0)
				{
					$msg = substr($msg,5);
	                $msg = htmlspecialchars($msg);
					$chars = preg_split('/;/', $msg, -1, PREG_SPLIT_OFFSET_CAPTURE);
					system('D:\xampp\php\php.exe D:\xampp\htdocs\mtg\server\sealedserver.php '.$chars[0][0].' '.$chars[1][0]);
					//to support draft we have to modify this.
				}
				*/
        }
};
 
$master = new MTG("192.168.1.200",12345);



?>