/**
 * Created by ZJ on 2017-07-24.
 */
function createAjax(url,data,dataSuccessFun,dataErrorFun,otherFun) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
            if (data.success) {
                if (dataSuccessFun)
                {
                    dataSuccessFun(data);
                }
            }
            else if (data.error) {
                $("span#hint").text(data);
                if (dataErrorFun)
                {
                    dataErrorFun(data);
                }
            }
            else if (otherFun)
            {
                otherFun(data);
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
