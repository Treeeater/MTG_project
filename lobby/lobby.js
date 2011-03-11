var sock;
var analyzeMessage = function(msg){
	//alert(msg.data);
	var message = msg.data;
	var index = message.indexOf(' ');
	message = message.substring(index+1);
	var typeOfMessage = message.substring(0,5);
	var messageBody = message.substring(5);
	if (typeOfMessage == "join:")
	{
		var sel = document.getElementById('playerlist');
		var newplayer = document.createElement('option');
		newplayer.innerHTML = messageBody;
		newplayer.setAttribute('value',messageBody);
		newplayer.setAttribute('id',messageBody);
		sel.appendChild(newplayer);
	}
	if (typeOfMessage == "chat:")
	{
		chat(messageBody);
	}
	if (typeOfMessage == "leav:")
	{
		var sel = document.getElementById('playerlist');
		var sel2 = document.getElementById('lobbylist');
		var del = document.getElementById(messageBody);
		if (del) sel.removeChild(del);
		var del2 = document.getElementById("wanderer_"+messageBody);
		if (del2) sel2.removeChild(del2);
	}
	if (typeOfMessage == "lvgm:")
	{
		var sel = document.getElementById('playerlist');
		var del = document.getElementById(messageBody);
		sel.removeChild(del);
	}
	if (typeOfMessage == "redy:")
	{
	/*
		if ($("#playerlist option:first").text() == $("#usrname").attr('value'))
		{
			//only first player on the list send the starting request
			send("sealed");
		}*/
		window.open("../sealed/sealed.php","_self");
	}
	if (typeOfMessage == "refp:")
	{
		var bodySplited = messageBody.split('|');
		var sel = document.getElementById('playerlist');
		sel.length = 0;
		for (i = 0; i<bodySplited.length; i++)
		{
			if (bodySplited[i]!="")
			{
				var newplayer = document.createElement('option');
				newplayer.innerHTML = bodySplited[i];
				newplayer.setAttribute('value',bodySplited[i]);
				newplayer.setAttribute('id',"player_"+bodySplited[i]);
				sel.appendChild(newplayer);		
			}
		}
	}
	if (typeOfMessage == "refs:")
	{
		var bodySplited = messageBody.split('|');
		var sel = document.getElementById('lobbylist');
		sel.length = 0;
		for (i = 0; i<bodySplited.length; i++)
		{
			if (bodySplited[i]!="")
			{
				var newwanderer = document.createElement('option');
				newwanderer.innerHTML = bodySplited[i];
				newwanderer.setAttribute('value',bodySplited[i]);
				newwanderer.setAttribute('id',"wanderer_"+bodySplited[i]);
				sel.appendChild(newwanderer);		
			}
		}
	}
};
function refresh(){
	send("refs");
}
function init(){
        if("WebSocket" in window){
                sock = new WebSocket("ws://www.yuchenzhou.com:12345/");
                sock.onopen = function(msg){ notifyStatus("connected! Ready state="+this.readyState,1); send('init'); document.getElementById("chatInput").disabled = false; };
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
function chat(msg){
        var ele = document.getElementById("chatBox");
        ele.innerHTML += msg + "<br />";
        ele.scrollTop = ele.scrollHeight;
}
function send(type){
		var messageToSend = "";
		if (type == "join"){
			messageToSend = "join:"+document.getElementById('usrname').value;
		}
		if (type == "chat"){
			messageToSend = "chat:"+document.getElementById('usrname').value+":"+document.getElementById("chatInput").value;
			document.getElementById("chatInput").value = "";
		}
		if (type == "disconnect"){
			messageToSend = "leav:"+document.getElementById('usrname').value;
		}
		if (type == "init"){
			messageToSend = "init:"+document.getElementById('usrname').value;
		}
		if (type == "refs"){
			messageToSend = "refs:"+document.getElementById('usrname').value;
		}
		if (type == "lvgm"){
			messageToSend = "lvgm:"+document.getElementById('usrname').value;
		}
		if (type == "sealed"){
			var i;
			for ( i = 0; i<$("#playerlist option").size(); i++)
			{
				messageToSend = messageToSend + $("#playerlist option:eq("+i+")").text() + ";";
			}
			messageToSend = "seal:" + messageToSend;
		}
        sock.send(messageToSend);
}
function join(){
		send("join");
		document.getElementById('joinButton').setAttribute('disabled','disabled');
		document.getElementById('leaveButton').removeAttribute('disabled');
}
function leaveGame(){
		send("lvgm");			//just leave the game table, but not the lobby.
		document.getElementById('leaveButton').setAttribute('disabled','disabled');
		document.getElementById('joinButton').removeAttribute('disabled');
}
function leave(){
		send("disconnect");
}
function enterChat(e){
        if(e.keyCode == 13) send("chat");
}
var enterUserName = function(e){
		if(e.keyCode == 13) document.getElementById('usrname').setAttribute('disabled','disabled');
}