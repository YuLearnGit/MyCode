/**
 * Created by ZJ on 2017-08-21.
 */
//延时响应
function DelayResponse(delayFun,timeDelay) {
    var oneTimeout = null;
    var timeoutFun = function() {
        if (oneTimeout != null) {
            oneTimeout = null;
        }
        if (delayFun != null) {
            delayFun();
        }
    };

    this.run = function () {
        // console.log("check");
        // this.delayFun = delayFun;
        if (oneTimeout == null) {
            oneTimeout = setTimeout(timeoutFun, timeDelay);
        }
    }
}

/**
 * small_menu_status:小菜单样式标记
 * small_screen_status:小屏幕时标记
 * mobile_menu_status:更小的移动屏幕标记
 * 两者结合用于判断在自动响应时，点击切换按钮后样式不符自动响应样式时，不进行自动响应
 * 例如：小屏幕时，点击切换按钮为大菜单样式后，此时改变屏幕大小不会变为小菜单样式，只有等屏幕变大之后，才依据屏幕大小切换样式。
 * @returns true or false
 */
function isSmallMenuStatus() {
    return $("#menu_btn").hasClass("small_menu_status");
}

function setSmallMenuStatus(TrueOrNot) {
    if (TrueOrNot) {
        $("#menu_btn").addClass("small_menu_status");
    }
    else {
        $("#menu_btn").removeClass("small_menu_status");
    }
}
function isMobileMenuStatus() {
    return $("#menu_btn").hasClass("mobile_menu_status");
}

function setMobileMenuStatus(TrueOrNot) {
    if (TrueOrNot) {
        $("#menu_btn").addClass("mobile_menu_status");
    }
    else {
        $("#menu_btn").removeClass("mobile_menu_status");
    }
}

function isSmallScreenStatus() {
    return $("#menu_btn").hasClass("small_screen_status");
}

function setSmallScreenStatus(TrueOrNot) {
    if (TrueOrNot) {
        $("#menu_btn").addClass("small_screen_status");
    }
    else {
        $("#menu_btn").removeClass("small_screen_status");
    }
}

/**
 * 移动屏幕样式
 */
function switchToMobileMenu() {
    $("#right_layout").animate({"margin-left": '0'}, "slow");
    $("#left_layout").animate({"width": '0'}, "slow",function (){
        if (isMobileMenuStatus())
        {
            $(this).css({"width":"200px","display":"none","position":"absolute"});
        }
    });
    $(".small_menu_div").show()
        .removeClass("theme_hover_background_color")
        .css({
            "position": "relative",
            // "border-top": "none",
            // "padding-left":"0px",
            "top": "0px",
            "background": "transparent",
            "border-bottom": "none"
        });
    $(".two_menu_ul").removeClass("show")
        .css({
            // "position": "relative",
            // "padding-left":"0px",
            "top": "0px",
            "left": "0px",
            "width": "200px"
            // "border-bottom-width":"0px",

        }).hide();
    $(".two_menu_div").css({
        "border-top-width": "1px",
        "border-top-style": "solid",
        "border-top-color": hexToRgba(theme.split_line_color, 0.5)
    });
    $(".one_menu_text_div").css({
        "border-top-style": "none",
        "border-right-style": "none"
    });
    // console.log($("#left_layout").css("width"));

}

/**
 * 小菜单时样式
 */
function switchToSmallMenu() {
    $("#right_layout").animate({"margin-left": '50px'}, "slow");
    // $(".small_menu_div").animate({"display":'50px'});
    if (isMobileMenuStatus()) {
        if ($("#left_layout").css("display") == "none"){
            $("#left_layout").css("width","0");
        }
    }
    $("#left_layout").show().animate({"width": '50px',"position":"relative"}, "slow", function () {
        if (!isSmallMenuStatus()) {
            //去除快速点击“切换菜单”按钮时，会出现small_menu_div隐藏的bug
            return;
        }
        $(".small_menu_div").hide()
            .addClass("theme_hover_background_color")
            .css({
                "position": "absolute",
                // "border-top": "1px solid #0c0c0c",
                // "padding-left":"10px",
                "top": "0px",
                "background-color": theme.background_color,
                "border-bottom-width": "1px",
                "border-bottom-style": "solid",
                "border-bottom-color": theme.split_line_color
            });

        $(".two_menu_ul").hide()
            .removeClass("show")
            .css({
                // "position": "relative",
                // "padding-left":"10px",
                "top": "0px",
                "left": "50px",
                "width": "151px"
            });
        $(".two_menu_div").css({
            "border-top-width": "1px",
            "border-top-style": "solid",
            "border-top-color": theme.split_line_color
        });
        $(".one_menu_text_div").css({
            "border-top-width": "1px",
            "border-top-style": "solid",
            "border-top-color": theme.split_line_color,
            "border-right-width": "1px",
            "border-right-style": "solid",
            "border-right-color": theme.split_line_color
        });
    });
    clearTwoMenu();
}

/**
 * 大菜单时样式
 */
