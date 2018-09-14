var local_url =window.location.href;
$(document).ready(function(){
	
	$("button#manageSnortRuleCategories").click(function(){
		window.location.href = "/manageSnortRuleCategories"
	});
	
	$("button#addSnortRules").click(function(){
		window.location.href = "/addSnortRules"
	});
	
	$("button#manageSnortRules").click(function(){
		window.location.href = "/manageSnortRules"
	});
	
	$("button#manageSnortActivate").click(function(){
		window.location.href = "/manageSnortActivate"
	})
})