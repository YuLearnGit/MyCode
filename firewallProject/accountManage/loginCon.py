from flask import jsonify,session,request
from accountManage.accountManageModel import AccountManageModel
import testTool
class LoginCon:
    def __init__(self):
        self.accountManageModel = AccountManageModel()
    @testTool.mydecorator.showReturn
    def login(self,form):
        post_account = [form["username"],form["password"]]
        rst = self.accountManageModel.getLoginAccount()
        msg = dict()
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        account = rst[1]
        if account[0] == post_account[0] and account[1] == post_account[1]:
            session["username"] = account[0]
            session["password"] = account[1]
            msg["href"] = "/"
            return jsonify(msg)
        else:
            msg["error"] = "用户名或密码错误"
            return jsonify(msg)

    def logout(self):
        session.pop("username", None)
        session.pop("password", None)
        msg = dict()
        msg["login"] = "/login"
        return jsonify(msg)
        pass

#
# def checkLogin(func):
#     def check():
#         if request.method == "GET":
#             return func()
#         if "username" in session and "password" in session:
#             return func()
#         else:
#             msg = dict()
#             msg["href"] = "/login"
#             return jsonify(msg)
#     return check

# class MyApp:
#     def route(self,url,methods):
#         def de(func):
#             print("MyApp",url,methods)
#             func()
#             print("MyAPp")
#         return de
#
# myapp = MyApp()
#
# def myRoute(url,methods,checkLogin=True):
#     @myapp.route(url,methods=methods)
#     def isLogin(func):
#         def check():
#             if request.method == "GET":
#                 return func()
#             if "username" in session and "password" in session:
#                 return func()
#             else:
#                 msg = dict()
#                 msg["href"] = "/login"
#                 return jsonify(msg)
#
#         return check
#
#     return isLogin

