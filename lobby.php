<?php
	require_once('login/auth.php');
?>
<html>
<head>
<link rel="stylesheet" type="text/css" href="lobby.css" />
<script src="lobby.js"></script>
</head>
<title>
Magic The Gathering test app
</title>
<body onload="init()" onunload="leave()">
<div id = "wrapper" align = "center" class="wrapper">
<div>UserName:<input type="text" id="usrname" value = "<?php echo $_SESSION['SESS_FIRST_NAME'];?>" onkeydown="enterUserName(event);"/></div>
status bar:<input type="text" id="status" value="Connecting" disabled="disabled" />
<div id = "listWrapper">
<div id = "playerlistWrapper">
<form id = "players">
<select id = "playerlist" size="8">
</select>
</form>
<button id = "joinButton" onclick="join()">Join</button>
<button id = "leaveButton" onclick="leave()" disabled="disabled">Leave</button>
<div>List of players</div>
</div>
<div id = "lobbylistWrapper">
<form id = "lobby">
<select id = "lobbylist" size="8">
</select>
</form>
<button id = "refreshButton" onclick="refresh()">Refresh</button>
<div>List of wanderers</div>
</div>
</div>
<div class = "chatBoxClass" id = "chatBox"></div>
<div>Type what you want to say here:<input type="text" id="chatInput" value="Hi" onkeydown="enterChat(event);" disabled="disabled" /></div>
</div>
</body>
</html>
