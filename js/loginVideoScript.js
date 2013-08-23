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

$(document).delegate('#textbox', 'keydown', function(e) { 
  var keyCode = e.keyCode || e.which; 

  if (keyCode == 9) { 
    e.preventDefault(); 
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart = 
    $(this).get(0).selectionEnd = start + 1;
  } 
});

function showVideo(){
		$('.videoOverlay').show();
		$('#overlayBackground').show();
}
