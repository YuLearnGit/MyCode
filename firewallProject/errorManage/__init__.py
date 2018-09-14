from errorManage import errorManageView

def init(app):
    print("init errorManage")
    app = errorManageView.init(app)
    return app