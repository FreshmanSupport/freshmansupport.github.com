$(document).ready(function () {
	   //Initliaze all the sm and md to be hidden
	   $('.sendMessages').hide();
	   $('.matchDetails').hide();
	   
	   $('.mdLink').click(function() {
		   var id = event.target.id;
		   id = id.replace('Click', '');
           $('#'+id).toggle();
           return false;
       });
	   $('.smLink').click(function(){
		 	var id = event.target.id;
		   id = id.replace('Click', '');
           $('#'+id).toggle();
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