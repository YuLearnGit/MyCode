 var local_url = window.location.href;
$(document).ready(function(){	
	$("button#activate_snort").click(function(){
		activate_snort();
	});
	
	function activate_snort(){
		$("span#hint").text("正在启动...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"a"
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint").text(data.error);
				}
				else if (data.href)
				{
					window.location.href = data.href;
				}
				else if (data.page)
				{
					window.location.href = data.page;
				}
				else if (data.login)
				{
					window.location.href = data.login;
				}
				else 
				{
					alert(data);
					console.log(data);
				}
			},
		error:function(e){
				console.log(e);
				var error = "请求错误，错误码：" + e.status
				alert(error);
				$("span#hint").text(error);
			}
		});
	}
	
	$("button#deactivate_snort").click(function(){
		deactivate_snort();
	});
	
	function deactivate_snort(){
		$("span#hint").text("正在停止...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"d"
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint").text(data.error);
				}
				else if (data.href)
				{
					window.location.href = data.href;
				}
				else if (data.page)
				{
					window.location.href = data.page;
				}
				else if (data.login)
				{
					window.location.href = data.login;
				}
				else 
				{
					alert(data);
					console.log(data);
				}
			},
		error:function(e){
			console.log(e);
				var error = "请求错误，错误码：" + e.status
				alert(error);
				$("span#hint").text(error);
			}
		});
	}
	
	$("button#snort_status").click(function(){
		snort_status();
	});
	
	function snort_status(){
		$("span#hint").text("正在查询...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"m" //谨防重复
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint").text(data.error);
				}
				else if (data.href)
				{
					window.location.href = data.href;
				}
				else if (data.page)
				{
					window.location.href = data.page;
				}
				else if (data.login)
				{
					window.location.href = data.login;
				}
				else 
				{
					alert(data);
					console.log(data);
				}
			},
			error:function(e){
				console.log(e);
				var error = "请求错误，错误码：" + e.status
				alert(error);
				$("span#hint").text(error);
			}
		});
	}
	
	snort_status();
})