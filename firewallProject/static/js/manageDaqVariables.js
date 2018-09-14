var local_url = window.location.href;
$(document).ready(function(){
	var mode = "add";
	var changeTrEle;
	var table = $("#daq_variables").DataTable({
		"columns": [ 
			{ "data": "id", 			"title": "编号" },
	   		{ "data": "dataName", 		"title": "变量名" },
			{ "data": "deviceAddress", 	"title": "设备地址" },
			{ "data": "dataUnit", 		"title": "单位"},
			{ "data": "dataType", 		"title": "数据类型"},
			{ "data": "dataLength",		"title": "数据长度"},
			{ "data": "dataAddress",	"title": "数据地址"},
			{ "data": "deviceName",		"title": "设备名称"},
			{ "data": "devicePort",		"title": "设备端口"},
			{ "data": "deviceUnit",		"title": "设备单元"},
			{ "data": "funCode",		"title": "功能码"},
			{ "data": null, "title": "操作","defaultContent":"<button class='change_variable'>修改</button><button class='delete_variable'>删除</button>" }
	    ],
		"columnDefs": [
			{ "orderable": false, "targets": 11 }
		],//第12列不排序
		//"order": [[ 11, 'asc' ]],
		"language": {
		   	"sProcessing": "处理中...",
		   	"sLengthMenu": "每页显示数量  _MENU_ ",
		   	"sZeroRecords": "没有匹配结果",
			"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
			"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
			"sInfoPostFix": "",
			"sSearch": "在结果中过滤:",
			"sUrl": "",
			"sEmptyTable": "无变量",
			"sLoadingRecords": "表中数据为空",
			"sInfoThousands": ",",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "上页",
				"sNext": "下页",
				"sLast": "末页"
			},
			"oAria": {
				"sSortAscending": ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
			}
		},
		"sDom":'fl<"#load_div">rtip',//表外DOM位置
		"bFilter": true //开关，是否启用客户端过滤器 
	});
	
	$("div#load_div").html('<button id="reload_variables">刷新页面</button> <button id="add_variable">新建变量</button>');
	
	$("#daq_variables tbody").on("click",".change_variable",function(){
		change_variable(this);
		mode = "change";
	})
	
	$("#daq_variables tbody").on("click",".delete_variable",function(){
		console.log("delete_variable");
		delete_variable(this);
	})
	
	$("button#reload_variables").click(function(){
		load_variables();
	});
	
	$("button#add_variable").click(function(){
		add_variable();
		mode = "add";
	});
	
	$("#close_pop").click(function(){
		close_pop();
	})
	
	$("button#confirm_add").click(function(){
		if (mode == "add")
		{
			confirm_add();
		}
		else if (mode == "change")
		{
			confirm_change();
		}
	});
	
	$("button#cancel_add").click(function(){
		cancel_add();
	});
	
	$("button#clean_add").click(function(){
		clean_add();
	});
	
	function change_variable(changeBtnele){
		var trele = $(changeBtnele).parents("tr");
		changeTrEle = trele;
		var id = 			$(trele).children("td:eq(0)").text();
		var dataName = 		$(trele).children("td:eq(1)").text();
		var deviceName = 	$(trele).children("td:eq(7)").text();
		var dataUnit = 		$(trele).children("td:eq(3)").text();
		var deviceAddress = $(trele).children("td:eq(2)").text();
		var devicePort = 	$(trele).children("td:eq(8)").text();
		var deviceUnit = 	$(trele).children("td:eq(9)").text();
		var dataAddress = 	$(trele).children("td:eq(6)").text();
		var dataType = 		$(trele).children("td:eq(4)").text();
		var funCode = 		$(trele).children("td:eq(10)").text();
		var dataLength = 	$(trele).children("td:eq(5)").text();
		
		open_pop();
		$("#id").text(id);
		$("#dataName").val(dataName);
		$("#deviceName").val(deviceName);
		$("#dataUnit").val(dataUnit);
		$("#deviceAddress").val(deviceAddress);
		$("#devicePort").val(devicePort); 
		$("#deviceUnit").val(deviceUnit);
		$("#dataAddress").val(dataAddress);
		$("#dataType").val(dataType);
		$("#dataLength").val(dataLength);
		if (dataType == "COIL")
		{
			$("#dataLengthHint").text("位");
		}
		else if (dataType == "DISCRETE_INPUT")
		{
			$("#dataLengthHint").text("位");
		}
		else if (dataType == "HOLDING_REGISTER")
		{
			$("#dataLengthHint").text("字");
		}
		else if (dataType == "INPUT_REGISTER")
		{
			$("#dataLengthHint").text("字");
		}
		$("button#confirm_add").text("修改");
		$("#addVariableHint").text("修改变量")
		$("#addHint").text("");
	}
	
	
	
	function delete_variable(deleteBtnele){
		if (!confirm("删除后无法恢复，确定吗？"))
		{
			return;
		}
		var trele = $(deleteBtnele).parents("tr");
		var id = $(trele).children("td:eq(0)").text();
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"d",
				"id":id
			},
			success:function(data){
				if (data.success)
				{
					alert(data.success);
					$("span#hint").text(data.success);
					console.log(data);
					delete_row(trele);
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
				var error = "请求错误，错误码：" + e.status;
				alert(error);
				$("span#hint").text(error);
			}
		});
	}
	
	function delete_row(trele){
		table.row(trele).remove().draw();
	}
	
	function load_variables(){
		var ajax = {
			"type":"POST",
			"url":local_url, 
			"dataType":"json",
			"data":{
				"method":"l"
			},
			"error":function(e){
				console.log(e);
				//var error = "请求错误，错误码：" + e.status
				alert(e);
				//$("span#hint").text(error);
			}
		};
		table.settings()[0].ajax = ajax;
		table.ajax.reload();
		//bindCancelSelectAllFunction();
	}
	
	function confirm_change(){
		var id = 			$("#id").text();
		var dataName = 		$("#dataName").val();
		var deviceName = 	$("#deviceName").val();
		var dataUnit = 		$("#dataUnit").val();
		var deviceAddress = $("#deviceAddress").val();
		var devicePort = 	$("#devicePort").val(); 
		var deviceUnit = 	$("#deviceUnit").val();
		var dataAddress = 	$("#dataAddress").val();
		var dataType = 		$("#dataType").val();
		var funCode = 		"1";
		var dataLength = 	$("#dataLength").val();
		if (dataType == "COIL")
		{
			funCode = "1";
		}
		else if (dataType == "DISCRETE_INPUT")
		{
			funCode = "2";
		}
		else if (dataType == "HOLDING_REGISTER")
		{
			funCode = "3";
		}
		else if (dataType == "INPUT_REGISTER")
		{
			funCode = "4";
		} 
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":			"c",
				"id":				id,
				"dataName":			dataName,
				"deviceName":		deviceName,
				"dataUnit":			dataUnit,
				"deviceAddress":	deviceAddress, 
				"devicePort":		devicePort,
				"deviceUnit":		deviceUnit,
				"dataAddress":		dataAddress,
				"dataType":			dataType,
				"funCode":			funCode,
				"dataLength":		dataLength
			},
			success:function(data){
				if (data.success)
				{
					$("span#addHint").text(data.success);
					if (changeTrEle)
					{
						$(changeTrEle).children("td:eq(1)").text(dataName);
						$(changeTrEle).children("td:eq(7)").text(deviceName);
						$(changeTrEle).children("td:eq(3)").text(dataUnit);
						$(changeTrEle).children("td:eq(2)").text(deviceAddress);
						$(changeTrEle).children("td:eq(8)").text(devicePort);
						$(changeTrEle).children("td:eq(9)").text(deviceUnit);
						$(changeTrEle).children("td:eq(6)").text(dataAddress);
						$(changeTrEle).children("td:eq(4)").text(dataType);
						$(changeTrEle).children("td:eq(10)").text(funCode);
						$(changeTrEle).children("td:eq(5)").text(dataLength);
					}
					
				}
				else if (data.error)
				{
					$("span#addHint").text(data.error);
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
				$("span#addHint").text(error);
				$("span#hint").text(error);
			}
		});
	}
		
	function add_variable(){
		open_pop();
		$("button#confirm_add").text("添加");
		$("#addVariableHint").text("新建变量");
		$("#addHint").text("");
	}
	

	
	function confirm_add(){
		var dataName = 		$("#dataName").val();
		var deviceName = 	$("#deviceName").val();
		var dataUnit = 		$("#dataUnit").val();
		var deviceAddress = $("#deviceAddress").val();
		var devicePort = 	$("#devicePort").val(); 
		var deviceUnit = 	$("#deviceUnit").val();
		var dataAddress = 	$("#dataAddress").val();
		var dataType = 		$("#dataType").val();
		var funCode = 		"1";
		var dataLength = 	$("#dataLength").val();
		if (dataType == "COIL")
		{
			funCode = "1";
		}
		else if (dataType == "DISCRETE_INPUT")
		{
			funCode = "2";
		}
		else if (dataType == "HOLDING_REGISTER")
		{
			funCode = "3";
		}
		else if (dataType == "INPUT_REGISTER")
		{
			funCode = "4";
		} 
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":			"a",
				"dataName":			dataName,
				"deviceName":		deviceName,
				"dataUnit":			dataUnit,
				"deviceAddress":	deviceAddress, 
				"devicePort":		devicePort,
				"deviceUnit":		deviceUnit,
				"dataAddress":		dataAddress,
				"dataType":			dataType,
				"funCode":			funCode,
				"dataLength":		dataLength
			},
			success:function(data){
				if (data.success)
				{
					$("span#addHint").text(data.success);
					//console.log(data.success);
					if (data.addRecord)
					{
						console.log(data.addRecord);
						table.row.add(data.addRecord).draw();
					}
				}
				else if (data.error)
				{
					$("span#addHint").text(data.error);
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
				$("span#addHint").text(error);
				$("span#hint").text(error);
			}
		});
	}
	
	function cancel_add(){
		close_pop();
	}
	
	function open_pop(){
		console.log("open_pop");
		$(".fade_div").removeClass("hide");
		// $(".fade_div").addClass("fade");
		$(".pop_div").removeClass("hide");
		// $(".pop_div").addClass("pop");
	}
	
	function close_pop(){
		console.log("close_pop");
		// $(".fade_div").removeClass("fade");
		$(".fade_div").addClass("hide");
		// $(".pop_div").removeClass("pop");
		$(".pop_div").addClass("hide");
	}
	
	function clean_add(){
		$("#id").text("");
		$("#dataName").val("");
		$("#deviceName").val("");
		$("#dataUnit").val("");
		$("#deviceAddress").val("");
		$("#devicePort").val(""); 
		$("#deviceUnit").val("");
		$("#dataAddress").val("");
		$("#dataType").val($("#dataType option:first").val());
		$("#dataLength").val("");
		$("#dataLengthHint").text("位");
	}
	
	
	$("#dataType").click(function(){
		select_val = $("#dataType").val();
		var dataType = $("#dataType").val();
		if (dataType == "COIL")
		{
			$("#dataLengthHint").text("位");
		}
		else if (dataType == "DISCRETE_INPUT")
		{
			$("#dataLengthHint").text("位");
		}
		else if (dataType == "HOLDING_REGISTER")
		{
			$("#dataLengthHint").text("字");
		}
		else if (dataType == "INPUT_REGISTER")
		{
			$("#dataLengthHint").text("字");
		}
		//console.log(select_val);
	});
	
	//require_categories();
	
});