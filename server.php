#!/usr/bin/php

<?php

include "websocket.class.php";
# action code: join     a player joins the lobby

class MTG extends WebSocket{
		var $players = array();
		var $ready = 0;		#ready means number of ready players
        function process($user,$msg){
                $this->say("< ".$msg);
				if (strcmp("join:",substr($msg,0,5))==0)
				{
					//client sends a join request.
					$msg = substr($msg,5);
	                $msg = htmlspecialchars($msg);
					array_push($this->players,$msg);
					$this->ready++;
					foreach($this->users as $buf){
						foreach($this->players as $player){
							if (strcmp($player,"")!=0){
								$this->send($buf->socket,$buf->id."&gt; "."join:".$player);
							}
						}
					}
					if ($this->ready == 2)
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
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					//FIXME:this remove function is clunky. Will cause memory leak.
					$index = array_search($msg,$this->players);
					$this->players[$index]="";
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."leav:".$msg);
					}
					$this->ready--;
				}
				elseif (strcmp("init:",substr($msg,0,5))==0)
				{
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."init:".$msg);
					}
				}
        }
};
 
$master = new MTG("192.168.1.102",12345);



?>