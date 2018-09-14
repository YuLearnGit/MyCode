from snortManage import snortManageView

def init(app):
    print("init snortManage")
    app = snortManageView.init(app)

    return app