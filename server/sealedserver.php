#!/usr/bin/php
<?php
require_once('sealedconfig.php');
include "linklist.php";
include "websocket.class.php";
# action code: join     a player joins the lobby

class MTG extends WebSocket{
		private $players;
		private $totalNumberOfCards;
		function __construct($address,$port){
			$this->players = new DoublyLinkedList() or die("Linklist constructor failed");
			$this->totalNumberOfCards = 2;
			parent::__construct($address,$port);
		}
		function prepareCards($exp){
			$returnObject = array();
			$currentNumberOfCards = 0;
			$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
			if(!$link) {
				die('Failed to connect to mysql server: ' . mysql_error());
			}
			$db = mysql_select_db(DB_DATABASE);
			if(!$db) {
				die("Unable to select database");
			}
			while ($currentNumberOfCards < $this->totalNumberOfCards)
			{
				//query how many cards are in this expansion
				$qrycount = "SELECT COUNT(*) FROM cards WHERE expansion = '".$exp."'";
				$countresult = mysql_query($qrycount);
				if (!$countresult){
					die("Cannot get a count of selected expansion");
					return;
				}
				$temp = mysql_fetch_row($countresult);
				$count = $temp[0];
				if ($count == 0){
					die("This expansion has no cards in it!");
					return;
				}
				$seed = rand() % $count + 1;
				//now we have a random number that's within the range of this expansion
				$qry="SELECT * FROM cards WHERE innerid='".$seed."' AND expansion='".$exp."'";
				$result=mysql_query($qry);
				if (!$result){
					die("Cannot get a card of selected expansion");
					return;
				}
				$resultarray = mysql_fetch_assoc($result);
				//the card info is stored in this associated array
				array_push($returnObject,$resultarray);
				$currentNumberOfCards++;
			}
			return $returnObject;
		}
        function process($user,$msg){
                $this->say("< ".$msg);
				if (strcmp("getp:",substr($msg,0,5))==0)
				{
					//client sends a join request.
					$sendingstring = "";
					$cards = array();
					$msg = substr($msg,5);
	                $msg = htmlspecialchars($msg);
					$cards = $this->prepareCards($msg);
					$this->send($user->socket,$user->id."&gt; "."getp:".json_encode($cards));
				}
				elseif (strcmp("setp:",substr($msg,0,5))==0)
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
					if (!$this->players->existNode($msg))
					{
						$this->players->insertLast($msg);
					}
					$CurrentNode = $this->players->firstNode();
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."init:".$msg);		//dummy message, doesn't get through actually.
					}
				}
				elseif (strcmp("refs:",substr($msg,0,5))==0)
				{
					$sendingstring = "";
					$msg = substr($msg,5);
					$msg = htmlspecialchars($msg);
					$CurrentNode = $this->players->firstNode();
					while ($CurrentNode!=NULL)
					{
						if ($msg != $CurrentNode->data) 
						{
							$sendingstring = $CurrentNode->data;
							break;
						}
						$CurrentNode = $CurrentNode->next;
					}
					$this->send($user->socket,$user->id."&gt; "."refs:".$sendingstring);
				}
				elseif (strcmp("leav:",substr($msg,0,5))==0)
				{
					//client sends a join request.
					$msg = substr($msg,5);
	                $msg = htmlspecialchars($msg);
					$this->players->deleteNode($msg);
					$CurrentNode = $this->players->firstNode();
					foreach($this->users as $buf){
						$this->send($buf->socket,$buf->id."&gt; "."leav:".$msg);
					}
					exit();
				}
        }
};

$master = new MTG("192.168.1.200",12346);		//to support multiple games i have to use random unused port.



?>