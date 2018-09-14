var local_url = window.location.href;
$(document).ready(function () {
    $("#save").click(function () {
        var oldUsername = $("#oldUsername").val();
        var newUsername1 = $("#newUsername1").val();
        var newUsername2 = $("#newUsername2").val();
        var oldPassword = $("#oldPassword").val();
        var newPassword1 = $("#newPassword1").val();
        var newPassword2 = $("#newPassword2").val();
        if (oldUsername == "") {
            $("#hint").text("请输入旧用户名");
            return;
        }
        if (oldPassword == "") {
            $("#hint").text("请输入旧密码");
            return;
        }
        if (newUsername1 == "" || newUsername2 == "") {
            $("#hint").text("请输入新用户名");
            return;
        }
        if (newUsername1 != newUsername2) {
            $("#hint").text("两次输入的新用户名不一致");
            return;
        }
        if (newPassword1 == "" || newPassword2 == "") {
            $("#hint").text("请输入新密码");
            return;
        }
        if (newPassword1 != newPassword2) {
            $("#hint").text("两次输入的新密码不一致");
            return;
        }
        if (oldPassword == newPassword1) {
            $("#hint").text("不允许新旧密码相同");
            return;
        }
        $("#hint").text("正在保存");
        $.ajax({
            type: "POST",
            url: local_url,
            data: {
                "oldUsername": oldUsername,
                "newUsername": newUsername1,
                "oldPassword": oldPassword,
                "newPassword": newPassword1
            },
            success: function (data) {
                if (data.error) {
                    $("span#hint").text(data.error);
                }
                else if (data.success) {
                    clean();
                    $("span#hint").text(data.success);
                }
                else if (data.href) {
                    if (top.location == self.location) {
                        window.location.href = data.href;
                    }
                    else {
                        window.parent.document.location.reload();
                    }
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
    });

    $("#newPassword1").keyup(function () {
        if ($("#newPassword2").val() != "") {
            $("#hint").text("");
            if ($("#newPassword1").val() != $("#newPassword2").val()) {
                $("#hint").text("两次输入的新密码不一致");
            }
        }
    });

    $("#newPassword2").keyup(function () {
        if ($("#newPassword1").val() != "") {
            $("#hint").text("");
            if ($("#newPassword1").val() != $("#newPassword2").val()) {
                $("#hint").text("两次输入的新密码不一致");
            }
        }
    });

    $("#newUsername1").keyup(function () {
        if ($("#newUsername2").val() != "") {
            $("#hint").text("");
            if ($("#newUsername1").val() != $("#newUsername2").val()) {
                $("#hint").text("两次输入的新用户名不一致");
            }
        }
    });

    $("#newUsername2").keyup(function () {
        if ($("#newUsername1").val() != "") {
            $("#hint").text("");
            if ($("#newUsername1").val() != $("#newUsername2").val()) {
                $("#hint").text("两次输入的新用户名不一致");
            }
        }
    });

    $("#clean").click(function () {
        clean();
    });

    function clean() {
        $("#oldUsername").val("");
        $("#newUsername1").val("");
        $("#newUsername2").val("");
        $("#oldPassword").val("");
        $("#newPassword1").val("");
        $("#newPassword2").val("");
        $("#hint").text("已清空");
    }

    // $(".my_button:last-child").addClass("disable");
});