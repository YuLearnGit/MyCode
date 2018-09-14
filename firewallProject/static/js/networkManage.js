$(document).ready(function(){
	
	function checkIp(ip) 
	{ 
		obj=ip;
		var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
		var reg = obj.match(exp); 
		if(reg==null) 
		{ 
			return false;//不合法
		} 
		else 
		{ 
			return true; //合法
		} 
	}
	
	function checkNetmask(mask) 
	{ 
		obj=mask; 
		var exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/; 
		var reg = obj.match(exp); 
		if(reg==null) 
		{ 
			 return false; //"非法"
		} 
		 else 
		{ 
			 return true; //"合法"
		} 
	}

	$("#choosevpn").click(function(){
		if ($(this).is(':checked'))
		{
			$("#vpn_set tr").fadeIn("slow");
		}
		else
		{
			$("#vpn_set tr").fadeOut("slow");
		}
	});
	
	$("#reload_default").click(function(){
		$("#wifi").attr("checked",true);
		$("#choosevpn").attr("checked",false);
		$("#vpn_set tr").fadeOut("slow");
		$("#ip").val("192.168.1.1");
		$("#netmask").val("255.255.255.0");
	});
	
	$("#reload_save").click(function(){
		loadPage();
	});
	
	function loadPage(){
		$.ajax({
			type:"POST",
			url:"/networkManage",
			data:{
				"load":"1" 
			},
			success:function(data){
				
			},
			error:function(e){
				var error = "请求错误，错误码：" + e.status
				alert(error);
				$("span#hint").text(error);
			}
		});
	}
	
	$("#save").click(function(){
		var ip = $("#ip").val();
		var netmask = $("#netmask").val();
		if (!checkIp(ip))
		{
			$("span#hint").text("IP地址格式不正确。正确如：192.168.1.1");
			return;
		}
		if (!checkNetmask(netmask))
		{
			$("span#hint").text("子网掩码格式不正确。正确如：255.255.255.0");
			return;
		}
		console.log($("[name='default_net']:checked").val());
		$.ajax({
			type:"POST",
			url:"/networkManage",
			data:{
				"load":"0",
				"default_net":""
			},
			success:function(data){
				
			},
			error:function(e){
				var error = "请求错误，错误码：" + e.status
				alert(error);
				$("span#hint").text(error);
			}
		});
	});
});


