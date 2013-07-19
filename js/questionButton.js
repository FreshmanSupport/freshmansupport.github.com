$(document).ready(function () {
       
	   $('input').click(function() {
		  	
		   $('input:checked').parent().removeClass("initialColor");
		  
       }); 
	 $('.roommate input').click(function(){
	 	 var index = $(this).index();
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
				$('.roommate input').parent().children().removeClass("fuzzy");
			}
	 })
})

/*#roomieSlider .initialColor label:nth-child(3){
	background-color:rgb(182,197,220);
}
#roomieSlider .initialColor label:nth-child(5){
	background-color:rgb(145,165,195);
}
#roomieSlider .initialColor label:nth-child(7){
	background-color:rgb(89,107,158);
}
#roomieSlider .initialColor label:nth-child(9){
	background-color:rgb(68,86,127);
}
#roomieSlider .initialColor label:nth-child(11){
	background-color:rgb(51,61,105);*/


/*
display("You clicked the label at index " + index);
			display("Before index is " + before);
			display("After index is " + after);
			 
			function display(msg) {
			$("<p>").html(msg).appendTo(document.body);}
*/