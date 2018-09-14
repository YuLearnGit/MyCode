from settingManage import  settingManageView

def init(app):
    print("init networkManage")
    app = settingManageView.init(app)
    return app