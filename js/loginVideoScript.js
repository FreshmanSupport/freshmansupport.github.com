$(document).ready(function(e) {
    $('.xClose').click(function(){
		$('#overlay').hide();
		$('#overlayBackground').hide();
	});
	$('#return').click(function(){
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
		  $('.videoOverlay').hide();
	});
	
	 $('.videoOverlay .xClose').click(function(){
		$('.videoOverlay').hide();
		$('#overlayBackground').hide();
	});
	
	//Use onclick to trigger video
	//Not sure how to trigger multiple video on pages
	
	$('.clickableVideo').click(function(){	
		$('.videoOverlay').show();
		$('#overlayBackground').show();
	});

	//Switch to ThankYou Screen when clicking on Register
	$('#registerButton').click(function(){
		$('#loginRegisterContainer').hide();
		$('#registerThankYou').show();
	});
	
	
});
