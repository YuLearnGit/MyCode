var local_url = window.location.href;
$(document).ready(function(){	
	$("button#activate_daq").click(function(){
		activate_daq();
	});
	
	function activate_daq(){
		$("span#hint1").text("正在启动...");
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
					$("span#hint1").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint1").text(data.error);
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
				var error = "请求错误，错误码：" + e.status;
				alert(error);
				$("span#hint1").text(error);
			}
		});
	}
	
	$("button#deactivate_daq").click(function(){
		deactivate_daq();
	});
	
	function deactivate_daq(){
		$("span#hint1").text("正在停止...");
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
					$("span#hint1").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint1").text(data.error);
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
				$("span#hint1").text(error);
			}
		});
	}
	
	$("button#daq_status").click(function(){
		daq_status();
	});
	
	function daq_status(){
		$("span#hint1").text("正在查询...");
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
					$("span#hint1").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint1").text(data.error);
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
				$("span#hint1").text(error);
			}
		});
	}
	
	
	$("#submit_remote").click(function(){
		submit_remote();
	});
	
	function submit_remote(){
		var remote_ip = $("#remote_ip").val();
		var remote_port = $("#remote_port").val();
		var remote_database_name = $("#remote_database_name").val();
		var remote_username = $("#remote_username").val();
		var remote_password = $("#remote_password").val();
		if (remote_ip == "")
		{
			alert("远程IP不能为空");
			$("span#hint2").text("远程IP不能为空");
			return;
		}
		if (remote_port == ""){
			alert("远程端口不能为空");
			$("span#hint2").text("远程端口不能为空");
			return;
		}
		if (remote_database_name == ""){
			alert("数据库名不能为空");
			$("span#hint2").text("数据库名不能为空");
			return;
		}
		if (remote_username == ""){
			alert("用户名不能为空");
			$("span#hint2").text("用户名不能为空");
			return;
		}
		if (remote_password == ""){
			alert("用户密码不能为空");
			$("span#hint2").text("用户密码不能为空");
			return;
		}
		$("span#hint2").text("正在提交...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"s",
				"remote_ip":remote_ip,
				"remote_port":remote_port,
				"remote_database_name":remote_database_name,
				"remote_username":remote_username,
				"remote_password":remote_password
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint2").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint2").text(data.error);
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
				$("span#hint2").text(error);
			}
		});
	}
	
	$("#activate_remote").click(function(){
		activate_remote();
	});
	
	function activate_remote(){
		$("span#hint3").text("正在启动...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"o" //避免重复字母
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint3").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint3").text(data.error);
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
				$("span#hint3").text(error);
			}
		});
	}
	
	$("#deactivate_remote").click(function(){
		deactivate_remote();
	});
	
	function deactivate_remote(){
		$("span#hint3").text("正在停止...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"p" //避免重复字母
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint3").text(data.success);
					console.log(data);
				}
				else if (data.error)
				{
					$("span#hint3").text(data.error);
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
				$("span#hint3").text(error);
			}
		});
	}
	
	$("#upload_status").click(function(){
		upload_status();
	});
	
	function upload_status(){
		$("span#hint3").text("正在查询...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"q" //避免重复字母
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint3").text(data.success);
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
				$("span#hint3").text(error);
			}
		});
	}
	
	function require_remote(){
		$("span#hint2").text("正在获取配置...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"r" //避免重复字母
			},
			success:function(data){
				if (data.success)
				{
					//alert(data.success);
					$("span#hint2").text(data.success);
					$("#remote_ip").val(data.remote_ip);
					$("#remote_port").val(data.remote_port);
					$("#remote_database_name").val(data.remote_database_name);
					$("#remote_username").val(data.remote_username);
					$("#remote_password").val(data.remote_password);
				}
				else if (data.error)
				{
					$("span#hint2").text(data.error);
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
				$("span#hint2").text(error);
			}
		});
	}
	
	require_remote()
	
	daq_status();
	
	upload_status();
	
});