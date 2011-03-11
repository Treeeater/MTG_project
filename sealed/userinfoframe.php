<?php
	require_once('../login/auth.php');
?>
<html>
<head>
<script src = "../lib/jQuery.js"></script>
<script src = "userinfoframe.js"></script>
</head>
<body onload = "init()" onbeforeunload="leave()">
<div>Your name: <span id = "usrname"><?php echo $_SESSION['SESS_FIRST_NAME'];?></span></div>
<div>Opponent name: <span id = "opponame">Opponent is connecting....</span></div>
<div>Timer: <span id = "time">20</span> minutes</div>
<div>Connection: <span id = "status">connecting...</span></div>
<select id = "expansion">
<option value = "RAV">RAV</option>
</select>
<button id = "getpacks" onclick = "getp()">getpacks</button>
<button id = "done" onclick = "setp()">done</button>
<button id = "exit" onclick = "leave()">exit</button>
<button id = "refresh" onclick = "refresh()">refresh</button>
</body>
</html>
