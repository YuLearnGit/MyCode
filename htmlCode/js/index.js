function changeImage() {
    var element = document.getElementById('myimage');
    if (element.src.match("jie")) {
        element.src = "/img/ren.jpg";
    }
    else {
        element.src = "/img/jie.png";
    }
}
