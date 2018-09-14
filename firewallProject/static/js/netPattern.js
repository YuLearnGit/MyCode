var wifiname = "", wifipassword = "", ishidden = "0";
var main_url = "";
var changed = false;
var NET_MODE_WIFI = "wifi";
var NET_MODE_MOBILE3G = "mobile3g";
var current_net_mode = NET_MODE_WIFI;//"wifi" or "mobile3g"
var local_url = window.location.href;
var testfunction;//周期测试函数变量，用于取消周期调用
var runtest = false;//测试是否进行中
var onetestrun = false;//当前测试请求是否还未回应，如果未回应，则不发出下一个请求
var testCount = 0;//标记当前是第几次测试
function testWifi() {//不写在外面，setInterval()函数不认
    if (onetestrun) {
        return;
    }
    console.log("running test");
    onetestrun = true;
    testCount = testCount + 1;
    var org = $("span#hint").html();
    $.ajax({
        type: "POST",
        url: local_url,
        data: {
            "method": "t",
            "mode": current_net_mode
        },
        success: function (data) {
            onetestrun = false;
            if (data.success) {
                var ipmsg = "IP：" + data.ip + "<br>广播：" + data.broadcast + "<br>掩码：" + data.mask + "<br>";
                $("span#hint").html(org + "第" + testCount + "次测试结果：" + data.success + "<br>" + ipmsg);
            }
            else if (data.error) {
                $("span#hint").html(org + "第" + testCount + "次测试结果：" + data.error + "<br>");
            }
            else if (data.href) {
                window.location.href = data.href;
                deactivateTest();
            }
            else if (data.page) {
                window.location.href = data.page;
                deactivateTest();
            }
            else if (data.login) {
                window.location.href = data.login;
                deactivateTest();
            }
            else {
                alert(data);
                console.log(data);
                deactivateTest();
            }
        },
        error: function (e) {
            onetestrun = false;
            console.log(e);
            var error = "请求错误，错误码：" + e.status;
            alert(error);
            //$("span#hint").text(error);
            $("span#hint").html(org + "第" + testCount + "次测试结果：" + error + "<br>已自动中断测试<br>");
            deactivateTest();
        }
    });
}

function deactivateTest() {
    if (testfunction != null) {
        window.clearInterval(testfunction);
        var org = $("span#hint").html();
        $("span#hint").html(org + "测试已停止<br>");
        $("#test").html("测试");
        runtest = false;
        testfunction = null;
        testCount = 0;
    }
}

