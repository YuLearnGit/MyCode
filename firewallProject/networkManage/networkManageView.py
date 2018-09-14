from flask import request,render_template,jsonify,redirect
from accountManage.tool import checkLogin
from networkManage.networkManageCon import  NetworkManageCon

networkManageCon = NetworkManageCon()
def init(app):
    @app.route("/networkManage", methods=["GET"])
    @checkLogin
    def networkManage():
        if request.method == "GET":
            return redirect("/gateway")

    @app.route("/gateway",methods=["GET","POST"])
    @checkLogin
    def gateway():
        if request.method == "GET":
            return render_template("networkManagePage/gateway.html")
        else:
            method = request.form["method"]
            if method == "r":
                return networkManageCon.myGateway.getGateway()
            elif method == "p":
                return networkManageCon.myGateway.setGateway(request.form)
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/netPattern", methods=["GET", "POST"])
    @checkLogin
    def netPattern():
        if request.method == "GET":
            return render_template("networkManagePage/netPattern.html")
        else:
            method = request.form["method"]
            if method == "r":
                return networkManageCon.myNetPattern.getNetPattern()
            elif method == "p":
                return networkManageCon.myNetPattern.setNetPattern(request.form)
            elif method == "t":
                return networkManageCon.myNetPattern.testNetPattern(request.form)
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/vpn", methods=["GET", "POST"])
    @checkLogin
    def vpn():
        if request.method == "GET":
            return render_template("networkManagePage/vpn.html")
        else:
            method = request.form["method"]
            if method == "r":
                return networkManageCon.myVpn.get()
            elif method == "p":
                return networkManageCon.myVpn.set(request.form)
            elif method == "t":
                return networkManageCon.myVpn.test()
            elif method == "c":
                return networkManageCon.myVpn.connect()
            elif method == "d":
                return networkManageCon.myVpn.disconnect()
            else:
                msg = dict()
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)

    @app.route("/network4", methods=["GET", "POST"])
    @checkLogin
    def network4():
        if request.method == "GET":
            return render_template("networkManagePage/network4.html")

    return app