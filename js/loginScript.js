$(document).ready(function(e) {
    $('#xClose').click(function(){
		$('#overlay').hide();
		$('#overlayBackground').hide();
	});
	
	$('#loginBarContainer a').click(function(){
		  $('#overlay').show();
		  $('#overlayBackground').show();
	});
	
	$('#overlayBackground').click(function(){
		  $('#overlay').hide();
		  $('#overlayBackground').hide();
	});
});
