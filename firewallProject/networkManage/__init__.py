from networkManage import  networkManageView

def init(app):
    print("init networkManage")
    app = networkManageView.init(app)
    return app