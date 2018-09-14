var local_url =window.location.href;
$(document).ready(function(){
	$("button#manage_categories").click(function(){
		manage_categories();
	});
	
	$("button#reload_categories").click(function(){
		reload_categories();
	});
	
	$("button#change_src_dst").click(function(){
		change_src_dst();
	});
	
	$("button#post").click(function(){
		post();
	});
	
	
	$("button#clean").click(function(){
		clean();
	});
	
	function manage_categories(){
		window.location.href = "/manageRuleCategories"
	}
	
	function reload_categories(){
		require_categories();
	}
	
	//注意method别重复了
	function require_categories(){
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"r"
			},
			success:function(data){
				if (data.success)
				{
					$("span#hint").text(data.success);
					console.log(data);
					add_options(data.list);
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
	
	function add_options(ops){
		if (ops && ops.length >0)
		{
			$("select#categories").empty();
			for ( op in ops)
			{
				var optionHtml = '<option value="' + ops[op] + '">' + ops[op] + '</option>';
				$("select#categories").append(optionHtml);
			}
			$("select#categories").val(ops[0]);
		}
	}
	
	
	function change_src_dst(){
		var src_ip = $("#src_ip").val();
		var src_port = $("#src_port").val();
		var dst_ip = $("#dst_ip").val();
		var dst_port = $("#dst_port").val();
		//console.log(src_ip + " "+ src_port + " "+dst_ip+" " + dst_port);
		$("#src_ip").val(dst_ip); 
		$("#src_port").val(dst_port);
		$("#dst_ip").val(src_ip);
		$("#dst_port").val(src_port);
	}
	
	
	function post(){
		var comment = $("#comment").val();
		var append_table = $("#append_table option:selected").val();			//console.log(action);
		var append_chain = $("#append_chain option:selected").val();		//console.log(protocol);
		var protocol = $("#protocol option:selected").val();		//console.log(direction);
		var ip_version = $("#ip_version option:selected").val();
		var src_ip = $("#src_ip").val();							//console.log(src_ip);
		var src_port = $("#src_port").val();						//console.log(src_port);
		var dst_ip = $("#dst_ip").val();							//console.log(dst_ip);
		var dst_port = $("#dst_port").val();						//console.log(dst_port);
		var in_interface = $("#in_interface option:selected").val();			//console.log(flow_1);
		var out_interface = $("#out_interface option:selected").val();			//console.log(flow_2);
		var other1 = $("#other1").val();
		var target = $("#target option:selected").val();	//console.log(modbus_func);				//console.log(modbus_data);
		var other2 = $("#other2").val();
		//应该检查合法性
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"p",
				"comment":comment,
				"append_table":append_table,
				"append_chain":append_chain,
				"protocol":protocol,
				"ip_version":ip_version,
				"src_ip":src_ip,
				"src_port":src_port,
				"dst_ip":dst_ip,
				"dst_port":dst_port,
				"in_interface":in_interface,
				"out_interface":out_interface,
				"other1":other1,
				"target":target,
				"other2":other2
			},
			success:function (data){
				if (data.success)
				{
					var hintMsg = "生成规则如下：\n" 
						+ "备注：" + data.comment + "\n\n"
						+ "规则：" + data.rule + "\n\n"
						+ "点击确定即可保存并生效\n";
					var ok =  confirm(hintMsg);
					//$("span#hint").text(data.success);
					if (ok)
					{
						post_rules(data.rule,data.comment)
					}
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
	
	function post_rules(rule,comment){
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"o",
				"rule":rule,
				"comment":comment
			},
			success:function(data){
				if (data.success)
				{
					$("span#hint").text(data.success);
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
	
	function clean(){
		$("#comment").val("");
		$("#append_table").val($('#append_table option:first').val());
		$("#append_chain").val($('#append_chain option:first').val());
		$("#protocol").val($("#protocol option:first").val());
		$("#ip_version").val($("#ip_version option:first").val());
		$("#src_ip").val("");
		$("#dst_ip").val("");
		$("#src_port").val("");
		$("#dst_port").val("");
		$("#in_interface").val($("#in_interface option:first").val());
		$("#out_interface").val($("#out_interface option:first").val());
		$("#target").val($("#target option:first").val());
	}
	
	//require_categories();
	
	
})