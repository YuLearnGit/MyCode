from flask import request, render_template, jsonify, redirect

from daqManage.daqManageCon import DaqManageCon,DaqMonitorCon
from accountManage.tool import checkLogin

daqManageCon = DaqManageCon()
daqMonitorCon = DaqMonitorCon()

def init(app):
    # 数据采集配置：跳转页
    @app.route("/daqManage", methods=["GET"])
    @checkLogin
    def catchManage():
        if request.method == "GET":
            return redirect("/manageDaqActivate")

    # 数据采集配置：启动管理
    @app.route("/manageDaqActivate", methods=["POST", "GET"])
    @checkLogin
    def manageDaqActivate():
        if request.method == "GET":
            return render_template("daqManagePage/manageDaqActivate.html")
        else:
            method = request.form["method"]
            if method == "a":
                return daqManageCon.isActivateDaq()
            elif method == "d":
                return daqManageCon.deactivateDaq()
            elif method == "m":
                return daqManageCon.getDaqStatus()
            elif method == "o":
                return daqManageCon.activateUpload()
            elif method == "p":
                return daqManageCon.deactivateUpload()
            elif method == "q":
                return daqManageCon.getUploadStatus()
            elif method == "r":
                return daqManageCon.getUpload()
            elif method == "s":
                return daqManageCon.setUpload(request.form)
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)


    # 数据采集配置：变量管理
    @app.route("/manageDaqVariables", methods=["POST", "GET"])
    @checkLogin
    def manageDaqVariables():
        if request.method == "GET":
            return render_template("daqManagePage/manageDaqVariables.html")
        else:
            method = request.form["method"]
            if method == "a":
                return daqManageCon.appendVariable(request.form)
            if method == "c":
                return daqManageCon.updateVariable(request.form)
            elif method == "d":
                return daqManageCon.deleteVariable(request.form)
            elif method == "l":
                return daqManageCon.listVariables()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/monitorDaqVariables", methods=["POST", "GET"])
    @checkLogin
    def monitorDaqVariables():
        if request.method == "GET":
            return render_template("daqManagePage/monitorDaqVariables.html")
        else:
            method = request.form["method"]
            if method == "r":
                return daqManageCon.listVariables()
            elif method == "m":
                return daqMonitorCon.monitorVariables(request.form)
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)



    return app
