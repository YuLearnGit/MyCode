/**
 * 跳出框架：
 * 如果当前页面（指跟页面和登录页面）和顶层页面不等，
 * 说明，当前页面显示在了框架中，需要使其跳出框架显示
 * 则让顶层页面重载当前页面
 */
function jumpFrame() {
    if (top.location != self.location) {
        top.location.href = window.location.href;
        console.log("jumpFrame");
    }
}

jumpFrame();