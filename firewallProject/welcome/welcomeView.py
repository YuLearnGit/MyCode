import os
from flask import request,render_template,jsonify
from accountManage.tool import checkLogin
def init(app):
    @app.route("/welcome",methods=["GET"])
    @checkLogin
    def welcome():
        return render_template("welcomePage/welcome.html")

    @app.route("/test", methods=["GET"])
    @checkLogin
    def test():
        return render_template("welcomePage/test.html")

    return app