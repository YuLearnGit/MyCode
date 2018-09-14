from flask import jsonify,render_template
from accountManage.tool import checkLogin

def init(app):
    @app.errorhandler(404)
    @checkLogin
    def error404(error):
        return render_template("errorManagePage/error404.html"),404

    @app.errorhandler(500)
    @checkLogin
    def error500(error):
        return render_template("errorManagePage/error500.html"),500

    return app