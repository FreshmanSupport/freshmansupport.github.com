$(document).ready(function () {
       $('.mdLink').click(function() {
		   
           $('.matchDetails').toggle();
           return false;
       });
	   
	var you = $('#you');
	var roommate = $('#roommate');
	var importance =$('#importance');
	//Initial Set up
	$(roommate).hide();
	$(importance).hide();
	
	$('.editNav span').click(function(e) {
      var name = event.target.id;
	  name = name.replace('Click', '');
	  hideRemove();
	  $('#'+event.target.id).addClass('select');
	  $('#'+name).toggle();
	  //$(par).slideToggle('slow');
      e.preventDefault();
  });
  function hideRemove()
  {
	$('.editNav span').removeClass('select');
	$(you).hide();  
  	$(roommate).hide();
	$(importance).hide();
  }        
})