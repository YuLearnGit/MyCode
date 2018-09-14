function setMyCheckboxChecked(id) {
    var selector = "#" + id;
    $(selector).addClass("checked");
}

function setMyCheckboxUnchecked(id) {
    var selector = "#" + id;
    $(selector).removeClass("checked");
}

$(document).ready(function () {
    function myCheckboxClicked(clickedEle) {
        if ($(clickedEle).hasClass("checked")) {
            $(clickedEle).removeClass("checked");
        }
        else {
            $(clickedEle).addClass("checked");
        }
    }

    function myCheckboxLabelClicked(clickedLabelEle) {
        var forId = $(clickedLabelEle).attr("for");
        if (typeof(forId) == "undefined") {
            console.log("You did not set the 'label' attribute 'for' ");
            return;
        }
        var selector = "#" + forId;
        if ($(selector).length != 1) {
            console.log("Cannot find the id='" + forId + "' element from 'label' or found so much");
            return;
        }
        $(selector).trigger("click");
    }

    $(".my_checkbox_label").click(function () {
        myCheckboxLabelClicked(this);
    });


    $(".my_checkbox").click(function () {
        myCheckboxClicked(this);
    });

});