/**
 * Created by ZJ on 2017-08-15.
 */

var theme = {
    background_color: "#2c2c2c",
    hover_background_color: "#5e5e5e",
    font_color: "#ffffff",
    font: "幼圆",
    split_line_color: "#7a7a7a",
    prefer_white_color: "#ffffff"
};

function loadThemeStorage() {
    if (localStorage.theme) {
        theme = JSON.parse(localStorage.theme);
    }
    return theme;
}


function saveThemeSettingToLocalStorage(theme_object) {
    theme = theme_object;
    var backgroundColorRed = parseInt("0x" + theme_object.background_color.slice(1, 3));
    var backgroundColorGreen = parseInt("0x" + theme_object.background_color.slice(3, 5));
    var backgroundColorBlue = parseInt("0x" + theme_object.background_color.slice(5, 7));
    if (backgroundColorRed > 200 && backgroundColorGreen > 200 && backgroundColorBlue > 200) {
        theme.prefer_white_color = "#000000"
    }
    else {
        theme.prefer_white_color = "#ffffff"
    }

    localStorage.theme = JSON.stringify(theme);
}

loadThemeStorage();

$(document).ready(function () {

    function setTheme() {
        $(".theme_background_color").css("background-color", theme.background_color);
        $(document).on("mouseover mouseout", ".theme_hover_background_color", function (event) {
            if (event.type == "mouseover") {
                //鼠标悬浮
                $(this).css("background-color", theme.hover_background_color)
            } else if (event.type == "mouseout") {
                //鼠标离开
                $(this).css("background-color", theme.background_color);
            }
        });
        $(".theme_font_color").css("color", theme.font_color);
        $(".theme_split_line_color").css("background-color", theme.split_line_color);
        $(".theme_font").css("font-family", getFontFamily(theme.font));
    }

    setTheme();
});

function hexToRgba(hexColor, alpha) {
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + hexColor.slice(i, i + 2)));
    }
    return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
}

function getFontFamily(font_name) {
    return "'" + font_name + "', sans-serif, courier, monospace"
}