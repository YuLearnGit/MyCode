/**
 * 载入框架：
 * 如果当前页面（本应在框架中的页面）和顶层页面相等，
 * 说明当前页面跳出了框架显示
 * 则将当前顶层页面重载为根页面，以载入框架
 */
function loadFrame() {
	if (top.location == self.location)
	{
		top.location.href = "/";
		console.log("loadFrame");
	}
}
loadFrame();