import os
import subprocess
import testTool
from utils.mySqlDb import MySqlDbUtil

#匹配数据库中规则用的对象
class IptablesRule:
    def __init__(self,_id,rule,comment):
        self.id = _id
        self.rule = rule
        self.comment = comment


class IptablesMySqlDb:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(IptablesMySqlDb, cls).__new__(cls)
        return cls._inst
    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            self.mySqlDb = MySqlDbUtil()
            self.database_rules_name = "iptablesrules"
            self.default_table_name = "default"

        self.database_init()

    def convertDbName(self,org_db_name):
        return "_%s" % org_db_name
    def convertTableName(self,org_table_name):
        return  "_%s" % org_table_name
    def reconvertDbNameList(self,target_db_name_list):
        db_names = [db_name[1:] for db_name in target_db_name_list]
        return db_names
    def reconvertTableNameList(self,target_Table_name_list):
        table_names = [table_name[1:] for table_name in target_Table_name_list]
        return table_names

    def createDb(self,org_database_name):
        return self.mySqlDb.createDb(self.convertDbName(org_database_name))
    def isDbExisted(self,org_database_name):
        return self.mySqlDb.isDbExisted(self.convertDbName(org_database_name))
    def listDbs(self):
        rst = self.mySqlDb.listDbs()
        if rst[0]:
            return [True,self.reconvertDbNameList(rst[1])]
        return rst
    def createCategory(self,category):
        sql = "create table if not exists %s.%s (" % (self.convertDbName(self.database_rules_name), self.convertTableName(category)) \
                                     + " id int primary key auto_increment NOT NULL,"   \
                                     + " _rule varchar(1000) NOT NULL,"    \
                                     + " _comment varchar(100) NOT NULL)"
        return self.mySqlDb.createTable(sql)

    def isCategoryExisted(self, table_name):
        return self.mySqlDb.isTableExisted(self.convertDbName(self.database_rules_name),self.convertTableName(table_name))

    def showCategories(self):
        sql = "show tables from %s" % self.convertDbName(self.database_rules_name)
        rst = self.mySqlDb.listTables(sql)
        if rst[0]:
            return [True,self.reconvertTableNameList(rst[1])]
        return rst

    def dropCategory(self,category):
        return self.mySqlDb.dropTable(self.convertDbName(self.database_rules_name),self.convertTableName(category))

    def renameCategory(self,old_category, new_category):
        return self.mySqlDb.renameTable(self.convertDbName(self.database_rules_name),
            self.convertTableName(old_category),self.convertTableName(new_category))

    def insertRule(self,category, iptablesRule):
        sql = "insert %s.%s " % (self.convertDbName(self.database_rules_name), self.convertTableName(category)) \
            + "(_rule,_comment) " \
            + " values('%s','%s') " % ( iptablesRule.rule,iptablesRule.comment)
        return  self.mySqlDb.insert(sql)

    def deleteRule(self,category, _id):
        return self.mySqlDb.delete(self.convertDbName(self.database_rules_name),self.convertTableName(category),_id)

    def deleteRules(self,category, id_list):
        for _id in id_list:
            rst = self.deleteRule(category,_id)
            if not rst[0]:
                return [False,"删除id为%d的数据时发生错误，错误原因：%s"%(_id,rst[1])]
        return [True,"删除成功"]

    def selectRule(self,category,_id):
        rst = self.mySqlDb.select(self.convertDbName(self.database_rules_name),self.convertTableName(category),_id)
        if not rst[0]:
            return rst
        rule = IptablesRule(rst[1][0],rst[1][1],rst[1][2])
        return [True,rule.__dict__]

    def selectRules(self, category):
        rst = self.mySqlDb.selectAll(self.convertDbName(self.database_rules_name), self.convertTableName(category))
        if not rst[0]:
            return rst
        rules = list()
        for r in rst[1]:
            rule = IptablesRule(r[0],r[1],r[2])
            rules.append(rule.__dict__)
        return [True,rules]

    @testTool.mydecorator.showReturn
    def database_init(self):
        try:
            if not self.isDbExisted(self.database_rules_name):
                if self.createDb(self.database_rules_name)[0]:
                    if self.createCategory(self.default_table_name)[0]:
                        pass
                        # 在此添加默认规则
            elif not self.isCategoryExisted(self.default_table_name):
                if self.createCategory(self.default_table_name)[0]:
                    pass
                    # 在此添加默认规则
            return
        except Exception as e:
            return str(e)

class IptablesManageModel(IptablesMySqlDb):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(IptablesManageModel, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        IptablesMySqlDb.__init__(self)
        super(IptablesManageModel,self).__init__()


    def insertRule(self,category, iptablesRule):
        rst = IptablesShModel.shIptablesCommand(iptablesRule.rule)
        if not rst[0]:
            return rst
        rst1 = IptablesMySqlDb.insertRule(self,category,iptablesRule)
        if not rst1[0]:
            return rst1
        return [True,"添加成功"]

    def insertRules(self,category,iptablesRules):
        for iptablesRule in iptablesRules:
            rst = self.insertRule(category,iptablesRule)
            if not rst[0]:
                return [False,"添加规则时出错：%s" % rst[1]]
        return [True,"添加成功"]

    def deleteRule(self,category, _id):
        rst = self.selectRule(category, _id)
        if not rst[0]:
            return [False, "删除id=%s的规则时出错：%s" % (_id, rst[1])]
        rst1 = IptablesShModel.shIptablesCommand(rst[1])
        if not rst1[0]:
            return [False, "删除id=%s规则时出错：%s" % (_id, rst1[1])]
        rst2 = IptablesMySqlDb.deleteRule(self,category, _id)
        if not rst2[0]:
            return [False, "删除id=%s规则时出错：%s" % (_id, rst2[1])]
        return [True, "删除成功"]

    def deleteRules(self,category, id_list):
        for _id in id_list:
            rst = self.deleteRule(category,_id)
            if not rst[0]:
                return rst
        return [True,"删除成功"]

class IptablesShModel:
    # 命令行中执行iptables命令
    @staticmethod
    def shIptablesCommand(command):
        if command is None or command == "":
            return [False, "参数为空"]
        p = subprocess.Popen(["sudo %s" % command], shell=True,
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        hintmsg = ""
        while True:
            out = p.stdout.readline()
            err = p.stderr.readline()
            out = out.decode("utf-8")
            err = err.decode("utf-8")
            if p.poll() is not None and out == "" and err == "":
                break
            out.lstrip()
            err.lstrip()
            if out != "":
                if "Try" not in out:
                    hintmsg += out
            if err != "":
                if "Try" not in err:
                    hintmsg += err
        if hintmsg != "":
            return [False,hintmsg]
        return [True, "操作成功"]

    @staticmethod
    def shIptablesCommands(commands):
        for command in commands:
            rst = IptablesShModel.shIptablesCommand(command)
            if not rst[0]:
                return [False,"执行此%s命令时发生错误:%s" % (command,rst[1])]
        return [True,"执行成功"]

    @staticmethod
    def shDeleteAllIptablesRule():
        command = "iptables -F"
        return IptablesShModel.shIptablesCommand(command)

    @staticmethod
    def shDeleteIptablesRules(deleteRules):
        for deleteRule in deleteRules:
            rst = IptablesShModel.shIptablesCommand(deleteRule)
            if not rst[0]:
                return [False, "删除此规则%s发生错误:%s" % (deleteRule,rst[1])]
        return [True, "删除成功"]

