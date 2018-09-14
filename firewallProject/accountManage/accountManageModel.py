# import os
# print("AccountManageModel",os.getcwd())
from utils.jsonFileUtil import JsonFileUtil

class AccountFile(JsonFileUtil):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(AccountFile, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            super(JsonFileUtil, self).__init__()
            super(AccountFile,self).__init__("./configure/account.json")

class AccountManageModel:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(AccountManageModel, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        self.accountFile = AccountFile()
        # self.loginAccount = None
        # self.loginAccountFilename = "./configure/loginAccount.cfg"

    # 获取登录账户
    def getLoginAccount(self):
        rst = self.accountFile.getValue("account")
        if rst[0]:
            account = rst[1]
            # return [True,[rst[1]["username"],rst[1]["password"]]]
        else:
            account = {
                "username":"admin",
                "password":"admin"
            }
        self.accountFile.set("account", account)
        return [True,[account["username"],account["password"]]]

    # 设置登录账户
    def setLoginAccount(self,username:str, password:str):
        account = {
            "username": username,
            "password": password
        }
        return self.accountFile.set("account", account)



class AccountManageModel2:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(AccountManageModel2, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        # self.accountFile = AccountFile()
        self.loginAccount = None
        self.loginAccountFilename = "./configure/loginAccount.cfg"


    # 从文件中读取登录账户信息
    def __readLoginAccount(self):
        fp = None
        username = None
        password = None
        try:
            fp = open(self.loginAccountFilename, "r")
            username = fp.readline()
            password = fp.readline()
            if username is None or password is None:
                raise IOError("File is Empty!")
            else:
                username = username[:-1]
                password = password[:-1]
        except IOError:
            # 如果出现异常，说明可能没有这个文件，就建立一个默认的账户，并返回这个账户
            if fp is not None:
                fp.close()
            fp = open(self.loginAccountFilename, "w")
            # should be encrypt
            default_username = "admin"
            default_password = "admin"
            fp.write("%s\n" % default_username)
            fp.write("%s\n" % default_password)
            username = default_username
            password = default_password
        finally:
            if fp is not None:
                fp.close()
        account = [username, password]
        return [True, account]

    def __writeLoginAccount(self,username, password):
        fp = None
        rst = [None, None]
        try:
            fp = open(self.loginAccountFilename, "w")
            fp.write(username)
            fp.write("\n")
            fp.write(password)
            fp.write("\n")
            self.loginAccount = None
            rst[0] = True
            rst[1] = "已保存"
        except IOError:
            rst[0] = False
            rst[1] = "存储失败"
        finally:
            if fp is not None:
                fp.close()
        return rst

    # 获取登录账户
    def getLoginAccount(self):
        if self.loginAccount is None:
            rst = self.__readLoginAccount()
            if not rst[0]:
                return [False, "账户信息读取出错"]
            self.loginAccount = rst[1]
        return [True, self.loginAccount]

    # 设置登录账户
    def setLoginAccount(self,username, password):
        return self.__writeLoginAccount(username, password)

