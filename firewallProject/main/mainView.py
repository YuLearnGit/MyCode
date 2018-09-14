from flask import render_template,request,redirect
from accountManage.tool import checkLogin,isLogin

from main.mainCon import MainCon

mainCon = MainCon()

def init(app):
    @app.route("/",methods=["POST","GET"])
    @checkLogin
    def main():
        if request.method == "GET":
            if not isLogin():
                return redirect("/login")
            return render_template("mainPage/main.html")
        else:
            return mainCon.getPageUrl(request.form)

    return app