var viewToggle = false;

$(function() {
	$("#toggle-button").click(function(){
    	$("#sidebar-wrapper").animate({left:'+=200'}, 'fast');
	});
	$("#toggle-button").focusout(function(){
		$("#sidebar-wrapper").animate({left:'-=200'}, 'fast');
	});
	$(".card").click(function(){
		if(viewToggle){
			viewToggle = false;
			$("#viewbar-wrapper").animate({right:'-=400'}, 'fast');
		} else {
			viewToggle = true;
    		$("#viewbar-wrapper").animate({right:'+=400'}, 'fast');
    	}
	});
});



/*var function = generateImageDiv(url){
	var old = document.getElementById("content");
	var new = document.createElement("div");
}
*/
/*old = document.getElementById("content").innerHTML;
		for(var i = 0; i < 5; i++){
		var x = "<div style="width:200px">'
		}*/