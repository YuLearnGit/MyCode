/**
 * Created by ZJ on 2017-08-25.
 */
var local_url = window.location.href;

window.onload = function () {
    var canvas = document.getElementById("my_canvas");
    var canvas_width = Math.max(1000, 500);
    var canvas_height = Math.max(500, 200);
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var context = canvas.getContext("2d");
    if (typeof(context) == "undefined" || !context) {
        alert("您的浏览器不支持HTML5元素，请更换浏览器以获得标准体验。");
        return;
    }

    // drawCloud(context);
    drawBlueSky(context, canvas_width, canvas_height);
    drawCloud(context)
};

function drawBlueSky(context, canvas_width, canvas_height) {
    var shy_width = canvas_width;
    var sky_height = canvas_height;
    var r_x = shy_width / 2;
    var r_y = sky_height;
    var r1 = Math.sqrt(r_x * r_x + r_y * r_y);
    context.beginPath();
    // var grd = context.createRadialGradient(r_x, r_y, 0, r_x, r_y, r1);
    var grd = context.createLinearGradient(0, sky_height, 0, 0);
    grd.addColorStop(0.0, "rgba(140,219,224,1)");
    grd.addColorStop(0.2, "rgba(76,182,209,1)");
    grd.addColorStop(0.5, "rgba(26,134,196,1)");
    grd.addColorStop(0.8, "rgba(12,93,184,1)");
    grd.addColorStop(1.0, "rgba(8,48,135,1)");
    context.fillStyle = grd;
    context.fillRect(0, 0, shy_width, sky_height);
    context.closePath();
}

function getDistance(x0, y0, x1, y1) {
    var x = Math.abs(x0 - x1);
    var y = Math.abs(y0 - y1);
    return Math.sqrt(x * x + y * y);
}

function drawCloud(context) {
    var maxWidth = 1000;
    var cx = 400;
    var cy = 400;
    var ch = 100;
    var cw = 200;

    var x0 = 300;
    var y0 = 300;
    var r0 = 50;
    var x1 = Math.floor((Math.random() * 0.5 + 1 ) * r0) + x0;
    var y1 = Math.floor(Math.random() * 20 - 10) + y0;
    var r1 = Math.floor((Math.random() * 0.5 + 0.8) * r0);
    //
    // console.log(x1);
    // console.log(y1);
    // console.log(r1);
    // context.beginPath();
    // context.arc(x0, y0, r0, 0, 360, false);
    // context.arc(x1, y1, r1, 0, 360, false);
    // context.closePath();
    // context.fillStyle = "rgba(255,255,255,1)";
    // // context.strokeStyle = "red";
    // // context.stroke();
    // context.fill();
    //
    // //
    // var number = Math.floor(Math.random() * 10 + 5);
    //
    // var points = [];
    //
    // for (var i = 0; i < 1; i++) {
    //     var x = Math.floor((Math.random() * 2.1 - 1.5 ) * r0) + x0;
    //     var y = Math.floor((Math.random() * 1.2 - 1 ) * r0) + y0;
    //     var d = getDistance(x0, y0, x, y);
    //     console.log("x:" + x);
    //     console.log("y:" + y);
    //     console.log("d:" + d);
    //     var r = 0;
    //     if (d >= r) {
    //         r = Math.abs(Math.floor(Math.random() * (1.7 * r - 1.2 * d) - 1.2 * r + 1.2 * d));
    //         console.log("rd:" + r);
    //     }
    //     else {
    //         r = Math.abs(Math.floor((Math.random() * 0.5 - 1) * d) + r0);
    //         console.log("r:" + r);
    //     }
    //     points.push({
    //         x: x,
    //         y: y,
    //         r: r
    //     });
    // }
    // // for (var i = 0; i < number/2; i++) {
    // //     var x = Math.floor((Math.random() * 2 - 1 ) * r1) + x1;
    // //     var y = Math.floor((Math.random() * 1.8 - 1 ) * r1) + y1;
    // //     var d = getDistance(x1, y1, x, y);
    // //     var r = Math.abs(Math.floor((Math.random() * 0.5 - 1) * d) + r1);
    // //     console.log("x");
    // //     console.log(x);
    // //     console.log("y");
    // //     console.log(y);
    // //     console.log("r");
    // //     console.log(r);
    // //     points.push({
    // //         x: x,
    // //         y: y,
    // //         r: r
    // //     })
    // // }
    //
    // context.beginPath();
    // for (var i = 0; i < points.length; i++) {
    //     context.arc(points[i].x, points[i].y, points[i].r, 0, 360, false);
    // }
    // context.closePath();
    // context.strokeStyle = "red";
    // context.stroke();
    // context.fillStyle = "rgba(255,255,255,1)";
    // context.fill();
    //
    //
    context.beginPath();
    context.arc(cx, cy, cw * 0.19, 0, 360, false);
    context.arc(cx + cw * 0.08, cy - ch * 0.3, cw * 0.11, 0, 360, false);
    context.arc(cx + cw * 0.3, cy - ch * 0.25, cw * 0.25, 0, 360, false);
    context.arc(cx + cw * 0.6, cy, cw * 0.21, 0, 360, false);
    context.arc(cx + cw * 0.3, cy - ch * 0.1, cw * 0.28, 0, 360, false);
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();
    // context.fillStyle = "rgba(255,255,255,0.8)";

    context.fill();


}

