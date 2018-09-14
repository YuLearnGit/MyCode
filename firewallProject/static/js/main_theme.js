/**
 * Created by ZJ on 2017-08-21.
 */
$(document).ready(function () {
    function applyTheme() {

        $(".header_div").css("border-bottom-color", hexToRgba(theme.split_line_color, 0.5));

        $(".one_menu_div").css({
            "border-right-color": hexToRgba(theme.split_line_color, 0.9),
            "border-bottom-color": hexToRgba(theme.split_line_color, 0.9)
        });

        $(".two_menu_div").css({
            "border-right-color": hexToRgba(theme.split_line_color, 0.9),
            "border-top-color": hexToRgba(theme.split_line_color, 0.9)
        });

        $(".menu_wire").css("background-color", theme.prefer_white_color);
        $(".menu_btn").css("border-color", hexToRgba(theme.prefer_white_color, 0.4));

        $(".little_triangle_div").css("border-left-color", theme.prefer_white_color);

        if (parseInt("0x" + theme.background_color.slice(1, 3)) > 200)
        {
            $(".two_menu_text_div").addClass("black_case");

        }
        else
        {
            $(".two_menu_text_div").removeClass("black_case");
        }
    }

    $(document).on("mouseover mouseout mousedown mouseup", ".menu_btn", function (event) {
        if (event.type == "mouseover") {
            //鼠标悬浮
            $(this).css("border-color", hexToRgba(theme.prefer_white_color, 0.8))
        } else if (event.type == "mouseout") {
            //鼠标离开
            $(this).css("border-color", hexToRgba(theme.prefer_white_color, 0.4));
        } else if (event.type == "mousedown") {
            $(this).find(".menu_wire").css("background-color", hexToRgba(theme.prefer_white_color, 0.5));
        } else if (event.type == "mouseup") {
            $(this).find(".menu_wire").css("background-color", theme.prefer_white_color);
        }
    });

    $(document).on("mouseover mouseout mousedown mouseup", ".logout_div", function (event) {
        if (event.type == "mouseover") {
            //鼠标悬浮
            $(this).css("background-color", hexToRgba(theme.hover_background_color, 0.8))
        } else if (event.type == "mouseout") {
            //鼠标离开
            $(this).css("background-color", theme.background_color);
        } else if (event.type == "mousedown") {
            $(this).css("background-color", hexToRgba(theme.hover_background_color, 0.5));
        } else if (event.type == "mouseup") {
            $(this).css("background-color", theme.background_color);
        }
    });

    applyTheme();
});