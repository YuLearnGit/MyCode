from flask import request, render_template, jsonify, redirect
from settingManage.settingManageCon import SettingManageCon
from accountManage.tool import checkLogin
settingManageCon = SettingManageCon()

def init(app):
    @app.route("/settingManage", methods=["GET", "POST"])
    @checkLogin
    def settingManage():
        if request.method == "GET":
            return render_template("settingManagePage/setting.html")
        else:
            method = request.form["method"]
            if method == "t":
                return settingManageCon.setThemeSetting(request.form)
            elif method == "r":
                return settingManageCon.getAllSetting()


    return app
