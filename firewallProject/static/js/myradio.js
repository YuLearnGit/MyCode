function setMyRadioChecked(id) {
    var selector = "#" + id;
    $(selector).trigger("click");
}

$(document).ready(function () {
    function myRadioClicked(clickedEle) {
        var name = $(clickedEle).attr("name");
        if (typeof(name) == "undefined") {
            $(clickedEle).addClass("checked");
            return;
        }
        var selector = ".my_radio[name='" + name + "']";
        $(selector).removeClass("checked");
        $(clickedEle).addClass("checked");
    }

    function myRadioLabelClicked(clickedLabelEle) {
        var forId = $(clickedLabelEle).attr("for");
        if (typeof(forId) == "undefined") {
            console.log("You did not set the 'label' attribute 'for' ");
            return;
        }
        var selector = "#" + forId;
        if ($(selector).length != 1) {
            console.log("Cannot find the id='" + forId + "' from 'label' or found so much");
            return;
        }
        $(selector).trigger("click");
    }

    $(".my_radio").click(function () {
        myRadioClicked(this);
    });
    $(".my_radio_label").click(function () {
        myRadioLabelClicked(this);
    });
});