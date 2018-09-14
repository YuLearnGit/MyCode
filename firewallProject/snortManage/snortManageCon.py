from flask import jsonify
from snortManage.snortManageModel import SnortManageModel,SnortShModel,SnortFileModel,SnortRule
import testTool

class SnortManageCon:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(SnortManageCon, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        self.snortManageModel = SnortManageModel()
        self.snort_rule_temp = ""
        self.snort_category_temp = ""
        self.snort_comment_temp = ""
        pass

    def activateSnort(self):
        msg = dict()
        rst = SnortShModel.activateSnort()
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    def deactivateSnort(self):
        msg = dict()
        rst = SnortShModel.deactivateSnort()
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    def isActivatedSnort(self):
        msg = dict()
        rst = SnortShModel.isActivatedSnort()
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    def addSnortCategory(self,form):
        msg = dict()
        add_category = form["add_category"]
        if add_category == "":
            msg["error"] = "不能建立空分类"
            return jsonify(msg)
        rst = self.snortManageModel.createCategory(add_category)
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    def dropSnortCategory(self,form):
        msg = dict()
        drop_category = form["drop_category"]
        if drop_category == "":
            msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)
        rst = self.snortManageModel.dropCategory(drop_category)
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    def renameSnortCategory(self,form):
        msg = dict()
        old_category = form["old_category"]
        new_category = form["new_category"]
        if old_category == "" or new_category == "":
            msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)
        rst = self.snortManageModel.renameCategory(old_category, new_category)
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    @testTool.mydecorator.showReturn
    def showSnortCategories(self):
        msg = dict()
        rst = self.snortManageModel.showCategories()
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = "已读取服务器配置"
            msg["list"] = rst[1]
        return jsonify(msg)

    def addSnortRule(self,form):
        msg = dict()
        rst = SnortShModel.isActivatedSnort()
        if rst[0]:
            msg["error"] = "添加失败，原因：" + rst[1]
            return jsonify(msg)
        category = form["category"]
        if category == "":
            msg["error"] = "没有指定规则类别"
            return jsonify(msg)
        comment = form["comment"]
        action = form["action"]
        protocol = form["protocol"]
        direction = form["direction"]
        src_ip = form["src_ip"]
        src_port = form["src_port"]
        dst_ip = form["dst_ip"]
        dst_port = form["dst_port"]
        classtype = form["classtype"]
        flow_1 = form["flow_1"]
        flow_2 = form["flow_2"]
        content = form["content"]
        # nocase = request.form["nocase"]
        offset = form["offset"]
        depth = form["depth"]
        gid = form["gid"]
        sid = form["sid"]
        rev = form["rev"]
        priority = form["priority"]
        message = form["msg"]
        other = form["other"]
        modbustcp = form["modbustcp"]
        modbus_func = form["modbus_func"]
        modbus_unit = form["modbus_unit"]
        modbus_data = form["modbus_data"]
        if direction == "<>":
            direction = "<>"
        else:
            direction = "->"

        # 应该检查合法性
        rules_headers = "{0:s} {1:s} {2:s} {3:s} {4:s} {5:s} {6:s}".format(action, protocol, src_ip, src_port,
                                                                           direction, dst_ip, dst_port)
        # print(rules_headers)
        # 如何字符串提高效率？
        rules_options = "("
        if classtype != "0" and classtype != "":
            classtype = "classtype:{0:s}; ".format(classtype)
            rules_options += classtype
        if flow_1 != "0" and flow_1 != "":
            flow = "flow:{0:s}".format(flow_1)
            if flow_2 != "0" and flow_2 != "":
                flow += ",{0:s}; ".format(flow_2)
            else:
                flow += "; "
            rules_options += flow
        elif flow_2 != "0" and flow_2 != "":
            flow = "flow:{0:s}; ".format(flow_2)
            rules_options += flow
        if content != "":
            #    content = "content:{0:s};".format(content)
            rules_options += content
        # if nocase == "1":
        #    rules_options += "nocase;"
        if offset != "":
            offset = "offset:{0:s}; ".format(offset)
            rules_options += offset
        if depth != "":
            depth = "depth:{0:s}; ".format(depth)
            rules_options += depth
        if gid != "":
            gid = "gid:{0:s}; ".format(gid)
            rules_options += gid
        if sid != "":
            sid = "sid:{0:s}; ".format(sid)
            rules_options += sid
        if rev != "":
            rev = "rev:{0:s}; ".format(rev)
            rules_options += rev
        if priority != "":
            priority = "priority:{0:s}; ".format(priority)
            rules_options += priority
        if message != "":
            message = "msg:\"{0:s}\"; ".format(message)
            rules_options += message
        if other != "":
            rules_options += other
        if modbustcp == "1":
            if modbus_func != "0":
                rules_options += "modbus_func:{0:s}; ".format(modbus_func)
            if modbus_unit != "":
                rules_options += "modbus_unit:{0:s}; ".format(modbus_unit)
            if modbus_data != "":
                rules_options += "modbus_data;content:\"{0:s}\"; ".format(modbus_data)
        rules_options += ")"
        self.snort_rule_temp = rules_headers + " " + rules_options
        self.snort_category_temp = category
        self.snort_comment_temp = comment
        # print(snortruletemp);
        msg["success"] = "已组建规则"
        msg["category"] = self.snort_category_temp
        msg["rule"] = self.snort_rule_temp
        msg["comment"] = self.snort_comment_temp
        return jsonify(msg)

    def commitRule(self,form):
        msg = dict()
        rst = SnortShModel.isActivatedSnort()
        if rst[0]:
            msg["error"] = "添加失败，原因：" + rst[1]
            return jsonify(msg)
        category = form["category"]
        rule = form["rule"]
        comment = form["comment"]
        if self.snort_rule_temp == rule and category == self.snort_category_temp and comment == self.snort_comment_temp:
            insertrst = self.snortManageModel.insertRule(category, SnortRule(0, rule, comment))
            if insertrst[0]:
                msg["success"] = insertrst[1]
            else:
                msg["error"] = insertrst[1]
            self.snort_rule_temp = ""
            self.snort_category_temp = ""
            self.snort_comment_temp = ""
            return jsonify(msg)
        else:
            msg["error"] = "提交的数据出错！请重试"
            pass
            return jsonify(msg)

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def deleteRule(self,form):
        msg = dict()
        rst = SnortShModel.isActivatedSnort()
        if rst[0]:
            msg["error"] = "删除失败，原因：" + rst[1]
            return jsonify(msg)
        ids = form["ids"]
        category = form["category"]
        # ids = ids[:-1]#去掉最后一个","
        if ids == "" or category == "":
            msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)
        listid = ids.split(",")
        print(listid)
        rst = self.snortManageModel.deleteRules(category, listid)
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def selectRules(self,form):
        msg = dict()
        category = form["category"]
        if category == "":
            msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)
        rst = self.snortManageModel.selectRules(category)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "已读取规则"
        msg["data"] = rst[1]
        return jsonify(msg)



