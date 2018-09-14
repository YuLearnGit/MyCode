from flask import jsonify
import time
from daqManage.daqManageModel import DaqVariableManageModel,DaqUploadManageModel,DaqVariable
from daqManage.acq_cache import acq_cache
import testTool
class DaqManageCon:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(DaqManageCon, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        self.daqVariableManageModel = DaqVariableManageModel()
        self.daqUploadManageModel = DaqUploadManageModel()
        self.daqActivateCon = DaqActivateCon()

    def isActivateDaq(self):
        msg = dict()
        if self.daqActivateCon.isAcqActivated():
            msg["error"] = "已启动，如果未在采集数据，请稍候再查询或检查采集线路是否正常"
            return jsonify(msg)
        rst = self.daqActivateCon.acqActivate()
        if not rst[0]:
            msg["error"] = "以下变量有问题(若提示所有变量有问题，请稍候再查询或检查采集线路是否正常)：\n" + str(rst[1])
            return jsonify(msg)
        msg["success"] = "已启动"
        return jsonify(msg)

    def deactivateDaq(self):
        msg = dict()
        if not self.daqActivateCon.isAcqActivated():
            msg["error"] = "未启动，无需停止"
            return jsonify(msg)
        rst = self.daqActivateCon.acqDeactivate()
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "停止成功"
        return jsonify(msg)

    def getDaqStatus(self):
        msg = dict()
        rst1 = self.daqActivateCon.isAcqActivated()
        rst2 = self.daqActivateCon.isAcqSaved()
        if not rst1:
            msg["success"] = "未启动"
            # return jsonify(msg)
        elif rst2:
            msg["success"] = "已启动，正在采集数据"
            # return jsonify(msg)
        elif not rst2:
            msg["success"] = "已启动，但未在采集数据，请稍候再查询或检查采集线路是否正常"
            # return jsonify(msg)
        return jsonify(msg)

    def setUpload(self,form):
        msg = dict()
        if self.daqActivateCon.isUploadActivated():
            msg["error"] = "提交失败，原因：已启动，请停止后再提交"
            return jsonify(msg)
        remote_ip = form["remote_ip"]
        remote_port = form["remote_port"]
        remote_database_name = form["remote_database_name"]
        remote_username = form["remote_username"]
        remote_password = form["remote_password"]
        if remote_ip == "" or remote_port == "" or remote_database_name == "" or remote_username == "" or remote_password == "":
            msg["error"] = "有必填项为空"
            return jsonify(msg)
        rst = self.daqUploadManageModel.setUploadSet(remote_ip, remote_port, remote_database_name, remote_username, remote_password)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = rst[1]
        return jsonify(msg)

    def activateUpload(self):
        msg = dict()
        if self.daqActivateCon.isUploadActivated():
            msg["error"] = "已启动，如果未在上传数据，请稍候再查询或检查数据库配置或网络连接是否正常"
            return jsonify(msg)
        rst = self.daqActivateCon.uploadActivate()
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "已启动"
        return jsonify(msg)

    def deactivateUpload(self):
        msg= dict()
        if not self.daqActivateCon.isUploadActivated():
            msg["error"] = "未启动，无需停止"
            return jsonify(msg)
        rst = self.daqActivateCon.uploadDeactivate()
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "停止成功"
        return jsonify(msg)

    def getUploadStatus(self):
        msg = dict()
        rst1 = self.daqActivateCon.isUploadActivated()
        rst2 = self.daqActivateCon.isUploadSaved()
        if not rst1:
            msg["success"] = "未启动"
        elif rst2:
            msg["success"] = "已启动，正在上传数据"
        elif not rst2:
            msg["success"] = "已启动，但未在上传数据，请稍候再查询或检查数据库配置是否正确或网络连接是否正常"
        return jsonify(msg)

    def getUpload(self):
        msg = dict()
        rst = self.daqUploadManageModel.getUploadSet()
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "已加载服务器配置"
        msg["remote_ip"] = rst[1][0]
        msg["remote_port"] = rst[1][1]
        msg["remote_database_name"] = rst[1][2]
        msg["remote_username"] = rst[1][3]
        msg["remote_password"] = rst[1][4]
        return jsonify(msg)

    def listVariables(self):
        msg = dict()
        rst = self.daqVariableManageModel.selectVariables(self.daqVariableManageModel.default_table_name)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        l = list()
        for t in rst[1]:
            r = DaqVariable(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10])
            l.append(r.__dict__)
        msg["success"] = "已读取保存的变量"
        msg["data"] = l
        return jsonify(msg)

    def appendVariable(self,form):
        msg = dict()
        if self.daqActivateCon.isAcqActivated():
            msg["error"] = "添加失败，原因：数据采集已启动，请停止后再添加"
            return jsonify(msg)
        dataName = form["dataName"]
        deviceAddress = form["deviceAddress"]
        dataUnit = form["dataUnit"]
        dataType = form["dataType"]
        dataLength = form["dataLength"]
        dataAddress = form["dataAddress"]
        deviceName = form["deviceName"]
        devicePort = form["devicePort"]
        deviceUnit = form["deviceUnit"]
        funCode = form["funCode"]
        rst = self.daqVariableManageModel.insertVariable(self.daqVariableManageModel.default_table_name,
                                   DaqVariable(0, dataName, deviceAddress, dataUnit, dataType, dataLength,
                                                     dataAddress, deviceName, devicePort, deviceUnit, funCode))
        #print(rst)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        record = self.daqVariableManageModel.selectLastVariable(self.daqVariableManageModel.default_table_name)
        #print(record)
        if not record[0]:
            msg["error"] = "添加成功，但读取出错，请刷新再试，错误原因：%s\n" % (record[1])
            return jsonify(msg)
        r = DaqVariable(record[1][0], record[1][1], record[1][2], record[1][3], record[1][4],
                              record[1][5], record[1][6], record[1][7], record[1][8], record[1][9], record[1][10])
        msg["success"] = "添加成功"
        msg["addRecord"] = r.__dict__
        return jsonify(msg)

    def deleteVariable(self,form):
        msg = dict()
        _id = form["id"]
        rst = self.daqVariableManageModel.deleteVariable(self.daqVariableManageModel.default_table_name, _id)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = rst[1]
        return jsonify(msg)

    def updateVariable(self,form):
        msg = dict()
        if self.daqActivateCon.isAcqActivated():
            msg["error"] = "修改失败，原因：数据采集已启动，请停止后再修改"
            return jsonify(msg)
        _id = form["id"]
        dataName = form["dataName"]
        deviceAddress = form["deviceAddress"]
        dataUnit = form["dataUnit"]
        dataType = form["dataType"]
        dataLength = form["dataLength"]
        dataAddress = form["dataAddress"]
        deviceName = form["deviceName"]
        devicePort = form["devicePort"]
        deviceUnit = form["deviceUnit"]
        funCode = form["funCode"]
        newDaqVariable =DaqVariable(_id, dataName, deviceAddress, dataUnit, dataType, dataLength,
                                                     dataAddress, deviceName, devicePort, deviceUnit, funCode)
        rst = self.daqVariableManageModel.updateVariable(self.daqVariableManageModel.default_table_name,newDaqVariable)
        #print(rst)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "修改成功"
        return jsonify(msg)

