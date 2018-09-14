var local_url = window.location.href;
$(document).ready(function(){
	var table = $("#snort_category_rules").DataTable({
		"columns": [ 
			{ "data": null, "title": "<input id='select_all' type='checkbox'>","defaultContent":"<input class='check_rule' type='checkbox'>" },
			{ "data": "id", "title": "编号" },
	   		{ "data": "rule", "title": "规则" },
			{ "data": "comment", "title":"备注" }
	    ],
		"columnDefs": [
			{ "orderable": false, "targets": 0 }
		],//第一列不排序
		"order": [[ 1, 'asc' ]],//默认第2列升序
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
			"sEmptyTable": "此分类下无规则",
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
		"sDom":'fl<"#load_div">rti<"#delete_div">p',//表外DOM位置
		"bFilter": true //开关，是否启用客户端过滤器 
		
	});
	
	$("div#load_div").html('<label>选择类别：</label>'
					+  '<select id="categories" style="width:200px;"></select>'
					+ ' <button id="load_rules">载入规则</button>');
	$("div#delete_div").html('<button id="delete_chosen_rules" style="width:50px;height:30px;">删除</button>');
	
	
	$("button#load_rules").click(function(){
		load_rules();
		cancel_select_all();
	});
	
	$("button#delete_chosen_rules").click(function(){
		delete_chosen_rules();
	});
	
	$("input#select_all").click(function(){
		if ($("input#select_all").is(":checked"))
		{
			select_all();
		}
		else 
		{
			cancel_select_all();
		}
	});
	
	//由于按钮等是动态生成的，不好直接设置按钮的点击函数，只能这样曲线救国了
	//应该可以像下一个函数那样写点击事件
	$("#snort_category_rules_paginate").click(function(e){
		//点击上下页和其它页时，去除全选效果
		var cla = $(e.target).attr("class");
		console.log(cla);
		if (cla == "paginate_button previous")
		{
			console.log("cancel_select_all");
			cancel_select_all();
		}
		else if (cla == "paginate_button next")
		{
			console.log("cancel_select_all");
			cancel_select_all();
		}
		else if (cla == "paginate_button ")
		{
			console.log("cancel_select_all");
			cancel_select_all();
		}
	});
	
	$("#snort_category_rules tbody").on("click",".check_rule",function(){
		console.log("clicked");
		if ($(this).is(":checked"))
		{
			var is_select_all = true;
			$("input.check_rule").each(function(){
				if (!$(this).is(":checked"))
				{
					is_select_all = false;
				}
			});
			if (is_select_all)
			{
				$("input#select_all").attr("checked",true);
			}
		}
		else
		{
			$("input#select_all").attr("checked",false);
		}
		
		
	});
	
	function select_all(){
		$("input.check_rule").attr("checked",true);
	}
	
	function cancel_select_all()
	{
		$("input#select_all").attr("checked",false);
		$("input.check_rule").attr("checked",false);
	}
	
	var ids="";
	var eletrs;
	function getAllDeleteId(checkboxele){
		var tr = $(checkboxele).parents("tr");
		//console.log();
		eletrs.push(tr);
		var id = $(checkboxele).parent().next().text();
		ids += id + ",";
	}
	
	function delete_chosen_rules(){
		ids = "";
		eletrs = new Array();
		$("input.check_rule").each(function(){
			if ($(this).is(":checked"))
			{
				getAllDeleteId(this);
			}
		});
		if (ids != "" && ids != ",")
		{
			if (!confirm("点击确定将删除选中的规则，删除后无法恢复，确定吗？"))
			{
				return;
			}
			ids = ids.substring(0,ids.length-1);
			delete_rules(ids);
			console.log(ids);
			
		}
	}
	
	function delete_rules(ids){
			//ajax
			var category = $("select#categories option:selected").val();
			$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"d",
				"category":category,
				"ids":ids
			},
			success:function(data){
				if (data.success)
				{
					alert(data.success);
					$("span#hint").text(data.success);
					console.log(data);
					delete_rows(eletrs);
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
	
	function delete_rows(trs){
		for (i in trs)
		{
			table.row(trs[i]).remove();
		}
		table.draw();
	}
	
	function load_rules(){
		var category = $("select#categories option:selected").val();
		console.log(category);
		var ajax = {
			"type":"POST",
			"url":local_url, 
			"dataType":"json",
			"data":{
				"method":"t",//忘记t代表啥意思了
				"category":category
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
	
	require_categories();
	
});