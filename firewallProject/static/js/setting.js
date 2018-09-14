/**
 * Created by ZJ on 2017-08-14.
 */
var local_url = window.location.href;
$(document).ready(function () {


    function settingButtonClicked(ele) {
        var setting_div = $(ele).parents().filter(".setting_div").first();
        var setting_button_text = $(setting_div).find(".setting_button_text").first();
        var setting_id = $(setting_button_text).attr("id");
        var little_triangle_div = $(setting_div).find(".little_triangle_div").first();
        var setting_box = $(setting_div).find(".setting_box").first();

        if ($(ele).hasClass("opened")) {
            $(little_triangle_div).animate({rotate: 0}, 200);
            $(ele).removeClass("opened");
            $(setting_box).slideUp(200);
        }
        else {
            $(little_triangle_div).animate({rotate: 90}, 200);
            $(ele).addClass("opened");
            $(setting_box).slideDown(200);
        }

    }


    $(".theme_setting_button").click(function () {
        settingButtonClicked(this)
    });


    // $(".setting_box").hide();


    var backgroundColorMinicolorSetting = {
        change: function (value, opacity) {
            $(".theme_background_color").css("background-color", value);
        }
    };

    var hoverBackgroundColorMinicolorSettings = {
        change: function (value, opacity) {
            $(document).on("mouseover mouseout", ".theme_hover_background_color", function (event) {
                if (event.type == "mouseover") {
                    $(this).css("background-color", value)
                } else if (event.type == "mouseout") {
                    $(this).css("background-color", $("input#choose_background_color").val());
                }
            });
        }
    };

    var splitLineColorMinicolorSettings = {
        change: function (value, opacity) {
            $(".theme_split_line_color").css("background-color", value);
        }
    };

    var fontColorMinicolorSettings = {
        change: function (value, opacity) {
            $(".theme_font_color").css("color", value);
        }
    };


    $("#theme_confirm_button").click(function () {
        var theme_object = {
            background_color: $("input#choose_background_color").val(),
            hover_background_color: $("input#choose_hover_background_color").val(),
            font_color: $("input#choose_font_color").val(),
            font: $("#font_select").find("option:selected").first().text(),
            split_line_color: $("#choose_split_line_color").val()
        };

        saveThemeSettingToLocalStorage(theme_object);
        saveThemeSettingToServer(theme_object);
    });

    function saveThemeSettingToServer(theme_object) {
        createAjax(local_url, {
            "method": "t",
            "background_color": theme_object.background_color,
            "hover_background_color": theme_object.hover_background_color,
            "font_color": theme_object.font_color,
            "font": theme_object.font,
            "split_line_color": theme_object.split_line_color
        }, function (data) {
            alert("已保存至服务器，点击确定将重新载入页面并应用新主题");
            window.parent.location.reload();
        }, function (data) {
            alert("保存至服务器失败。");
        });
    }

    function init_view() {
        $("input#choose_background_color").minicolors(backgroundColorMinicolorSetting);
        $("input#choose_hover_background_color").minicolors(hoverBackgroundColorMinicolorSettings);
        $("input#choose_font_color").minicolors(fontColorMinicolorSettings);
        $("input#choose_split_line_color").minicolors(splitLineColorMinicolorSettings);
    }

    init_view();

    function loadStorageThemeSetting() {
        var theme_object = loadThemeStorage();
        setPreviewTheme(theme_object)
        // $(".theme_background_color").css("background-color", theme.background_color);
        // backgroundColorMinicolorSetting.defaultValue = theme.background_color;
        //
        // // $("#choose_hover_background_color").val(theme.hover_background_color);
        // hoverBackgroundColorMinicolorSettings.defaultValue = theme.hover_background_color;
        // //
        //
        // $(".theme_font_color").css("color", theme.font_color);
        // fontColorMinicolorSettings.defaultValue = theme.font_color;
        //
        // $("#font_select").val(theme.font);
        // $(".theme_font").css("font-family", getFontFamily(theme.font));
        //
        // // $("#choose_split_line_color").val(theme.split_line_color);
        // $(".theme_split_line_color").css("background-color", theme.split_line_color);
        // splitLineColorMinicolorSettings.defaultValue = theme.split_line_color;


    }

    loadStorageThemeSetting();

    $("#font_select").change(function () {
        console.log($(this).find("option:selected").first().text());
        var font_name = $(this).find("option:selected").first().text();
        $(".theme_font").css("font-family", getFontFamily(font_name));
    });


    $(document).on("mouseover mouseout", ".theme_hover_background_color", function (event) {
        if (event.type == "mouseover") {
            //鼠标悬浮
            $(this).css("background-color", $("#choose_hover_background_color").val())
        } else if (event.type == "mouseout") {
            //鼠标离开
            $(this).css("background-color", $("#choose_background_color").val());
        }
    });

    /*
     * 主题示例
     */
    var theme_example = {
        "default_theme_example": {
            background_color: "#232323",
            hover_background_color: "#5e5e5e",
            font_color: "#ffffff",
            font: "幼圆",
            split_line_color: "#7a7a7a",
            prefer_white_color: "#ffffff"
        },
        "black_theme_example": {
            background_color: "#010d0c",
            hover_background_color: "#2a3738",
            font_color: "#42ffff",
            font: "仿宋",
            split_line_color: "#756464",
            prefer_white_color: "#ffffff"
        },
        "blue_black_theme_example": {
            background_color: "#1c2b36",
            hover_background_color: "#1a1a1a",
            font_color: "#a7c6dc",
            font: "微软雅黑",
            split_line_color: "#1a1a1a",
            prefer_white_color: "#ffffff"
        },
        "gray_theme_example": {
            background_color: "#5e6568",
            hover_background_color: "#3b3333",
            font_color: "#ffffff",
            font: "Consolas",
            split_line_color: "#4d4444",
            prefer_white_color: "#ffffff"
        }
    };

    /*
     * 加载时，将主题示例应用到相应div上
     */
    $(".theme_example").each(function () {
        var theme_example_id = $(this).attr("id");
        var theme_example_object = theme_example[theme_example_id];
        if (!theme_example_object || typeof(theme_example_object) == "undefined") {
            return;
        }
        setThemeExample(this, theme_example_object);
    });

    /*
     * 将主题应用到div上
     */
    function setThemeExample(theme_ele, theme_object) {
        $(theme_ele).css({
            "background-color": theme_object.background_color,
            "font-family": getFontFamily(theme_object.font),
            "color": theme_object.font_color
        });
        $(theme_ele).hover(function () {
            $(theme_ele).css("background-color", theme_object.hover_background_color);
        }, function () {
            $(theme_ele).css("background-color", theme_object.background_color);
        });
    }

    function setPreviewTheme(theme_object) {
        $(".theme_background_color").css("background-color", theme_object.background_color);
        $(".theme_split_line_color").css("background-color", theme_object.split_line_color);
        $(".theme_font_color").css("color", theme_object.font_color);
        $(".theme_font").css("font-family", getFontFamily(theme_object.font));

        $("#choose_background_color").minicolors("value", {
            color: theme_object.background_color
        });
        $("#choose_hover_background_color").minicolors("value", {
            color: theme_object.hover_background_color
        });
        $("#choose_font_color").minicolors("value", {
            color: theme_object.font_color
        });
        $("#choose_split_line_color").minicolors("value", {
            color: theme_object.split_line_color
        });
        $("#font_select").val(theme_object.font);
    }

    $(".theme_example").click(function () {
        var theme_example_id = $(this).attr("id");
        var theme_example_object = theme_example[theme_example_id];
        if (!theme_example_object || typeof(theme_example_object) == "undefined") {
            return;
        }
        setPreviewTheme(theme_example_object)
    });

    function requireSetting() {
        createAjax(local_url, {
            "method": "r"
        }, function (data) {
            var themeSetting = data.success.theme;
            if (typeof(themeSetting) != "undefined") {
                var saved_theme = $("#saved_theme");
                $(saved_theme).css("display", "block");
                theme_example["saved_theme"] = themeSetting;
                setThemeExample(saved_theme, themeSetting);
            }
        });
    }

    requireSetting();

});