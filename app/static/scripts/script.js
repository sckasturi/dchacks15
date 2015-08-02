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

var generateImageView = function(url){
	var oldParent = document.getElementById("viewbar");
	var newChild1 = document.createElement("img");
	newChild1.setAttribute("src", url);
	newChild1.classList.add("preview");
	var newChild2 = document.createElement("div");
	newChild2.innerHTML = "Photo: A Photo";
	var newChild3 = document.createElement("div");
	newChild3.innerHTML = "Date: 1/1/70";
	oldParent.appendChild(newChild1);
	oldParent.appendChild(newChild2);
	oldParent.appendChild(newChild3);
}

var removeImageView = function(){
	var oldParent = document.getElementById("viewbar");
	oldParent.innerHTML = "";
}

$(function() {
	generateImageDiv("/static/images/shanghai.jpg");
	generateImageDiv("/static/images/kindle.jpg");
	generateImageDiv("/static/images/shanghai.jpg");
	generateImageDiv("/static/images/kindle.jpg");
	generateImageDiv("/static/images/shanghai.jpg");
	generateImageDiv("/static/images/kindle.jpg");
	generateImageDiv("/static/images/shanghai.jpg");
	generateImageDiv("/static/images/kindle.jpg");
	generateImageDiv("/static/images/shanghai.jpg");
	generateImageDiv("/static/images/kindle.jpg");
	generateImageDiv("/static/images/shanghai.jpg");
	generateImageDiv("/static/images/kindle.jpg");
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
			generateImageView("/static/images/kindle.jpg");
			viewToggle = false;
			$("#viewbar-wrapper").animate({right:'-=400'}, 'fast');		
		} else {
			removeImageView();
			viewToggle = true;
    		$("#viewbar-wrapper").animate({right:'+=400'}, 'fast');
    	}
	});
}