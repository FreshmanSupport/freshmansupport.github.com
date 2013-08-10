$( document ).ready(function() {
    //Set Initial Slide to 2 (index of js starts at 0)
	budgetSlider.slide(1, 100);
	
	  $('.stateWrap input').click(function(){
		   $('input:checked').parent().parent().removeClass("initialColor");
		  
       });
	   
//Function to loop colors
	$('.loopingColorContainer  .circle').click(function(){
		if( $(this).hasClass('initial') ) {
			$(this).removeClass('initial').addClass('rarely');
		}
		else if( $(this).hasClass('rarely') ) {
			$(this).removeClass('rarely').addClass('sometime');
		}
		else if( $(this).hasClass('sometime') ) {
			$(this).removeClass('sometime').addClass('frequently');
		}
		else{
			$(this).removeClass('frequently').addClass('initial');
		}
	});
	
	//Slide to 'x' slide
	$('.left').click(function(){
		var id= event.target.id;
		id = id.replace('slideTo', '');
		budgetSlider.slide(id, 100);
		var x= parseInt(budgetSlider.getPos()) + 1;
		document.getElementById('currentNumber').innerHTML= x;

	})
	

});


	 