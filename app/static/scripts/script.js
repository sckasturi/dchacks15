var viewToggle = false;
var generateImageDiv = function(url){
	var oldParent = document.getElementById("content");
	var newChild1 = document.createElement("div");
	newChild1.classList.add("card");
	var newChild2 = document.createElement("div");
	newChild2.classList.add("image-card");
	newChild2.style.backgroundImage = "url('" + url + "')";
	var newChild3 = document.createElement("div");
	newChild3.classList.add("image-toggle");
	newChild1.appendChild(newChild2);
	newChild1.appendChild(newChild3);
	oldParent.appendChild(newChild1);
}

var generateImagePreview = function(url){
	var oldParent = document.getElementById("viewbar");
}

$(function() {
	generateImageDiv("../images/shanghai.jpg");
	generateImageDiv("../images/kindle.jpg");
	generateImageDiv("../images/shanghai.jpg");
	generateImageDiv("../images/kindle.jpg");
	generateImageDiv("../images/shanghai.jpg");
	generateImageDiv("../images/kindle.jpg");
	generateImageDiv("../images/shanghai.jpg");
	generateImageDiv("../images/kindle.jpg");
	generateImageDiv("../images/shanghai.jpg");
	generateImageDiv("../images/kindle.jpg");
	generateImageDiv("../images/shanghai.jpg");
	generateImageDiv("../images/kindle.jpg");
	
	$("#toggle-button").click(function(){
    	$("#sidebar-wrapper").animate({left:'+=200'}, 'fast');
	});
	$("#toggle-button").focusout(function(){
		$("#sidebar-wrapper").animate({left:'-=200'}, 'fast');
	});
});

window.onload = function(){
	$(".card").click(function(){
		if(viewToggle){
			viewToggle = false;
			$("#viewbar-wrapper").animate({right:'-=400'}, 'fast');		
		} else {
			viewToggle = true;
    		$("#viewbar-wrapper").animate({right:'+=400'}, 'fast');
    	}
	});
}