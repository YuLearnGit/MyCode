from utils.mySqlDb import MySqlDbUtil
import os
from utils import myConfigUtil
import subprocess
import time
import testTool

myConfig = myConfigUtil.MyConfig()

#匹配数据库中规则用的对象
class SnortRule:
    def __init__(self,_id,rule,comment):
        self.id = _id
        self.rule = rule
        self.comment = comment

class SnortFileModel:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(SnortFileModel, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            self.myConfig = myConfigUtil.MyConfig()
            # snort_rule_file_path = "/etc/snort/rules/"
            self.snort_rule_file_path = self.myConfig.getConf("snort_rule_file_path")
            self.snort_conf_file = self.myConfig.getConf("snort_conf_file")

    # 操作文件
    def shAddRulePath(self,filename):
        rst = [None, None]
        if not os.path.isfile(self.snort_conf_file + ".backup"):
            p = subprocess.Popen(["sudo cp " + self.snort_conf_file + " " + self.snort_conf_file + ".backup"], shell=True)
            p.wait()
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "旧文件备份失败"
                return rst
        p = subprocess.Popen(["sudo chmod 666 " + self.snort_conf_file], shell=True)
        p.wait()
        if p.poll() != 0:
            rst[0] = False
            rst[1] = "配置失败：无法更改权限"
            return rst
        fo = None
        try:
            fo = open(self.snort_conf_file, "a")
            # fo.seek(0,2)
            fo.write("\n")
            fo.write("include %s%s.rules" % (self.snort_rule_file_path, filename))
            rst[0] = True
            rst[1] = "修改配置文件成功"
        except Exception as e:
            rst[0] = False
            rst[1] = str(e)
        finally:
            if fo is not None:
                fo.close()
        p = subprocess.Popen(["sudo chmod 644 " + self.snort_conf_file], shell=True)
        return rst

    def createRuleFile(self,filename):
        fo = None
        rst = [None, None]
        try:
            fo = open(self.snort_rule_file_path + filename + ".rules", "w")
            fo.flush()
            fo.close()
            rst[0] = True
            rst[1] = "文件%s创建成功" % (filename)
        except Exception as e:
            rst[0] = False
            rst[1] = str(e)
        finally:
            if fo is not None:
                fo.close()
        return rst
        # if not __checkFileExisted(filename):
        #     return [False,"无法创建文件%s"%(filename)]
        # return [True,"文件%s创建成功"%(filename)]

    def deleteRuleFile(self,filename):
        fp = None
        rst = [None, None]
        try:
            fp = open(self.snort_rule_file_path + filename + ".rules", "w")  # 写空，代替删除
            fp.flush()
            fp.close()
            rst[0] = True
            rst[1] = "删除成功"
            # rst = __rewriteRules()
            # if not rst[0]:
            # return [False,"删除失败：" + rst[1]]
        except Exception as e:
            rst[0] = False
            rst[1] = str(e)
        finally:
            if fp is not None:
                fp.close()
        return rst

    def renameRuleFile(self,old_filename, new_filename):
        try:
            # 重命名
            os.rename(self.snort_rule_file_path + old_filename + ".rules", self.snort_rule_file_path + new_filename + ".rules")
            # 重建旧文件
            rst = self.createRuleFile(old_filename)
            if not rst[0]:
                return [False, rst[1]]
            # 在配置文件中添加路径
            rst2 = self.shAddRulePath(new_filename)
            if not rst2[0]:
                return [False, rst2[1]]
            return [True, "重命名成功"]
        except Exception as e:
            print(e)
            return [False, "重命名出错"]

    # 向文件末尾插入一条规则
    def appendRule(self,filename, snortRule):
        rst = [None, None]
        if not self.checkFileExisted(filename):
            return [False, "无法创建文件"]
        fp = None
        try:
            fp = open(self.snort_rule_file_path + filename + ".rules", "a")
            fp.write("%s\n" % snortRule.rule)
            rst[0] = True
            rst[1] = "写入文件成功"
        except IOError:
            rst[0] = False
            rst[1] = "写入文件失败"
        finally:
            if fp is not None:
                fp.close()
        return rst

    # 向文件末尾插入多条规则
    def appendRules(self,filename, snortRules):
        if not self.checkFileExisted(filename):
            return [False, "无法创建文件"]
        fp = None
        rst = [None, None]
        try:
            fp = open(self.snort_rule_file_path + filename + ".rules", "a")
            for snortRule in snortRules:
                fp.write("%s\n" % snortRule.rule)
            rst[0] = True
            rst[1] = "写入文件成功"
        except Exception as e:
            print(str(e))
            if fp is not None:
                fp.close()
            rst[0] = False
            rst[1] = "写入文件失败"
        finally:
            if fp is not None:
                fp.close()
        return rst

    # 向文件filename.rule重新写入表_filename的所有规则，实现删除操作
    def rewriteRules(self,filename,snortRules):
        fp = None
        try:
            fp = open(self.snort_rule_file_path + filename + ".rules", "w")
            for snortRule in snortRules[1]:
                fp.write("%s\n" % snortRule.rule)
            rst = [True,"重写文件成功"]
        except IOError:
            rst = [False,"重写文件出错"]
        finally:
            if fp is not None:
                fp.close()
        return rst

    # 检查是否存在文件
    # 不存在就新建一个
    def checkFileExisted(self,filename):
        rst = None
        if not os.path.isfile(self.snort_rule_file_path + filename + ".rules"):
            # print("Snort file does not exist")
            fp = None
            try:
                fp = open(self.snort_rule_file_path + filename + ".rules", "w")
                fp.close()
                rst = True
            except Exception as e:
                print(str(e))
                print("cannot open file")
                if fp != None:
                    fp.close()
                if not os.path.isfile(self.snort_rule_file_path + filename + ".rules"):
                    rst = False
                else:
                    rst = True
        else:
            rst = True
        return rst

class SnortMySqlDb:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(SnortMySqlDb, cls).__new__(cls)
        return cls._inst
    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            self.mySqlDb = MySqlDbUtil()
            self.database_rules_name = "snortrules"
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

    def isCategoryExisted(self, category):
        return self.mySqlDb.isTableExisted(self.convertDbName(self.database_rules_name),self.convertTableName(category))

    def showCategories(self):
        rst = self.mySqlDb.listTables(self.convertDbName(self.database_rules_name))
        if rst[0]:
            return [True,self.reconvertTableNameList(rst[1])]
        return rst

    def dropCategory(self,category):
        return self.mySqlDb.dropTable(self.convertDbName(self.database_rules_name),self.convertTableName(category))

    def renameCategory(self,old_category, new_category):
        return self.mySqlDb.renameTable(self.convertDbName(self.database_rules_name),
            self.convertTableName(old_category),self.convertTableName(new_category))

    def insertRule(self,category, snortRule):
        sql = "insert %s.%s " % (self.convertDbName(self.database_rules_name), self.convertTableName(category)) \
            + "(_rule,_comment) " \
            + " values('%s','%s') " % ( snortRule.rule,snortRule.comment)
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
        rule = SnortRule(rst[1][0],rst[1][1],rst[1][2])
        return [True,rule.__dict__]

    def selectRules(self, category):
        rst = self.mySqlDb.selectAll(self.convertDbName(self.database_rules_name), self.convertTableName(category))
        if not rst[0]:
            return rst
        rules = list()
        for r in rst[1]:
            rule = SnortRule(r[0],r[1],r[2])
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

class SnortManageModel(SnortMySqlDb):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(SnortManageModel, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        SnortMySqlDb.__init__(self)
        super(SnortManageModel, self).__init__()
        self.snortFileModel = SnortFileModel()

    def createCategory(self,category):
        rst = self.snortFileModel.createRuleFile(category)
        if not rst[0]:
            return [False, rst[1]]
        rst1 = self.snortFileModel.shAddRulePath(category)
        if not rst1[0]:
            return [False, rst1[1]]
        rst2 = SnortMySqlDb.createCategory(self,category)
        if not rst2[0]:
            return [False, rst2[1]]
        return [True, "分类%s创建成功" % category ]

    def renameCategory(self,old_category, new_category):
        if old_category == "default" or new_category == "default":
            return [False, "内置分类default不允许重命名"]
        rst = SnortMySqlDb.showCategories(self)
        if not rst[0]:
            return rst
        if new_category in rst[1]:
            return [False,"分类%s已存在" % new_category ]
        rst1 = self.snortFileModel.renameRuleFile(old_category, new_category)
        if not rst1[0]:
            return [False, rst1[1]]
        rst2 = SnortMySqlDb.renameCategory(self,old_category, new_category)
        if not rst2[0]:
            return [False, rst2[1]]
        return [True,"分类%s已重命名为%s" % (old_category,new_category)]

    def dropCategory(self,category):
        if category == "default":
            return [False, "内置分类default不可删除"]
        rst = self.snortFileModel.deleteRuleFile(category)
        if not rst[0]:
            return [False, rst[1]]
        rst1 = SnortMySqlDb.dropCategory(self,category)
        if not rst1[0]:
            return [False, rst1[1]]
        return [True, "分类%s删除成功" % category]

    def insertRule(self,category, snortRule):
        rst = self.snortFileModel.appendRule(category,snortRule)
        if not rst[0]:
            return rst
        rst1 = SnortMySqlDb.insertRule(self,category,snortRule)
        if not rst1[0]:
            return rst1
        return [True,"添加成功"]

    def insertRules(self, category, snortRules):
        for snortRule in snortRules:
            rst = self.insertRule(category, snortRule)
            if not rst[0]:
                return [False, "添加规则时出错：%s" % rst[1]]
        return [True, "添加成功"]

    def deleteRules(self,category, id_list):
        rst = SnortMySqlDb.deleteRules(self,category,id_list)
        rst1 = SnortMySqlDb.selectRules(self,category)
        if not rst1[0]:
            return rst1
        rst2 = self.snortFileModel.rewriteRules(category,rst1[1])
        if not rst2[0]:
            return rst2
        if not rst[0]:
            return rst
        return [True, "删除成功"]

class SnortShModel:
    # 启动三个组件的命令  注意接口(此处未指定)：
    command_activate_snort = myConfig.getConf("command_activate_snort")
    command_activate_barnyard2 = myConfig.getConf("command_activate_barnyard2")
    command_activate_guardian = myConfig.getConf("command_activate_guardian")

    # 检测进程
    command_snort_process = myConfig.getConf("command_snort_process")
    command_guardian_process = myConfig.getConf("command_guardian_process")

    # 获取后台command命令的进程号
    @staticmethod
    def __shGetPid(command):
        p = subprocess.Popen(["sudo ps -ajx | grep -m 1 '" + command + "' | grep -v grep | awk '{print $2}'"],
                             shell=True,
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        pid = 0
        rst = [False, None]
        while True:
            lineout = p.stdout.readline()
            lineerr = p.stderr.readline()
            lineout = lineout.decode("utf-8")
            lineerr = lineerr.decode("utf-8")
            # print(lineout)
            # print(lineerr)
            if p.poll() != None and lineout == "" and lineerr == "":
                break
            lineout.lstrip()
            lineerr.lstrip()
            if lineout != "":
                if "error" in lineout:
                    rst[0] = False
                else:
                    try:
                        pid = int(lineout)
                        rst[0] = True
                    except ValueError as e:
                        pid = 0
            if lineerr != "":
                if "error" in lineerr:
                    rst[0] = False
                    print("lineerr print err")
        print("pid=" + str(pid))
        if pid == 0:
            return [False, 0]
        else:
            return [True, pid]

    # kill掉进程号为pid的进程
    @staticmethod
    def __shKillPid(pid):
        try:
            p = subprocess.Popen(["sudo kill " + str(pid)], shell=True)
            p.wait()
            # if p.poll() != 0:
            # return [False,"执行停止命令时发生错误"]
        except Exception as e:
            return [False, str(e)]
        return [True, "执行成功"]

    # 检测command命令是否存在后台进程（是否被执行）
    @staticmethod
    def __shIsActivated(command):
        rst = SnortShModel.__shGetPid(command)
        if not rst[0]:
            return [False, "未启动"]
        return [True, "已启动"]

    # 执行command命令
    @staticmethod
    def __shActivate(command):
        try:
            rst = SnortShModel.__shIsActivated(command)
            if rst[0]:
                return [False, "已启动，请勿重复启动"]
            subprocess.Popen([command], shell=True)
            pass
        except Exception as e:
            return [False, str(e)]
        return [True, "启动成功"]

    # 将command命令所代表的一个或多个进程停止掉
    @staticmethod
    def __shDeactivate(command):
        rst = SnortShModel.__shIsActivated(command)
        if not rst[0]:
            return [False, "未启动,无需停止"]
        count = 0
        while True:
            count += 1
            rst = SnortShModel.__shGetPid(command)
            if not rst[0]:
                break
            rst = SnortShModel.__shKillPid(rst[1])
            if not rst[0]:
                return [False, rst[1]]
            if count > 100:
                return [False, "有限次数内未停止,请再次尝试！"]
        rst1 = SnortShModel.__shIsActivated(command)
        if not rst1[0]:
            return [True, "已停止"]
        return [False, "停止过程中发生错误"]

    # 启动Snort
    @staticmethod
    def __shActivateSnort():
        return SnortShModel.__shActivate(SnortShModel.command_activate_snort)

    # 停止Snort
    @staticmethod
    def __shDeactivateSnort():
        return SnortShModel.__shDeactivate(SnortShModel.command_snort_process)

    # 检测Snort是否启动
    @staticmethod
    def __shIsActivatedSnort():
        return SnortShModel.__shIsActivated(SnortShModel.command_snort_process)

    # 启动guardian
    @staticmethod
    def __shActivateGuardian():
        return SnortShModel.__shActivate(SnortShModel.command_activate_guardian)

    # 停止guardian
    @staticmethod
    def __shDeactivateGuardian():
        return SnortShModel.__shDeactivate(SnortShModel.command_guardian_process)

    # 检测guardian是否启动
    @staticmethod
    def __shIsActivatedGuardian():
        return SnortShModel.__shIsActivated(SnortShModel.command_guardian_process)

    # 启动barnyard2
    @staticmethod
    def __shActivateBarnyard2():
        return SnortShModel.__shActivate(SnortShModel.command_activate_barnyard2)

    # 停止barnyard2
    @staticmethod
    def __shDeactivateBarnyard2():
        return SnortShModel.__shDeactivate(SnortShModel.command_activate_barnyard2)

    # 检测barnyard2是否启动
    @staticmethod
    def __shIsActivatedBarnyard2():
        return SnortShModel.__shIsActivated(SnortShModel.command_activate_barnyard2)

    # 封装
    # 启动snort组件
    @staticmethod
    def activateSnort():
        rst1 = SnortShModel.__shActivateSnort()
        if not rst1[0]:
            return [False, rst1[1]]
        rst2 = SnortShModel.__shActivateGuardian()
        if not rst2[0]:
            return [False, "Snort:" + rst1[1] + ".Guardian:" + rst2[1]]
        # return [True,rst1[1]]
        time.sleep(1)
        return SnortShModel.isActivatedSnort()

    # 停止snort组件
    @staticmethod
    def deactivateSnort():
        rst1 = SnortShModel.__shDeactivateSnort()
        rst2 = SnortShModel.__shDeactivateGuardian()
        if rst1[0] and rst2[0]:
            return [True, "已停止"]
        else:
            return [False, "Snort:" + rst1[1] + ".Guardian:" + rst2[1]]

    # 检测snort组件是否启动
    @staticmethod
    def isActivatedSnort():
        rst1 = SnortShModel.__shIsActivatedSnort()
        rst2 = SnortShModel.__shIsActivatedGuardian()
        if rst1[0] and rst2[0]:
            return [True, "已启动"]
        elif not rst1[0] and not rst2[0]:
            return [False, "已停止"]
        else:
            return [True, "Snort:" + rst1[1] + ".Guardian:" + rst2[1]]



