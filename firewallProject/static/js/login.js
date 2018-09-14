var local_url = window.location.href;
jQuery(document).ready(function () {
    $("#login_button").click(function () {
        login();
    });

    function login() {
        if ($("#username").val() == "") {
            $("span#hint").text("请输入用户名");
            return;
        }
        if ($("#password").val() == "") {
            $("span#hint").text("请输入密码");
            return;
        }
        $("span#hint").text("正在登录...");
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "username": $("#username").val(),
                "password": $("#password").val()
            },
            success: function (data) {
                if (data.error) {
                    $("span#hint").text(data.error);
                }
                else if (data.href) {
                    window.location.href = data.href;
                }
                else {
                    alert(data);
                    console.log(data);
                }
            },
            error: function (e) {
                var error = "请求错误，错误码：" + e.status;
                alert(error);
                $("span#hint").text(error);
            }
        });
    }

    $("#password").keyup(function (event) {
        var e = event || window.event;
        var keyValue = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        $("span#hint").text("请注意大小写");
        if (keyValue == 13) {
            //alert('您按了回车键')
            //自己写判断函数
            login();
            return;
        }
        // if (eCode == 20)
        // {
        // 	$("span#hint").text("大写锁定已开启");
        // }
        // console.log(eCode)
        // console.log(e.keyModifierStateCapsLock)
        // var shiftKey = e.shiftKey ? true:(keyValue == 16);
        // // var len = $("#password").val().length;
        // var text = $("#password").val();
        // var len = text.length;
        // console.log("keyValue");
        // console.log(keyValue);
        // console.log("shiftKey");
        // console.log(shiftKey);
        // if(len)
        // {
        // 	console.log("len");
        // console.log(len);
        //    var uniCode = text.charCodeAt(len-1);
        //    console.log("uniCode");
        //    console.log(uniCode);
        //    if(keyValue>=65 && keyValue<=90){     //如果是字母键
        //        if(((uniCode >= 65 && uniCode <= 90) && !shiftKey)||((uniCode >= 97 && uniCode <= 122) && shiftKey)){
        //            // return true;  //开启
        //            console.log("大写字母");
        //        }else{
        //            // return false;  //未开启
        // 			console.log("小写字母");
        //        }
        //    }
        // }
        // console.log(eCode);
    });

    $("#help").click(function () {
        help()
    });

    $("#forget").click(function () {
        forget()
    });
    $("#browser_support").click(function () {
       browser_support();
    });

    function help() {
        $("#help_hint").show();
        $("#help_hint").html("<span>&nbsp;本软件为Web配置软件。</span><br>" +
            "<span>&nbsp;&nbsp;若您在使用本产品的过程中，出现任何问题或疑问，请联系您的供应商。</span><br>" +
            "<span>&nbsp;&nbsp;如有好的建议，也欢迎反馈。</span><br>" +
            "<span>&nbsp;&nbsp;谢谢。</span><br>")
    }

    function forget() {
        $("#help_hint").show();
        $("#help_hint").html("<span>&nbsp;若您忘记了帐户名或密码，请联系您的供应商以解决此问题。</span><br>")
    }

    function browser_support() {
        $("#help_hint").show();
        $("#help_hint").html("<div>&nbsp;推荐使用以下浏览器及其以上版本，以获得标准的浏览体验和完整的功能支持：</div>" +
        "<div>&nbsp;Chrome 4.0+</div>" +
        "<div>&nbsp;Firefox 2.0+</div>" +
        "<div>&nbsp;Safari 3.1+</div>" +
        "<div>&nbsp;Opera 9.0+</div>" +
        "<div>不推荐使用IE浏览器（需9.0+）和360浏览器（需极速模式），谢谢。</div>")
    }
});