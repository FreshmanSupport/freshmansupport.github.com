$(document).ready(function () {
       
	   $('input').click(function() {
		  	
		   $('input:checked').parent().removeClass("initialColor");
		  
       }); 
	 $('.roommate input').click(function(){
	 	 var index = $(this).index();
		 var id = event.target.id;
			clear();
			var before = index;
			var after = index + 4;
			if (before > 2)
			{
				$(this).parent(".roommate").children("label:nth-child("+ before +")").addClass("fuzzy");
			}
			if(after < 12)
			{
				$(this).parent(".roommate").children("label:nth-child("+ after +")").addClass("fuzzy");
			}
			
			function clear(){
				 
				$('#'+id).parent().children().removeClass("fuzzy");
			}
	 })
})