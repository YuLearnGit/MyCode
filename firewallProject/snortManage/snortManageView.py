from flask import request,jsonify,render_template,redirect
from snortManage.snortManageCon import SnortManageCon
from accountManage.tool import checkLogin

snortManageCon = SnortManageCon()

def init(app):
    @app.route("/snortManage", methods=["GET"])
    @checkLogin
    def snortManage():
        if request.method == "GET":
            return redirect("/manageSnortActivate")


    @app.route("/manageSnortActivate", methods=["POST", "GET"])
    @checkLogin
    def manageSnortActivate():
        if request.method == "GET":
            return render_template("snortManagePage/manageSnortActivate.html")
        else:
            method = request.form["method"]
            if method == "a":
                return snortManageCon.activateSnort()
            elif method == "d":
                return snortManageCon.deactivateSnort()
            elif method == "m":
                return snortManageCon.isActivatedSnort()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/manageSnortRuleCategories", methods=["POST", "GET"])
    @checkLogin
    def manageSnortRuleCategories():
        if request.method == "GET":
            return render_template("snortManagePage/manageSnortRuleCategories.html")
        else:
            method = request.form["method"]
            if method == "a":
                return snortManageCon.addSnortCategory(request.form)
            elif method == "d":
                return snortManageCon.dropSnortCategory(request.form)
            elif method == "n":
                return snortManageCon.renameSnortCategory(request.form)
            elif method == "r":
                return snortManageCon.showSnortCategories()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/addSnortRules", methods=["POST", "GET"])
    @checkLogin
    def addSnortRules():
        if request.method == "GET":
            return render_template("snortManagePage/addSnortRules.html")
        else:
            method = request.form["method"]
            if method == "o":
                return snortManageCon.commitRule(request.form)
            elif method == "p":
                return snortManageCon.addSnortRule(request.form)
            elif method == "r":
                return snortManageCon.showSnortCategories()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/manageSnortRules", methods=["POST", "GET"])
    @checkLogin
    def manageSnortRules():
        if request.method == "GET":
            return render_template("snortManagePage/manageSnortRules.html")
        else:
            method = request.form["method"]
            if method == "d":
                return snortManageCon.deleteRule(request.form)
            elif method == "r":
                return snortManageCon.showSnortCategories()
            elif method == "t":
                return snortManageCon.selectRules(request.form)
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)


    return app