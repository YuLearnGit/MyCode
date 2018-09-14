var local_url =window.location.href;
$(document).ready(function(){
	$("button#reload").click(function(){
		reload();
	});
	
	$("button#add").click(function(){
		add();
	});
	
	$("button#drop").click(function(){
		drop();
	});
	
	$("button#rename").click(function(){
		rename();
	});
	
	function reload(){
		require();
	}
	
	function require(){
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
	
	function add(){
		var add_category = $("input#add_category").val();
		if (add_category == "")
		{
			$("span#hint").text("提交数据不能为空");
			return;
		}
		$("span#hint").text("正在增加...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"a",
				"add_category":add_category
			},
			success:function(data){
				if (data.success)
				{
					$("span#hint").text(data.success);
					console.log(data);
					add_option(add_category);
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
	
	function drop(){
		var drop_category = $("input#drop_category").val();
		if (drop_category == "")
		{
			$("span#hint").text("提交数据不能为空");
			return;
		}
		if (drop_category == "default")
		{
			$("span#hint").text("内建表default不能删除");
			return;
		}
		if (!confirm("删除某类别将导致该类别下所有规则均被删除，确定删除吗？"))
		{
			return;
		}	
		$("span#hint").text("正在删除...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"d",
				"drop_category":drop_category
			},
			success:function(data){
				if (data.success)
				{
					$("span#hint").text(data.success);
					console.log(data);
					drop_option(drop_category);
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
	
	function rename(){
		var old_category = $("input#old_category").val();
		var new_category = $("input#new_category").val();
		if (old_category == "" || new_category == "")
		{
			$("span#hint").text("提交数据不能为空");
			return;
		}
		$("span#hint").text("正在重命名...");
		$.ajax({
			type:"POST",
			url:local_url,
			data:{
				"method":"n",
				"old_category":old_category,
				"new_category":new_category
			},
			success:function(data){
				if (data.success)
				{
					$("span#hint").text(data.success);
					console.log(data);
					rename_option(old_category,new_category);
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
	
	function add_option(op){
		var optionHtml =  '<option value="' + op + '">' + op + '</option>';
		$("select#categories").append(optionHtml);
		$("select#categories").val(op);
	}
	
	function drop_option(op){
		var opt = $("select#categories").find("[value='"+ op +"']");
		$(opt).remove();
		$("select#categories").val($("select#categories option:first").val());
	}
	
	function rename_option(old_op,new_op){
		var opt = $("select#categories").find("[value='"+ old_op +"']");
		$(opt).attr("value",new_op);
		$(opt).html(new_op);
		$("select#categories").val(new_op);
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
	
	require();
	
});