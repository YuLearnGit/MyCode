from daqManage import daqManageView
import os

def init(app):
    print("init daqManage")
    app = daqManageView.init(app)
    return app
