function showSystemTime(){
	var now = new Date();
	var timeStr = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate() + " "
	+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	document.getElementById("current_time").innerHTML = timeStr;//$("span#current_time").text(timeStr);
}

function loadIframe(url){
	$("iframe#frame_box").attr('src', url);
}
			
$(document).ready(function(){
	window.setInterval("showSystemTime()", 1000);
			
		$("#logo_img").click(function(){
			window.location.href = "/";
		})
		
			
		$("#logout").click(function(){
			$.ajax({
				type:"POST",
				url:"/logout",
				data:{},
				success:function(data){
					if (data.login)
					{
						window.location.href = data.login;
					}
					else
					{
						console.log(data);
						alert(data);
					}
				},
				error:function(e){
					var error = "请求错误，错误码：" + e.status
					alert(error);
					$("span#hint").text(error);
				}
			});
		});

		$("dt").click(function(){
			/* $("dt").css("color","ghostwhite");
			$("dd").slideUp("slow");
			$(this).parents("dl").children("dd").slideDown("slow");
			$(this).css("color","black"); */
		});
		
		$("dt").click(function(){
			//console.log($(this).next())
			$("dt").css("color","ghostwhite");
			$("dd").slideUp("fast");
			//$("dd").css("display","none");
			$(this).css("color","black");
			if ($(this).next().length > 0)
			{
				//$(this).parents("dl").children("dd").css("display","block")
				$(this).parents("dl").children("dd").slideDown("fast");
				return;
			}
			url = "loadIframe('"+$(this).attr("id")+"');";
			//console.log(url)
			setTimeout(url,200);
			//loadIframe($(this).attr("id"));
			/* $.ajax({
				type:"POST",
				url:"/",
				data:{
					"page":$(this).attr("id")
				},
				success:function(data){
					if (data.page)
					{
						loadIframe(data.page);
					}
					else if (data.href)
					{
						window.location.href = data.href;
					}
					else
					{
						console.log(data);
						alert(data);
					}
				},
				error:function(e){
					var error = "请求错误，错误码：" + e.status
					alert(error);
					$("span#hint").text(error);
				}
			}); */
		});
			
		$("dd").click(function(){
			$("dd").css("background","inherit");
			$(this).css("background",'url("../static/image/indicate_white_big.png") no-repeat center right');
			loadIframe($(this).attr("id"));
		});

		$("dd").click(function(){
			/* loadIframe($(this).attr("id")); */
		});
		
		loadIframe("/welcome");
});