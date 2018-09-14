/**
 * Created by ZJ on 2017-07-12.
 */
$(document).ready(function () {
    function baiduSearch(wd) {
        var url = "https://www.baidu.com/s?wd=" + wd;
        window.open(url);
    }

    function toMain() {
        $("#to_main").click(function () {
            if (top.location == self.location) {
                window.location.href = "/";
            }
            else {
                window.parent.document.location.reload();
            }
        });
    }

    function toBack(){
        window.history.back();
    }

    $("#to_back").click(function () {
        toBack();
    });

    $("#to_main").click(function () {
        toMain();
    });

    $("#baidu_search").click(function () {
        var error_code = $(".error_code").text();
        // console.log(error_code);
        baiduSearch("HTTP error " + error_code);
    });
});

