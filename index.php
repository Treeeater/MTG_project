<?php
	require_once('login/auth_redirect.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312" />
<title>Welcome to Yuchen Zhou's Magic world</title>
<link href="loginmodule.css" rel="stylesheet" type="text/css" />
</head>
<body>
<h1 align = "center">
Magic the Gathering Draft/Sealed Web platform
</h1>
<div align = "center">
please enter username and password to login.
</div>
<p>&nbsp;</p>
<form id="loginForm" name="loginForm" method="post" action="login/login-exec.php">
  <table width="300" border="0" align="center" cellpadding="2" cellspacing="0">
    <tr>
      <td width="112"><b>Login</b></td>
      <td width="188"><input name="login" type="text" class="textfield" id="login" /></td>
    </tr>
    <tr>
      <td><b>Password</b></td>
      <td><input name="password" type="password" class="textfield" id="password" /></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="Login" /></td>
    </tr>
  </table>
</form>
<div align = "center">
Sorry, the site is not open for registering now.
If you are a member of 黑店厨房, please use your QQ group id as username and pwd to login.
如果你看到这个，服务器架设正确。
</div>
</body>
</html>
