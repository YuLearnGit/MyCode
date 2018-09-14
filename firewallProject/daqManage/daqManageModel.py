import pymysql
from utils.mySqlDb import MySqlDbUtil
import testTool
####################################daq###################################
#操作数据库
# conn_daq_variables = pymysql.connect(host="localhost",port=3306,user="root",password="root")
# cursor_variables = conn_daq_variables.cursor()
# database_daq_name = "plcdaq"
# default_table_name = "datasources"

#匹配数据库中采集变量用的对象
class DaqVariable:
    def __init__(self,_id,dataName,deviceAddress,dataUnit,dataType,dataLength,dataAddress,deviceName,devicePort,deviceUnit,funCode):
        self.id = _id
        self.dataName = dataName             #变量名称
        self.deviceAddress = deviceAddress    #设备IP地址
        self.dataUnit = dataUnit            #数据单位
        self.dataType = dataType            #数据类型 四种单选 线圈coil 离散输入discrete_input 保持寄存器holding_register 输入寄存器input_register
        self.dataLength = dataLength        #数据长度            位长                             字长
        self.dataAddress = dataAddress        #数据偏移地址 十进制
        self.deviceName = deviceName        #设备名称 自定义
        self.devicePort = devicePort        #设备端口
        self.deviceUnit = deviceUnit        #设备单元号 十进制
        self.funCode = funCode              #功能码

class DaqMySqlDb:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(DaqMySqlDb, cls).__new__(cls)
        return cls._inst
    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            self.mySqlDb = MySqlDbUtil()
            self.database_daq_name = "plcdaq"
            self.default_table_name = "datasources"
            self.database_init()

    def convertDbName(self,org_db_name):
        return org_db_name
    def convertTableName(self,org_table_name):
        return  org_table_name
    def reconvertDbNameList(self,target_db_name_list):
        return target_db_name_list
    def reconvertTableNameList(self,target_Table_name_list):
        return target_Table_name_list

    def createDb(self,org_database_name):
        return self.mySqlDb.createDb(self.convertDbName(org_database_name))
    def isDbExisted(self,org_database_name):
        return self.mySqlDb.isDbExisted(self.convertDbName(org_database_name))
    def listDbs(self):
        rst = self.mySqlDb.listDbs()
        if rst[0]:
            return [True,self.reconvertDbNameList(rst[1])]
        return rst
    def createVariableGroup(self,variableGroup):
        sql = "create table if not exists %s.%s (" % (self.convertDbName(self.database_daq_name), self.convertTableName(variableGroup)) \
                                     + " ID int primary key auto_increment NOT NULL,"   \
                                     + " DataName varchar(50) NOT NULL,"    \
                                     + " DeviceAddress varchar(50) NOT NULL,"   \
                                     + " DataUnit varchar(50) NOT NULL,"    \
                                     + " DataType varchar(50) NOT NULL,"    \
                                     + " DataLenth int UNSIGNED NOT NULL,"  \
                                     + " DataAddress int UNSIGNED NOT NULL,"    \
                                     + " DeviceName varchar(50) NOT NULL,"  \
                                     + " DevicePort INT UNSIGNED NOT NULL," \
                                     + " DeviceUnit INT UNSIGNED NOT NULL," \
                                     + " FunCode INT UNSIGNED NOT NULL )"
        return self.mySqlDb.createTable(sql)

    def isVariableGroupExisted(self, table_name):
        return self.mySqlDb.isTableExisted(self.convertDbName(self.database_daq_name),self.convertTableName(table_name))

    def showVariableGroup(self):
        sql = "show tables from %s" % self.convertDbName(self.database_daq_name)
        rst = self.mySqlDb.listTables(sql)
        if rst[0]:
            return [True,self.reconvertTableNameList(rst[1])]
        return rst

    def dropVariableGroup(self,group):
        return self.mySqlDb.dropTable(self.convertDbName(self.database_daq_name),self.convertTableName(group))

    def renameVariableGroup(self,old_group, new_group):
        return self.mySqlDb.renameTable(self.convertDbName(self.database_daq_name),
            self.convertTableName(old_group),self.convertTableName(new_group))

    def insertVariable(self,group, daqVariable):
        sql = "insert %s.%s " % (self.convertDbName(self.database_daq_name), self.convertTableName(group)) \
            + "(DataName,DeviceAddress,DataUnit,DataType,DataLenth,DataAddress,DeviceName,DevicePort,DeviceUnit,FunCode) " \
            + " values('%s','%s','%s','%s',%d,%d,'%s',%d,%d,%d)" % (
            daqVariable.dataName, daqVariable.deviceAddress,
            daqVariable.dataUnit, daqVariable.dataType,
            int(daqVariable.dataLength), int(daqVariable.dataAddress),
            daqVariable.deviceName, int(daqVariable.devicePort),
            int(daqVariable.deviceUnit), int(daqVariable.funCode))
        return  self.mySqlDb.insert(sql)

    def insertVariables(self,group, daqVariables):
        for daqVariable in daqVariables:
            rst = self.insertVariable(group,daqVariable)
            if not rst[0]:
                return rst[0]
        return [True,"插入成功"]

    def updateVariable(self, group, daqVariable):
        sql = "update %s.%s " % (self.convertDbName(self.database_daq_name), self.convertTableName(group)) \
              + " SET " \
              + " DataName='%s'," % daqVariable.dataName \
              + " DeviceAddress='%s'," % daqVariable.deviceAddress \
              + " DataUnit='%s'," % daqVariable.dataUnit \
              + " DataType='%s'," % daqVariable.dataType \
              + " DataLenth=%d," % int(daqVariable.dataLength) \
              + " DataAddress=%d," % int(daqVariable.dataAddress) \
              + " DeviceName='%s'," % daqVariable.deviceName \
              + " DevicePort=%d," % int(daqVariable.devicePort) \
              + " DeviceUnit=%d," % int(daqVariable.deviceUnit) \
              + " FunCode=%d " % int(daqVariable.funCode) \
              + " where id=%d " % int(daqVariable.id)
        return self.mySqlDb.update(sql)

    def deleteVariable(self,group, _id):
        return self.mySqlDb.delete(self.convertDbName(self.database_daq_name), self.convertTableName(group), _id)

    def deleteVariables(self,group, id_list):
        for _id in id_list:
            rst = self.deleteVariable(group,_id)
            if not rst[0]:
                return [False,"删除id为%d的数据时发生错误，错误原因：%s"%(_id,rst[1])]
        return [True,"删除成功"]

    def selectLastVariable(self,group):
        return self.mySqlDb.selectLast(self.convertDbName(self.database_daq_name), self.convertTableName(group))

    def selectVariables(self, group):
        return self.mySqlDb.selectAll(self.convertDbName(self.database_daq_name), self.convertTableName(group))

    @testTool.mydecorator.showReturn
    def database_init(self):
        try:
            if not self.isDbExisted(self.database_daq_name):
                if self.createDb(self.database_daq_name)[0]:
                    return self.createVariableGroup(self.default_table_name)
            elif not self.isVariableGroupExisted(self.default_table_name):
                return self.createVariableGroup(self.default_table_name)
            return
        except Exception as e:
            return str(e)


