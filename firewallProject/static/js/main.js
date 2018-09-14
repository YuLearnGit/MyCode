/**
 * Created by ZJ on 2017-07-10.
 */
var local_url = window.location.href;
function loadIframe(url) {
    $("iframe#frame_box").attr('src', url);
}
function delayLoadIframe(id) {
    //设置延时，解决一级菜单加载时，二级菜单缩回变卡的bug
    sessionStorage.page = id;
    if (isMobileMenuStatus())
    {
        $("#left_layout").slideUp();
    }
    var fun = "loadIframe('/" + id + "');";
    setTimeout(fun, 200);
}

$(document).ready(function () {

    /**
     * 点击事件，一级菜单响应（含有二级菜单的一级菜单不会进入此函数进行响应）
     * @param id 一级菜单中span标签的id
     */
    function loadOneMenu(id) {
        // console.log("oneMenuClick:" + String(id));
        // loadIframe("/"+String(id));
        delayLoadIframe(id);
    }

    /**
     * 点击事件，二级菜单响应
     * @param id 二级菜单中span标签的id
     */
    function loadTwoMenu(id) {
        // console.log("twoMenuClick:" + String(id));
        // loadIframe("/"+String(id));
        delayLoadIframe(id);
    }

    /**
     * 退出登录
     */
    function logout() {
        $.ajax({
            type: "POST",
            url: "/logout",
            data: {},
            success: function (data) {
                if (data.login) {
                    window.location.href = data.login;
                    sessionStorage.page = "welcome";
                }
                else {
                    console.log(data);
                    alert(data);
                }
            },
            error: function (e) {
                var error = "请求错误，错误码：" + e.status;
                alert(error);
                //$("span#hint").text(error);
            }
        });
    }

    /**
     * 页面刷新
     */
    function flush() {
        window.location.reload();
    }

    function onOneMenuClicked(e) {
        var one_menu = $(e).parents().filter(".one_menu").first();
        if ($(one_menu).hasClass("has_sub")) {
            // console.log("不响应");
            /**
             * 实现大菜单时候点击一级菜单展开二级菜单效果
             */
            if (isSmallMenuStatus()) {
                return;
            }
            var two_menu_ul = $(one_menu).find(".two_menu_ul").first();

            if ($(two_menu_ul).hasClass("show")) {
                clearTwoMenu();
            }
            else {
                clearTwoMenu();
                var little_triangle_div = $(one_menu).find(".little_triangle_div").first();
                slideDownTwoMenu(little_triangle_div, two_menu_ul);
            }
        }
        else {
            clearTwoMenu();
            //获取包含文本的span标签
            var one_menu_text = $(one_menu).find(".one_menu_text").first();
            //获取span标签的id
            var id = $(one_menu_text).attr("id");
            loadOneMenu(id);
        }
    }

    function onTwoMenuClicked(e) {
        //获取包含文本的span标签
        var two_menu_text = $(e).find(".two_menu_text").first();
        //获取span标签的id
        var id = $(two_menu_text).attr("id");
        loadTwoMenu(id);
    }

    //一级菜单点击事件
    $(".one_menu_click").click(function () {
        onOneMenuClicked(this);
    });

    //二级菜单点击事件
    $(".two_menu_click").click(function () {
        onTwoMenuClicked(this);
    });

    //点击Logo图标
    $("#logo_img").click(function () {
        flush();
        sessionStorage.page = "welcome";
    });

    //点击退出登录图标
    $("#logout").click(function () {
        logout();
    });

    if (sessionStorage.page) {
        delayLoadIframe(sessionStorage.page);
    }
    else {
        delayLoadIframe("welcome");
    }

});