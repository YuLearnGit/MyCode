from flask import request,jsonify,session
from functools import wraps

# 在和前台进行交互的后台代码中，几乎所有操作都需要在返回数据前检查是否登录，以防止有人以未登录状态获取后台数据。
# 是：则本装饰器什么也不做。
# 否：返回登录链接，由前台的js函数负责跳转至登录页面。
# 注：如果前台为GET页面操作，则此装饰器函数不检查是否登录，即，未登录状态下能获取html页面，但若有POST操作，将进行检查。
# 用法：
#   将 此装饰器 用于修饰 需要在返回数据前检查是否登录的 url注册函数（例如用于登录交互的函数就不需要此检查）。
# 示例：
#   @app.route("/welcome",methods=["GET"])
#   @checkLogin
#   def welcome():
#       return render_template("welcomePage/welcome.html")
def checkLogin(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.method == "GET":
            return func(*args, **kwargs)
        if "username" in session and "password" in session:
            return func(*args, **kwargs)
        else:
            msg = dict()
            msg["href"] = "/login"
            return jsonify(msg)
    return wrapper

# 单独的 检测是否登录的函数。
# 是：表示已登录。
# 否：表示未登录。
# 用途：若除上述checkLogin装饰器所检查的部分（只检查POST操作），仍有需要检查是否登录
#       （例如：在GET操作中检查。可整合到checkLogin装饰器中，但其实大部分的GET操作，都可以不检测登录），
#       则直接调用此函数。

def isLogin():
    if "username" in session and "password" in session:
        return True
    return False