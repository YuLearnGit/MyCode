from flask import render_template,request
from accountManage.loginCon import LoginCon

loginCon = LoginCon()
def init(app):
    # 登录
    @app.route("/login", methods=["POST","GET"])
    def login():
        if request.method == "GET":
            return render_template("loginPage/login.html")
        else:
            return loginCon.login(request.form)

    # 退出登录
    @app.route("/logout", methods=["POST", "GET"])
    def logout():
        return loginCon.logout()
    return app

