import os
from accountManage import accountManageView
from accountManage import loginView
# from accountManage import loginCon

def init(app):
    print("init accountManage")
    app = loginView.init(app)
    app = accountManageView.init(app)

    return app

