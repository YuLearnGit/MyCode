
from flask import request,render_template,jsonify
from accountManage.tool import checkLogin

def init(app):
    # 帮助界面
    # 未做
    @app.route("/help", methods=["GET", "POST"])
    @checkLogin
    def help():
        if request.method == "GET":
            return render_template("helpManagePage/help.html")

    # 关于界面
    # 未做
    @app.route("/about", methods=["GET", "POST"])
    @checkLogin
    def about():
        if request.method == "GET":
            return render_template("helpManagePage/about.html")
    return app