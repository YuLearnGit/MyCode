from iptablesManage import iptablesManageView

def init(app):
    print("init iptablesManage")
    app = iptablesManageView.init(app)
    return app
