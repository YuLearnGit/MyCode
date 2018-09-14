from helpManage import helpManageView

def init(app):
    print("init helpManage")
    app = helpManageView.init(app)
    return app
