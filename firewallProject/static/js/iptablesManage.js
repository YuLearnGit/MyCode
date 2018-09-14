var local_url =window.location.href;
$(document).ready(function(){
	
	$("button#manageIptablesRuleCategories").click(function(){
		window.location.href = "/manageIptablesRuleCategories"
	});
	
	$("button#addIptablesRules").click(function(){
		window.location.href = "/addIptablesRules"
	});
	
	$("button#manageIptablesRules").click(function(){
		window.location.href = "/manageIptablesRules"
	});
})