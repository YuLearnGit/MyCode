# import os
from flask import jsonify


from accountManage import accountManageModel
# print("AccountManageCon",os.getcwd())


class AccountManageCon:
    def __init__(self):
        self.accountManageModel = accountManageModel.AccountManageModel()
        pass

    def setLoginAccount(self,form):
        msg = dict()
        oldUsername = form["oldUsername"]
        newUsername = form["newUsername"]
        oldPassword = form["oldPassword"]
        newPassword = form["newPassword"]
        rst = self.accountManageModel.getLoginAccount()
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        account = rst[1]
        if account[0] != oldUsername:
            msg["error"] = "旧用户名不正确"
            return jsonify(msg)
        elif "" == newUsername:
            msg["error"] = "请输入修改后的用户名"
            return jsonify(msg)
        if account[1] != oldPassword:
            msg["error"] = "旧密码不正确"
            return jsonify(msg)
        elif "" == newPassword:
            msg["error"] = "请输入新密码"
            return jsonify(msg)
        elif account[1] == newPassword:
            msg["error"] = "不允许新旧密码相同"
            return jsonify(msg)
        else:
            # should be encrypt
            new_username = newUsername
            new_password = newPassword
            rst = self.accountManageModel.setLoginAccount(new_username, new_password)
            if not rst[0]:
                msg["error"] = rst[1]
                return jsonify(msg)
            msg["success"] = rst[1]
            return jsonify(msg)