function switchToBigMenu() {
    $(".small_menu_div").show()
        .removeClass("theme_hover_background_color")
        .css({
            "position": "relative",
            // "border-top": "none",
            // "padding-left":"0px",
            "top": "0px",
            "background": "transparent",
            "border-bottom": "none"
        });
    $(".two_menu_ul").removeClass("show")
        .css({
            // "position": "relative",
            // "padding-left":"0px",
            "top": "0px",
            "left": "0px",
            "width": "200px"
            // "border-bottom-width":"0px",

        }).hide();
    $(".two_menu_div").css({
        "border-top-width": "1px",
        "border-top-style": "solid",
        "border-top-color": hexToRgba(theme.split_line_color, 0.5)
    });
    $(".one_menu_text_div").css({
        "border-top-style": "none",
        "border-right-style": "none"
    });
    // console.log($("#left_layout").css("width"));
    if (isMobileMenuStatus()) {
        $("#left_layout").css("width", "0").show();
    }
    $("#right_layout").animate({"margin-left": '200px'}, "slow");
    $("#left_layout").show().animate({"width": '200px'}, "slow");
}


/**
 * 调整屏幕宽度时，自动设置菜单样式
 */
function setMenuLayout() {
    var browser_width = $(window).width();
    // console.log(window_width);
    if (browser_width <= 400) {
        switchToMobileMenu();
        setSmallScreenStatus(false);
        setSmallMenuStatus(false);
        setMobileMenuStatus(true);
    }
    else if (browser_width <= 800) {
        if (isMobileMenuStatus()) {
            switchToSmallMenu();
            setSmallMenuStatus(true);
            setSmallScreenStatus(true);
        }
        else if (!isSmallScreenStatus()) {
            if (!isSmallMenuStatus()) {
                switchToSmallMenu();
                setSmallMenuStatus(true);
            }
            setSmallScreenStatus(true);
        }
        setMobileMenuStatus(false);
    }

    else {
        if (isMobileMenuStatus()) {
            switchToBigMenu();
            setSmallScreenStatus(false);
            setSmallMenuStatus(false);
        }
        else if (isSmallScreenStatus()) {
            if (isSmallMenuStatus()) {
                switchToBigMenu();
                setSmallMenuStatus(false);
            }
            setSmallScreenStatus(false);
        }
        setMobileMenuStatus(false);
    }
}

function test() {
    console.log("not changed");
}
var resizeResponse = new DelayResponse(setMenuLayout,500);

/**
 * 启动时，通过判断屏幕大小，自动采用相应菜单布局
 */
function setMenuLayoutOnLoad() {
    var browser_width = $(window).width();
    // console.log(browser_width);
    if (browser_width <= 400) {
        switchToMobileMenu();
        setSmallMenuStatus(false);
        setSmallScreenStatus(false);
        setMobileMenuStatus(true);
    }
    else if (browser_width <= 800) {
        switchToSmallMenu();
        setMobileMenuStatus(false);
        setSmallMenuStatus(true);
        setSmallScreenStatus(true);
    }
    else {
        $("#left_layout").css("width", "200px");//去除left_layout从右侧非常远的位置缩回200px位置处的bug
        switchToBigMenu();
        setMobileMenuStatus(false);
        setSmallMenuStatus(false);
        setSmallScreenStatus(false);
    }
}

function clearTwoMenu() {
    //隐藏所有二级菜单
    $(".two_menu_ul").removeClass("show").slideUp(200);
    $(".little_triangle_div").animate({rotate: 0}, 200);
}

function hideTwoMenu(little_triangle_div, two_menu_ul) {
    $(little_triangle_div).animate({rotate: 0}, 10);
    $(two_menu_ul).removeClass("show").hide()
}

function slideDownTwoMenu(little_triangle_div, two_menu_ul) {
    $(little_triangle_div).animate({rotate: 90}, 200);
    $(two_menu_ul).addClass("show").slideDown(200);
}


$(document).ready(function () {
    $(window).resize(function () {
        resizeResponse.run();
        // setMenuLayout();
    });

    $("#menu_btn").click(function () {
        if (isSmallMenuStatus()) {
            switchToBigMenu();
            setSmallMenuStatus(false);
        }
        else if (isMobileMenuStatus()) {
            $("#left_layout").slideToggle();
        }
        else {
            switchToSmallMenu();
            setSmallMenuStatus(true);
        }
    });
    /**
     * 实现小菜单时的浮动显示效果
     */
    $("div.one_menu_div").hover(function () {
        if (isSmallMenuStatus()) {
            var abY = $(this).offset().top;
            var small_menu_div = $(this).find(".small_menu_div").first();
            small_menu_div.css({
                // "position":"absolute",
                "top": abY - 51
            }).show();
            var one_menu = $(this).parent();
            if (one_menu.hasClass("has_sub")) {
                var two_menu_ul = $(one_menu).find(".two_menu_ul").first();
                // $(two_menu_ul).css({
                //     "top":abY + 1
                // });
                if (!$(two_menu_ul).hasClass("show")) {
                    var little_triangle_div = $(small_menu_div).find(".little_triangle_div").first();
                    slideDownTwoMenu(little_triangle_div, two_menu_ul);
                }
            }
        }
    }, function () {
        if (isSmallMenuStatus()) {
            $(".small_menu_div").hide();
            var one_menu = $(this).parent();
            if (one_menu.hasClass("has_sub")) {
                var two_menu_ul = $(one_menu).find(".two_menu_ul").first();
                var little_triangle_div = $(one_menu).find(".little_triangle_div").first();
                hideTwoMenu(little_triangle_div, two_menu_ul);
            }
        }
    });

    setTimeout(setMenuLayoutOnLoad, 20);

    // //一级菜单点击事件
    // $(".one_menu_click").click(function () {
    //     console.log("click?");
    // });
});
