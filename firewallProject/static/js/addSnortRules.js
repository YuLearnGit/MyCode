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
	
	$("button#add_content_tr").click(function(){
		add_content_tr(this);
	});
	
	$("button.sub_content_tr").click(function(){
		sub_content_tr(this);
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
	
	
	//未完待续
	function generateSingleContentValue(content_ele,nocase_ele)
	{
		var value="";
		var content = $(content_ele).val();
		var nocase = $(nocase_ele).is(":checked")?"1":"0";
		if (content != "" && content != "&quot;&quot;" && content.length > 2)
		{
			value = 'content:' + content + ';';
			if (nocase == "1")
			{
				value += "nocase;";
			}
		}
		return value;
	}
	
	var contentValue = "";
	function generateContentValue(ele)
	{
		var elecontent = $(ele).find(".content");
		var elenocase = $(ele).find(".nocase");
		var returnContent = generateSingleContentValue(elecontent,elenocase);
		contentValue += returnContent;
		//return contentValue;
	}
	
	function post(){
		
		var content_tr = $(".content_tr");
		if (content_tr.length >10)
		{
			alert("匹配内容框个数多余10个，请适当删除后提交");
			return;
		}
		contentValue = "";
		//return;
		var category = $("select#categories option:selected").val();
		var comment = $("#comment").val();
		var action = $("#action option:selected").val();			//console.log(action);
		var protocol = $("#protocol option:selected").val();		//console.log(protocol);
		var direction = $("#direction option:selected").val();		//console.log(direction);
		var src_ip = $("#src_ip").val();							//console.log(src_ip);
		var src_port = $("#src_port").val();						//console.log(src_port);
		var dst_ip = $("#dst_ip").val();							//console.log(dst_ip);
		var dst_port = $("#dst_port").val();						//console.log(dst_port);
		var classtype = $("#classtype option:selected").val();		//console.log(classtype);
		var flow_1 = $("#flow_1 option:selected").val();			//console.log(flow_1);
		var flow_2 = $("#flow_2 option:selected").val();			//console.log(flow_2);
		//var content = $("#content").val();console.log(content);
		//var nocase = $("#nocase").is(':checked')?"1":"0";console.log(nocase);
		//contentValue += generateSingleContentValue(cont)
		content_tr.each(function(){
			generateContentValue(this);
		});
		console.log(contentValue);
		var offset = $("#offset").val();							//console.log(offset);
		var depth = $("#depth").val();								//console.log(depth);
		var gid = $("#gid").val();									//console.log(gid);
		var sid = $("#sid").val();									//console.log(sid);
		var rev = $("#rev").val();									//console.log(rev);
		var priority = $("#priority").val();						//console.log(priority);
		var msg = $("#msg").val();									//console.log(msg);
		var other = $("#other").val()
		var modbustcp = $("#modbustcp").is(":checked")?"1":"0";		//console.log(modbustcp);
		var modbus_func = $("#modbus_func option:selected").val();	//console.log(modbus_func);
		var modbus_unit = $("#modbus_unit").val();					//console.log(modbus_unit);
		var modbus_data = $("#modbus_data").val();					//console.log(modbus_data);
		//应该检查合法性
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"p",
				"category":category,
				"comment":comment,
				"action":action,
				"protocol":protocol,
				"direction":direction,
				"src_ip":src_ip,
				"src_port":src_port,
				"dst_ip":dst_ip,
				"dst_port":dst_port,
				"classtype":classtype,
				"flow_1":flow_1,
				"flow_2":flow_2,
				"content":contentValue,
				"offset":offset,
				"depth":depth,
				"gid":gid,
				"sid":sid,
				"rev":rev,
				"priority":priority,
				"msg":msg,
				"other":other,
				"modbustcp":modbustcp,
				"modbus_func":modbus_func,
				"modbus_unit":modbus_unit,
				"modbus_data":modbus_data
			},
			success:function (data){
				if (data.success)
				{
					var hintMsg = "生成规则如下：\n" 
						+ "分类：" + data.category + "\n\n"
						+ "备注：" + data.comment + "\n\n"
						+ "规则：" + data.rule + "\n\n"
						+ "点击确定即可保存并生效\n";
					var ok =  confirm(hintMsg);
					//$("span#hint").text(data.success);
					if (ok)
					{
						post_rules(data.category,data.rule,data.comment)
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
	
	function post_rules(category,rule,comment){
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"o",
				"category":category,
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
	
	function add_content_tr(ele){
		var length = $(".content_tr").length;
		if (length >= 10)
		{
			alert("已经有10条了，勿再增加！");
			return;
		}
		var td = $(ele).parent();
		var tr = $(td).parent();
		var new_content_tr = "<tr class='content_tr'>"
					+"<td class='right'><label class='tipped sub_tipped content_label'>匹配内容：</label></td>"
					+"<td colspan='4'><input class='content' type='text' style='width:98%' value='&quot;&quot;'></td>"
					+"<td colspan='2'><input class='nocase' type='checkbox'><label class='tipped sub_tipped nocase_label'>忽略大小写</label></td>"
					+"<td colspan='1'><button class='sub_content_tr tipped sub_tipped sub_label' style='width:25px;text-align:center;'><label>-</label></button></td>"
				+"</tr>";
		$(tr).after(new_content_tr);
		$(".sub_tipped").attr('data-tipper-options','{"direction":"bottom"}');
		$(".content_label").attr("data-title",'content<br>输入内容请用双引号括起来，如写成 "abc"<br>使用!操作符时，请将!写在双引号外面，如写成 !"abc"<br>注意，请使用英文符号。')
		$(".nocase_label").attr("data-title","匹配内容时忽略大小写");
		$(".sub_label").attr("data-title","删除此行");
		$(".sub_tipped").tipper();
		var addtr = $(tr).next();
		$(addtr).find(".sub_content_tr").click(function(){sub_content_tr(this);});
	}
	
	function sub_content_tr(ele){
		var td = $(ele).parent();
		var tr = $(td).parent();
		$(tr).remove();
		$("div.bottom").remove();
	}
	
	function clean(){
		$("#action").val($('#action option:first').val());
		$("#comment").val("");
		$("#protocol").val($("#protocol option:first").val());
		$("#direction").val($("#direction option:first").val());
		$("#src_ip").val("");
		$("#dst_ip").val("");
		$("#src_port").val("");
		$("#dst_port").val("");
		$("#classtype").val($("#classtype option:first").val());
		$("#flow_1").val($("#flow_1 option:first").val());
		$("#flow_2").val($("#flow_2 option:first").val());
		$("#content").val("\"\"");
		$("#nocase").attr("checked",false);
		$("#offset").val("");
		$("#depth").val("");
		$("#gid").val("");
		$("#sid").val("");
		$("#rev").val("");
		$("#priority").val("");
		$("#msg").val("");
		$("#modbustcp").attr("checked",false);
		$("#modbus_func").val($("#modbus_func option:first").val());
		$("#modbus_unit").val("");
		$("#modbus_data").val("");
	}
	
	require_categories();
	
	
})