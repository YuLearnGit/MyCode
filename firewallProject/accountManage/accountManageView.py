# import os
from flask import request,render_template,jsonify

from accountManage.accountManageCon import AccountManageCon

# print("AccountView",os.getcwd())
accountManageCon = AccountManageCon()

from accountManage.tool import checkLogin

def init(app):
    @app.route("/accountManage",methods=["POST","GET"])
    @checkLogin
    def accountManage():
        if request.method == "GET":
            return render_template("accountManagePage/accountManage.html")
        else:
            return accountManageCon.setLoginAccount(request.form)

    return app