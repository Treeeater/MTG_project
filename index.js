var sock;
var players = [];
var analyzeMessage = function(msg){
	//alert(msg.data);
	var message = msg.data;
	var splited = message.split(' ');
	message = message.substring(splited[0].length+1);
	var typeOfMessage = message.substring(0,5);
	var messageBody = message.substring(5);
	if (typeOfMessage == "join:")
	{
		var i = 0;
		var flag = true;
		for (i = 0;i<players.length;i++){
			if (messageBody == players[i]) flag = false;
		}
		if (flag == true)
		{
			var sel = document.getElementById('playerlist');
			var newplayer = document.createElement('option');
			newplayer.innerHTML = messageBody;
			newplayer.setAttribute('value',messageBody);
			newplayer.setAttribute('id',messageBody);
			sel.appendChild(newplayer);
			players.push(messageBody);
		}
	}
	if (typeOfMessage == "chat:")
	{
		chat(messageBody);
	}
	if (typeOfMessage == "leav:")
	{
		var sel = document.getElementById('playerlist');
		var del = document.getElementById(messageBody);
		sel.removeChild(del);
		for (i = 0;i<players.length;i++){
			if (messageBody == players[i]) players[i] = "";
		}		
	}
	if (typeOfMessage == "redy:")
	{
		window.open("sealed.html","_self");
	}
};
function init(){
        if("WebSocket" in window){
                sock = new WebSocket("ws://192.168.1.102:12345/");
                sock.onopen = function(msg){ notifyStatus("connected! Ready state="+this.readyState); send('init'); document.getElementById("chatInput").disabled = false; };
                sock.onmessage = analyzeMessage;
                sock.onclose = function(msg){ send("disconnect"); notifyStatus("Disconnected"); };
        } else {
                alert("Your browser does not support WebSockets");
        }
}
function notifyStatus(msg){
		var ele = document.getElementById("status");
		ele.value = msg;
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
        sock.send(messageToSend);
}
function join(){
		send("join");
		document.getElementById('joinButton').setAttribute('disabled','disabled');
		document.getElementById('leaveButton').removeAttribute('disabled');
}
function leave(){
		send("disconnect");
		document.getElementById('leaveButton').setAttribute('disabled','disabled');
		document.getElementById('joinButton').removeAttribute('disabled');
}
function enterChat(e){
        if(e.keyCode == 13) send("chat");
}
var enterUserName = function(e){
		if(e.keyCode == 13) document.getElementById('usrname').setAttribute('disabled','disabled');
}