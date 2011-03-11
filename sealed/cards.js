function display(){
var win = window.top.document;
var sf = win.getElementById('sideframe').contentDocument;
var cd = sf.getElementById('carddetail').contentDocument;
cd.getElementById('bigCard').src = this.getAttribute('src');
}

$(document).ready(function() {

	$("\\img").bind("contextmenu", function(e) {

		$('#menu').css({
			top: e.pageY+'px',
			left: e.pageX+'px'
		}).show();

		return false;

	});
    $('#menu').click(function() {
        $('#menu').hide();
    });
    $(document).click(function() {
        $('#menu').hide();
    });

});