class DaqActivateCon:

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(DaqActivateCon, cls).__new__(cls)
        return cls._inst


    def __init__(self):
        self.daqUploadManageModel = DaqUploadManageModel

    ####封装acq操作###
    @testTool.mydecorator.showReturn
    def acqActivate(self):
        #print("acqActivate")
        rst = acq_cache.data_acq_start()
        #print(rst)
        return rst

    @testTool.mydecorator.showReturn
    def acqDeactivate(self):
        #print("acqDeactivate")
        rst = acq_cache.data_acq_stop()
        #print(rst)
        return rst

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def isAcqActivated(self):
        #print("isAcqActivated")
        rst = acq_cache.data_acq_start_status()
        #print(rst)
        return rst

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def isAcqSaved(self):
        #print("isAcqSaved")
        rst = acq_cache.data_acq_status()
        #print(rst)
        return rst

    #####封装daqUpload操作####
    @testTool.mydecorator.showReturn
    def uploadActivate(self):
        #print("uploadActivate")
        # return  __shActivateDaq()
        rst = self.daqUploadManageModel.getUploadSet()
        if not rst[0]:
            return [False, "无远程数据库配置，不能启动"]
        rst = acq_cache.data_upload_start(db_name=rst[1][2], user=rst[1][3], passwd=rst[1][4], db_host=rst[1][0],
                                              port=rst[1][1])
        #print(rst)
        return rst

    @testTool.mydecorator.showReturn
    def uploadDeactivate(self):
        #print("uploadDeactivate")
        rst = acq_cache.data_upload_stop()
        #print(rst)
        return rst

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def isUploadActivated(self):
        #print("isUploadActivated")
        rst = acq_cache.data_upload_start_status()
        #print(rst)
        return rst

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def isUploadSaved(self):
        #print("isUploadSaved")
        rst = acq_cache.data_upload_status()
        #print(rst)
        return rst

class DaqMonitorCon:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(DaqMonitorCon, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        self.t1 = 1
        self.t2 = 2
        self.t3 = 3
        pass

    def monitorVariables(self,form):
        ids = form["ids"]
        id_list = ids.split(",")
        msg = dict()
        msg["success"] = "查询成功"
        msg['data'] = self.test(id_list)
        return jsonify(msg)

    def test(self,id_list):
        rst_dict = dict()
        for _id in id_list:
            if _id == "1":
                rst_dict[_id] = self.t1
                self.t1 += 1
            elif _id == "2":
                rst_dict[_id] = self.t2
                self.t2 += 1
            elif _id == "3":
                rst_dict[_id] = self.t3
                self.t3 += 1
            else:
                rst_dict["0"] = -1
            rst_dict["time"] = time.time()
        return rst_dict