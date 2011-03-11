var cards;
var b = document.body;
var drawCards = function(){
	var numberOfCards = cards.length;
	for (i = 0; i < numberOfCards; i++)
	{
		imgsrc = "../cards/"+cards[i]['expansion']+"/"+cards[i]['id']+".jpg";
		var tempimg = document.createElement('img');
		tempimg.setAttribute('src',imgsrc);
		document.body.appendChild(tempimg);
	}
}
var getCards = function(){
cards = top.document.getElementById('sideframe').contentWindow.document.getElementById('userinfoframe').contentWindow.cards;
drawCards();
}