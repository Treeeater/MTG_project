function notImpl()
{
	alert("not yet implemented!");
}
var sock;
var cards;
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
			alert(cards[1]['name']);
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