$(document).ready(function () {
    //提示修改..做两个changed变量，写触发条件

    $("#back").click(function () {
        back();
    });

    $("#reload").click(function () {
        reload();
    });

    $("#cancel").click(function () {
        cancel();
    });

    $("#post").click(function () {
        post();
    });

    $("#test").click(function () {
        test();
    });

    $("#next").click(function () {
        next();
    });


    function back() {
        deactivateTest();
        if (changed == false || !confirm("更改未提交，点击确定将放弃更改")) {
            // jump("-1");
            window.location.href = "/gateway";
        }
    }

    function reload() {
        deactivateTest();
        if (!changed || confirm("更改未提交，点击确定将放弃更改")) {
            require();
        }
    }

    function cancel() {
        deactivateTest();
        if (current_net_mode == NET_MODE_WIFI) {
            if (wifiname != "") {
                $("#wifiname").val(wifiname);
                $("#wifipassword").val(wifipassword);
                changed = false;
                $("span#hint").text("撤销成功");
                if (ishidden == "1") {
                    $("#ishidden").addClass("checked");
                }
                else {
                    $("#ishidden").removeClass("checked");
                }
                // $("#ishidden").attr("checked",ishidden=="1"?true:false)
            }
            else {
                $("span#hint").text("撤销失败");
            }
        }
        else if (current_net_mode == NET_MODE_MOBILE3G) {
        }
        else {
            $("span#hint").text("数据出错，请使用浏览器刷新本页面");
        }
    }

    function post() {
        deactivateTest();
        if (current_net_mode == NET_MODE_WIFI) {
            post_wifi();
        }
        else if (current_net_mode == NET_MODE_MOBILE3G) {
            post_mobile3g();
        }
        else {
            $("span#hint").text("数据出错，请使用浏览器刷新本页面");
        }
    }

    function post_wifi() {
        post_wifiname = $("#wifiname").val();
        post_wifipassword = $("#wifipassword").val();
        post_ishidden = $("#ishidden").hasClass("checked") ? "1" : "0";
        if (post_wifiname == "") {
            $("span#hint").text("wifi名称输入框不能为空！");
            return;
        }
        $("span#hint").text("正在提交...");
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "method": "p",
                "mode": NET_MODE_WIFI,
                "wifiname": post_wifiname,
                "wifipassword": post_wifipassword,
                "ishidden": post_ishidden
            },
            success: function (data) {
                if (data.success) {
                    $("span#hint").text(data.success);
                    changed = false;
                    wifiname = post_wifiname;
                    wifipassword = post_wifipassword;
                    ishidden = post_ishidden;
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

    function post_mobile3g() {

    }

    function test() {
        if (runtest) {
            deactivateTest();
        }
        else {
            activateTest();
        }
    }


    function activateTest() {
        $("#test").html("取消测试");
        runtest = true;
        if (testfunction != null) {
            window.clearInterval(testfunction);
        }
        if (current_net_mode == NET_MODE_WIFI) {
            $("span#hint").html("正在测试Wifi，每5秒刷新一次结果：<br>");
            testfunction = window.setInterval(testWifi, 5000);
        }
        else if (current_net_mode == NET_MODE_MOBILE3G) {
            console.log("test mobile3g")
        }
        else {
            $("span#hint").text("数据出错，请使用浏览器刷新本页面");
        }
    }


    function next() {
        deactivateTest();
        if (changed == false || !confirm("更改未提交，点击确定将放弃更改")) {
            // jump("1");
            window.location.href = "/vpn";
        }
    }

    function switch_net_mode_view(mode) {
        if (mode == NET_MODE_WIFI) {
            mode_wifi_view();
            current_net_mode = mode;
        }
        else if (mode == NET_MODE_MOBILE3G) {
            mode_moblie3g_view();
            current_net_mode = mode;
        }
        else {
            $("span#hint").text("选择出错！");
        }
    }

    function mode_wifi_view() {
        $(".mobile3g").hide();
        $(".wifi").show();
    }

    function mode_moblie3g_view() {
        $(".wifi").hide();
        $(".mobile3g").show();
    }

    function jump(direction) {
        if (direction == "1") {
            window.location.href = "/vpn";
        }
        else if (direction == "-1") {
            window.location.href = "/gateway";
        }
        else {
            $("span#hint").text("跳转失败");
        }
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
                    current_net_mode = data.netmode;
                    switch_net_mode_view(current_net_mode);
                    if (current_net_mode == NET_MODE_WIFI) {
                        $("#wifiname").val(data.wifiname);
                        $("#wifipassword").val(data.wifipassword);
                        // $("#ishidden").attr("checked",data.ishidden=="1"?true:false);
                        if (ishidden == "1") {
                            $("#ishidden").addClass("checked");
                        }
                        else {
                            $("#ishidden").removeClass("checked");
                        }
                        wifiname = data.wifiname;
                        wifipassword = data.wifipassword;
                        ishidden = data.ishidden;
                        switch_net_mode_view(current_net_mode);
                    }
                    else if (current_net_mode == NET_MODE_MOBILE3G) {

                    }
                    else {
                        $("span#hint").text("服务器返回数据出错。");
                    }
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

    $("#wifi").click(function () {
        if ($(this).hasClass("checked")) {
            switch_net_mode_view(NET_MODE_WIFI);
        }
    });

    $("#mobile3g").click(function () {
        if ($(this).hasClass("checked")) {
            switch_net_mode_view(NET_MODE_MOBILE3G);
        }
    });

    function loaddefaultview() {
        switch_net_mode_view(current_net_mode);
    }

    loaddefaultview();

    require();

    deactivateTest();

    // $("#ishidden").addClass("disabled");
});