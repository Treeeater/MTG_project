<?php
	require_once('login/auth_admin.php');
?>
<?php
system('taskkill /IM php.exe /F');
system('D:\xampp\php\php.exe D:\xampp\htdocs\mtg\server.php');
header("location: lobby.php");
exit();
?>
<html>
<body>
server_reseted
</body>
</html>