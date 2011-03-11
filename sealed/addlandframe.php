<html>
<head>
<link rel="stylesheet" type="text/css" href="util.css" />
<script src="../lib/jQuery.js"></script>
<script>
function submit(){
var lands = new Array();
lands[0] = parseInt($("#W").attr('value'));
lands[1] = parseInt($("#U").attr('value'));
lands[2] = parseInt($("#B").attr('value'));
lands[3] = parseInt($("#R").attr('value'));
lands[4] = parseInt($("#G").attr('value'));
top.document.getElementById('sideframe').contentDocument.getElementById('userinfoframe').contentWindow.getLands(lands);
}
</script>
</head>
<body>
Add Land here:
<table class="infotable">
<tr>
<td><img src="resources/mana/W.png" class = "manasymbols"></img></td>
<td><img src="resources/mana/U.png" class = "manasymbols"></img></td>
<td><img src="resources/mana/B.png" class = "manasymbols"></img></td>
<td><img src="resources/mana/R.png" class = "manasymbols"></img></td>
<td><img src="resources/mana/G.png" class = "manasymbols"></img></td>
</tr>
<tr>
<td><input id = "W" size = "1" value = "0" style = "text-align:center;"></input></td>
<td><input id = "U" size = "1" value = "0" style = "text-align:center;"></input></td>
<td><input id = "B" size = "1" value = "0" style = "text-align:center;"></input></td>
<td><input id = "R" size = "1" value = "0" style = "text-align:center;"></input></td>
<td><input id = "G" size = "1" value = "0" style = "text-align:center;"></input></td>
</tr>
</table>
<button onclick="submit()">save</button>
</body>
</html>
