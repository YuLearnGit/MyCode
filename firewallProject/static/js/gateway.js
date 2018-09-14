
var local_url = window.location.href;
function jump(url) {
    window.location.href = url;
}
$(document).ready(function () {
    var ip = "192.168.1.1", mask = "255.255.255.0";//用于撤销
    var local_url = window.location.href;
    var changed = false;
    $("#next").click(function () {
        // jump("1");
        window.location.href = "/netPattern";
    });

    $("#cancel").click(function () {
        cancel();
    });

    $("#post").click(function () {
        post();
    });

    function cancel() {
        if (ip != "" && mask != "") {
            $("#ip").val(ip);
            $("#mask").val(mask);
            $("span#hint").text("已撤销修改");
            changed = false;
            $("#next").attr("disabled", false);
            $("#post").attr("disabled", true);
        }
        else {
            $("span#hint").text("撤销失败");
        }
    }

    $("#reload").click(function () {
        reload();
    });

    function reload() {
        if (!changed || confirm("更改未提交，点击确定将放弃更改")) {
            require();
        }
    }

    function post() {
        var post_ip = $("#ip").val();
        var post_mask = $("#mask").val();
        if (!isIp(post_ip)) {
            $("span#hint").text("IP地址格式不正确。正确如：192.168.1.1");
            return;
        }
        if (!isMask(post_mask)) {
            $("span#hint").text("掩码格式不正确。正确如：255.255.255.0");
            return;
        }
        if (post_ip != ip || post_mask != mask) {
            changed = true;
        }
        if (!changed) {
            $("span#hint").text("您未做更改");
            return;
        }
        $("span#hint").html("正在提交...<br>如果您更改了IP，您可能需要使用<a href='" + post_ip + ":5000'>" + post_ip + ":5000</a>来访问本系统，请至少10秒后尝试");
        setTimeout(jump,10000);
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "method": "p",
                "changed": changed,
                "ip": post_ip,
                "mask": post_mask
            },
            success: function (data) {
                if (data.success) {
                    $("span#hint").html("配置成功<br>可能需要使用<a href='" + post_ip + ":5000'>" + post_ip + ":5000</a>来访问本系统");
                    changed = false;
                    $("#post").attr("disabled", true);
                    $("#next").attr("disabled", false);
                    ip = post_ip;
                    mask = post_mask;
                }
                else if (data.error) {
                    $("span#hint").text(data.error);
                }
                else if (data.href) {
                    window.location.href = data.href;
                }
                else if (data.page) {
                    window.location.href = data.page;
                }
                else if (data.login) {
                    window.location.href = data.login;
                }
                else {
                    alert(data);
                    console.log(data);
                }
            },
            error: function (e) {
                console.log(e);
                var error = "请求错误，错误码：" + e.status;
                alert(error);
                $("span#hint").text(error);
            }
        });
    }

    function jump(direction) {
        window.location.href = "/netPattern";
        /* var post_ip = $("#ip").val();
         var post_mask = $("#mask").val();
         $("span#hint").text("正在跳转...\n");
         $.ajax({
         type:"POST",
         url:local_url,
         data:{
         "method":"j",
         "direction":direction
         },
         success:function(data){
         if (data.success)
         {
         $("span#hint").text(data.success);
         changed = false;
         }
         else if (data.error)
         {
         $("span#hint").text(data.error);
         }
         else if (data.href)
         {
         window.location.href = data.href;
         changed = false;
         }
         else if (data.page)
         {
         window.location.href = data.page;
         changed = false;
         }
         else if (data.login)
         {
         window.location.href = data.login;
         changed = false;
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
         }); */
    }

    function require() {
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "method": "r"
            },
            success: function (data) {
                if (data.success) {
                    $("span#hint").text(data.success);
                    $("#ip").val(data.ip);
                    $("#mask").val(data.mask);
                    ip = data.ip;
                    mask = data.mask;
                    changed = false;
                }
                else if (data.error) {
                    $("span#hint").text(data.error);
                }
                else if (data.href) {
                    window.location.href = data.href;
                }
                else if (data.page) {
                    window.location.href = data.page;
                }
                else if (data.login) {
                    window.location.href = data.login;
                }
                else {
                    alert(data);
                    console.log(data);
                }
            },
            error: function (e) {
                console.log(e);
                var error = "请求错误，错误码：" + e.status;
                alert(error);
                $("span#hint").text(error);
            }
        });
    }

    $("#ip").keyup(function () {
        changed = true;
        $("span#hint").text("您已作出更改，点击提交将重启网络");
        $("#next").attr("disabled", true);
        $("#post").attr("disabled", false);
    });

    $("#mask").keyup(function () {
        changed = true;
        $("span#hint").text("您已作出更改，点击提交将重启网络");
        $("#next").attr("disabled", true);
        $("#post").attr("disabled", false);
    });

    function loadDefaultView() {
        $("#next").attr("disabled", false);
        $("#post").attr("disabled", true);
    }

    loadDefaultView();

    require();
});