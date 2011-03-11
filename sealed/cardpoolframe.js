var cards;
var mainDeckCards;
var b = document.body;
var mainDeckFrame = top.document.getElementById('mainframe').contentWindow.document.getElementById('maindeckframe').contentWindow.document;
var deckInfoFrame = top.document.getElementById('sideframe').contentWindow.document.getElementById('deckinfoframe').contentWindow.document;
function addCard(){
	var imgsrc = this.getAttribute('src');
	var id = parseInt(this.getAttribute('id'));
	var toMainDeck = mainDeckFrame.createElement('img');
	toMainDeck.setAttribute('src',imgsrc);
	toMainDeck.setAttribute('class','boardcards');
	toMainDeck.setAttribute('id',id);
	toMainDeck.ondblclick = removeCard;
	toMainDeck.onclick = display;
	mainDeckFrame.body.appendChild(toMainDeck);
	//update deckinfoframe:
	//update color information:
	var color = cards[id]['color'];
	if (color & 16) {
		temp = deckInfoFrame.getElementById('Wcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)+1;
	}
	if (color & 8) {
		temp = deckInfoFrame.getElementById('Ucount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)+1;
	}
	if (color & 4) {
		temp = deckInfoFrame.getElementById('Bcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)+1;
	}
	if (color & 2) {
		temp = deckInfoFrame.getElementById('Rcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)+1;
	}
	if (color & 1) {
		temp = deckInfoFrame.getElementById('Gcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)+1;
	}
	//update CMC information:
	var cmc = cards[id]['cmc'];
	if (cmc<=5)
	{
		deckInfoFrame.getElementById(cmc+'count').innerHTML = parseInt(deckInfoFrame.getElementById(cmc+'count').innerHTML)+1;
	}
	else deckInfoFrame.getElementById('5pcount').innerHTML = parseInt(deckInfoFrame.getElementById('5pcount').innerHTML)+1;
	//update # of cards information:
	if (cards[id]['type'] & 1)
	{
		//this is a land card
		deckInfoFrame.getElementById('totalLands').innerHTML = parseInt(deckInfoFrame.getElementById('totalLands').innerHTML)+1;
	}
	deckInfoFrame.getElementById('totalCards').innerHTML = parseInt(deckInfoFrame.getElementById('totalCards').innerHTML)+1;
	//delete this card from card pool
	this.parentNode.removeChild(this);
}
function removeCard(){
	var imgsrc = this.getAttribute('src');
	var id = parseInt(this.getAttribute('id'));
	var toCardPool = document.createElement('img');
	toCardPool.setAttribute('src',imgsrc);
	toCardPool.setAttribute('class','boardcards');
	toCardPool.setAttribute('id',id);
	toCardPool.ondblclick = addCard;
	toCardPool.onclick = display;
	document.body.appendChild(toCardPool);
	//update deckinfoframe:
	//update color information:
	var color = cards[id]['color'];
	if (color & 16) {
		temp = deckInfoFrame.getElementById('Wcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)-1;
	}
	if (color & 8) {
		temp = deckInfoFrame.getElementById('Ucount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)-1;
	}
	if (color & 4) {
		temp = deckInfoFrame.getElementById('Bcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)-1;
	}
	if (color & 2) {
		temp = deckInfoFrame.getElementById('Rcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)-1;
	}
	if (color & 1) {
		temp = deckInfoFrame.getElementById('Gcount').innerHTML = parseInt(deckInfoFrame.getElementById('Wcount').innerHTML)-1;
	}
	//update CMC information:
	var cmc = cards[id]['cmc'];
	if (cmc<=5)
	{
		deckInfoFrame.getElementById(cmc+'count').innerHTML = parseInt(deckInfoFrame.getElementById(cmc+'count').innerHTML)-1;
	}
	else deckInfoFrame.getElementById('5pcount').innerHTML = parseInt(deckInfoFrame.getElementById('5pcount').innerHTML)-1;
	//update # of cards information:
	if (cards[id]['type'] & 1)
	{
		//this is a land card
		deckInfoFrame.getElementById('totalLands').innerHTML = parseInt(deckInfoFrame.getElementById('totalLands').innerHTML)-1;
	}
	deckInfoFrame.getElementById('totalCards').innerHTML = parseInt(deckInfoFrame.getElementById('totalCards').innerHTML)-1;
	//delete this card from main deck
	this.parentNode.removeChild(this);
}
var rePaintCards = function(){
	var numberOfCards = cards.length;
	for (i = 0; i < numberOfCards; i++)
	{
		imgsrc = "../cards/"+cards[i]['expansion']+"/"+cards[i]['id']+".jpg";
		var tempimg = document.createElement('img');
		tempimg.setAttribute('src',imgsrc);
		tempimg.setAttribute('class','boardcards');
		tempimg.setAttribute('id',i);
		tempimg.ondblclick = addCard;
		tempimg.onclick = display;
		document.body.appendChild(tempimg);
	}
};
var getCards = function(){
cards = top.document.getElementById('sideframe').contentWindow.document.getElementById('userinfoframe').contentWindow.cards;
rePaintCards();
};