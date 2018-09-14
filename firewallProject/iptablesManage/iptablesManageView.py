from flask import request,render_template,jsonify,redirect
from accountManage.tool import checkLogin
from iptablesManage.iptablesManageCon import  IptablesManageCon
import testTool

iptablesManageCon = IptablesManageCon()

def init(app):

    @app.route("/iptablesManage", methods=["GET"])
    @checkLogin
    def iptablesManage():
        if request.method == "GET":
            return redirect("/addIptablesRules")



    @app.route("/addIptablesRules",methods=["POST","GET"])
    @checkLogin
    def addIptablesRules():
        if request.method == "GET":
            return render_template("iptablesManagePage/addIptablesRules.html")
        else:
            method =  request.form["method"]
            if method == "o":
                return iptablesManageCon.commitRule(request.form)
            elif method == "p":
                return iptablesManageCon.addIptablesRule(request.form)
            elif method == "r":
                return iptablesManageCon.getRuleCategories()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/manageIptablesRules", methods=["POST", "GET"])
    @checkLogin
    def manageIptablesRules():
        if request.method == "GET":
            return render_template("iptablesManagePage/manageIptablesRules.html")
        else:
            method = request.form["method"]
            if method == "d":
                return iptablesManageCon.deleteRules(request.form)
            elif method == "r":
                return iptablesManageCon.getRuleCategories()
            elif method == "t":
                return iptablesManageCon.getRules()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    return app