class DaqVariableManageModel(DaqMySqlDb):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(DaqVariableManageModel, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        DaqMySqlDb.__init__(self)
        super(DaqVariableManageModel, self).__init__()


class DaqUploadManageModel:

    def __init__(self):
        self.uploadFilename = "./configure/upload.cfg"

    def __writeUploadSet(self,ip, port, database_name, username, password):
        rst = [None, None]
        fp = None
        try:
            fp = open(self.uploadFilename, "w")
            fp.write(ip)
            fp.write("\n")
            fp.write(port)
            fp.write("\n")
            fp.write(database_name)
            fp.write("\n")
            fp.write(username)
            fp.write("\n")
            fp.write(password)
            fp.write("\n")
            rst[0] = True
            rst[1] = "操作成功"
        except IOError:
            rst[0] = False
            rst[1] = "保存时出现错误，请重试"
        finally:
            if fp is not None:
                fp.close()
        return rst

    def __readUploadSet(self):
        fp = None
        rst = [None, None]
        try:
            fp = open(self.uploadFilename, "r")
            ip = fp.readline()
            port = fp.readline()
            database_name = fp.readline()
            username = fp.readline()
            password = fp.readline()
            if ip is None or port is None or database_name is None or \
                            username is None or password is None:
                raise IOError("File is Empty!")
            else:
                ip = ip[:-1]
                port = port[:-1]
                database_name = database_name[:-1]
                username = username[:-1]
                password = password[:-1]
                rst[0] = True
                rst[1] = [ip, port, database_name, username, password]
        except IOError:
            if fp is not None:
                fp.close()
            rst[0] = False
            rst[1] = "服务器端无远程数据库配置"
        finally:
            if fp is not None:
                fp.close()
        return rst

    # 封装接口
    # 获取远程数据库配置
    def getUploadSet(self):
        return self.__readUploadSet()

    # 设置远程数据库配置
    def setUploadSet(self,ip, port, database_name, username, password):
        return self.__writeUploadSet(ip, port, database_name, username, password)












