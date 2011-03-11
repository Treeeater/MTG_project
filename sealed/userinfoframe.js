function notImpl()
{
	alert("not yet implemented!");
}
var sock;
var cards;
var mainDeckCards = new Array();
var getLands = function(lands){
	var plains = {"id":"10001","innerid":"1","name":"plains","cmc":"0","color":"0","type":"1","rarity":"0","power":null,"toughness":null,"expansion":"RAV"}
	var island = {"id":"10002","innerid":"2","name":"island","cmc":"0","color":"0","type":"1","rarity":"0","power":null,"toughness":null,"expansion":"RAV"}
	var swamp = {"id":"10003","innerid":"3","name":"swamp","cmc":"0","color":"0","type":"1","rarity":"0","power":null,"toughness":null,"expansion":"RAV"}
	var mountain = {"id":"10004","innerid":"4","name":"mountain","cmc":"0","color":"0","type":"1","rarity":"0","power":null,"toughness":null,"expansion":"RAV"}
	var forest = {"id":"10005","innerid":"5","name":"forest","cmc":"0","color":"0","type":"1","rarity":"0","power":null,"toughness":null,"expansion":"RAV"}
	for (i = 0; i<5; i++)
	{
		for (j = 0; j < lands[i]; j++)
		{
			if (i==0) mainDeckCards.push(plains);
			if (i==1) mainDeckCards.push(island);
			if (i==2) mainDeckCards.push(swamp);
			if (i==3) mainDeckCards.push(mountain);
			if (i==4) mainDeckCards.push(forest);
		}
	}
}
var analyzeMessage = function(msg){
	//alert(msg.data);
	var message = msg.data;
	var index = message.indexOf(' ');
	message = message.substring(index+1);
	var typeOfMessage = message.substring(0,5);
	var messageBody = message.substring(5);
	if (typeOfMessage == "init:")
	{
		//opponent joined
		refresh();
	}
	if (typeOfMessage == "leav:")
	{
		//opponent left
		if (messageBody!=$('#usrname').text())
		{
			alert("Your opponent has disconnected. You can continue building your deck, however it is impossible for you to start any game afterwards,");
		}
	}
	if (typeOfMessage == "redy:")
	{
		//both player ready, move on.
		window.open("../combat/combat.php","_self");
	}
	if (typeOfMessage == "rcvd:")
	{
		//decklist accepted by server (or rejected)
	}
	if (typeOfMessage == "refs:")
	{
		//refresh info
		if (messageBody!="")
		{
			$('#opponame').text(messageBody);
		}
	}
	if (typeOfMessage == "getp:")
	{
		//got the packs, now parse them.
		if (messageBody!="")
		{
			cards = eval(messageBody);
		}
		else
		{
			alert('no cards received!');
		}
		top.document.getElementById('mainframe').contentWindow.document.getElementById('cardpoolframe').contentWindow.getCards();
	}
};
var refresh = function(){
	send("refs");
};
var getp = function(){
	$("#getpacks").attr('disabled','disabled');
	send("getp");
};
var setp = function(){
	send("setp");
};
var leave = function(){
	send("disconnect");
};
function init(){
        if("WebSocket" in window){
                sock = new WebSocket("ws://www.yuchenzhou.com:12346/");
                sock.onopen = function(msg){ notifyStatus("connected!",1); send('init');};
                sock.onmessage = analyzeMessage;
                sock.onclose = function(msg){ send("disconnect"); notifyStatus("Disconnected",2); };
				setTimeout("refresh();",1000);
        } else {
                alert("Your browser does not support WebSockets");
        }
}
function notifyStatus(msg,stat){
		var ele = document.getElementById("status");
		ele.innerHTML = msg;
		if (stat == 1) ele.style.color = '#808000';
		if (stat == 2) ele.style.color = '#FF0000';
}
function send(type){
		var messageToSend = "";
		if (type == "disconnect"){
			messageToSend = "leav:"+document.getElementById('usrname').innerHTML;
		}
		if (type == "init"){
			messageToSend = "init:"+document.getElementById('usrname').innerHTML;
		}
		if (type == "refs"){
			messageToSend = "refs:"+document.getElementById('usrname').innerHTML;
		}
		if (type == "getp"){
			messageToSend = "getp:"+$("#expansion option:selected").attr('value');
		}
		if (type == "setp"){
			messageToSend = "setp:"+document.getElementById('usrname').innerHTML;
		}
        sock.send(messageToSend);
}