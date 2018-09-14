var vpnserverip = "", vpnusername = "", vpnpassword = "";
var changed = false;
var local_url = window.location.href;
var testfunction;
var runtest = false;
var onetestrun = false;
var testCount = 0;

function testVPN() {
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
            "method": "t"
        },
        success: function (data) {
            onetestrun = false;
            if (data.success) {
                var ipmsg = "IP：" + data.ip + "<br>广播：" + data.broadcast + "<br>掩码：" + data.mask + "<br>";
                $("span#hint").html(org + "第" + testCount + "次测试结果：" + data.success + "<br>" + ipmsg);
                //$("span#hint").html(org + "第" + testCount + "次测试结果：" + data.success + "<br>" + ipmsg);
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
        $("button#test").html("测试");
        runtest = false;
        testfunction = null;
        testCount = 0;
    }
}


$(document).ready(function () {
    $("button#back").click(function () {
        back();
    });

    $("button#reload").click(function () {
        reload();
    });

    $("button#cancel").click(function () {
        cancel();
    });

    $("button#post").click(function () {
        post();
    });

    $("#connect").click(function () {
        connect();
    });

    $("#disconnect").click(function () {
        disconnect();
    });

    $("button#test").click(function () {
        test();
    });

    $("button#next").click(function () {
        next();
    });

    function back() {
        deactivateTest();
        if (changed == false || !confirm("更改未提交，点击确定将放弃更改")) {
            // jump("-1");
            window.location.href = "/netPattern";
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
        if (vpnserverip != "" && vpnusername != "" && vpnpassword != "") {
            $("#vpnserverip").val(wifiname);
            $("#vpnusername").val(wifipassword);
            $("#vpnpassword").val(vpnpassword);
            changed = false;
            $("span#hint").text("撤销成功");
        }
        else {
            $("span#hint").text("撤销失败");
        }
    }

    function post() {
        deactivateTest();
        post_vpn();
    }

    function post_vpn() {
        post_vpnserverip = $("#vpnserverip").val();
        post_vpnusername = $("#vpnusername").val();
        post_vpnpassword = $("#vpnpassword").val();
        if (post_vpnserverip == "") {
            $("span#hint").text("服务器IP输入框不能为空！");
            return;
        }
        if (post_vpnusername == "") {
            $("span#hint").text("用户名输入框不能为空！");
            return;
        }
        if (post_vpnpassword == "") {
            $("span#hint").text("密码输入框不能为空！");
            return;
        }
        $("span#hint").text("正在提交...");
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "method": "p",
                "vpnserverip": post_vpnserverip,
                "vpnusername": post_vpnusername,
                "vpnpassword": post_vpnpassword
            },
            success: function (data) {
                if (data.success) {
                    $("span#hint").text(data.success);
                    changed = false;
                    vpnserverip = post_vpnserverip;
                    vpnusername = post_vpnusername;
                    vpnpassword = post_vpnpassword;
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

    function connect() {
        $("span#hint").text("正在尝试连接...");
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "method": "c"
            },
            success: function (data) {
                if (data.success) {
                    $("span#hint").text(data.success);
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

    function disconnect() {
        $("span#hint").text("正在尝试断开连接...");
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "method": "d"
            },
            success: function (data) {
                if (data.success) {
                    $("span#hint").text(data.success);
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

    function test() {
        if (runtest) {
            deactivateTest();
        }
        else {
            activateTest();
        }
    }

    function activateTest() {
        $("button#test").html("取消测试");
        runtest = true;
        if (testfunction != null) {
            window.clearInterval(testfunction);
        }
        $("span#hint").html("正在测试VPN，每5秒刷新一次结果：<br>");
        testfunction = window.setInterval("testVPN()", 5000);
    }

    function next() {
        deactivateTest();
        if (changed == false || !confirm("更改未提交，点击确定将放弃更改")) {
            // jump("1");
            window.location.href = "/network4";
        }
    }

    function jump(direction) {
        if (direction == "1") {
            window.location.href = "/network4";
        }
        else if (direction == "-1") {
            window.location.href = "/netPattern";
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
                    $("#vpnserverip").val(data.vpnserverip);
                    $("#vpnusername").val(data.vpnusername);
                    $("#vpnpassword").val(data.vpnpassword);
                    vpnserverip = data.vpnserverip;
                    vpnusername = data.vpnusername;
                    vpnpassword = data.vpnpassword;
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
                var error = "请求错误，错误码：" + e.status
                alert(error);
                $("span#hint").text(error);
            }
        });
    }

    function loaddefaultview() {
        return;
    }

    loaddefaultview();

    require();

    deactivateTest();


});