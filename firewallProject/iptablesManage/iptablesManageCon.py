from flask import jsonify
from iptablesManage.iptablesManageModel import IptablesManageModel,IptablesRule


class IptablesManageCon:
    def __init__(self):
        self.iptablesManageModel = IptablesManageModel()
        self.iptables_rule_temp = ""
        self.iptables_comment_temp = ""

    def addIptablesRule(self,form):
        msg = dict()
        rule = "iptables "
        append_table = form["append_table"]
        append_chain = form["append_chain"]
        protocol = form["protocol"]
        ip_version = form["ip_version"]
        src_ip = form["src_ip"]
        src_port = form["src_port"]
        dst_ip = form["dst_ip"]
        dst_port = form["dst_port"]
        in_interface = form["in_interface"]
        out_interface = form["out_interface"]
        other1 = form["other1"]
        target = form["target"]
        other2 = form["other2"]
        if append_table != "":
            append_table = " -t {0} ".format(append_table)
            rule += append_table
        if append_chain != "0" and append_chain != "":
            append_chain = " -A {0} ".format(append_chain)
            rule += append_chain
        if protocol != "0" and protocol != "":
            protocol = " -p {0} ".format(protocol)
            rule += protocol
        if ip_version == "ipv4":
            rule += " -4 "
        elif ip_version == "ipv6":
            rule += " -6 "
        if src_ip != "":
            src_ip = " -s {0} ".format(src_ip)
            rule += src_ip
        if src_port != "":
            src_port = " --sport {0} ".format(src_port)
            rule += src_port
        if dst_ip != "":
            dst_ip = " -d {0} ".format(dst_ip)
            rule += dst_ip
        if dst_port != "":
            dst_port = " --dport {0} ".format(dst_port)
            rule += dst_port
        if in_interface != "0" and in_interface != "":
            in_interface = " -i {0} ".format(in_interface)
            rule += in_interface
        if out_interface != "0" and out_interface != "":
            out_interface = " -o {0} ".format(out_interface)
            rule += out_interface
        if other1 != "":
            rule += other1
        if target != "":
            target = " -j {0} ".format(target)
            rule += target
        if other2 != "":
            rule += other2
        self.iptables_comment_temp = form["comment"]
        pass
        self.iptables_rule_temp = rule
        msg["success"] = "已组建规则"
        msg["rule"] = self.iptables_rule_temp
        msg["comment"] = self.iptables_comment_temp
        return jsonify(msg)

    def commitRule(self,form):
        msg = dict()
        rule = form["rule"]
        comment = form["comment"]
        if self.iptables_rule_temp == rule and comment == self.iptables_comment_temp:
            rst = self.iptablesManageModel.insertRule(
                self.iptablesManageModel.default_table_name, IptablesRule(0, rule, comment))
            if rst[0]:
                msg["success"] = rst[1]
            else:
                msg["error"] = rst[1]
            self.iptables_comment_temp = ""
            self.iptables_rule_temp = ""
            return jsonify(msg)
        else:
            msg["error"] = "提交的数据出错！请重试"
            pass
            return jsonify(msg)

    #未用到
    def getRuleCategories(self):
        msg = dict()
        rst = self.iptablesManageModel.showCategories()
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = "已读取服务器配置"
            msg["list"] = rst[1]
        return jsonify(msg)


    def getRules(self):
        msg = dict()
        rst = self.iptablesManageModel.selectRules(self.iptablesManageModel.default_table_name)
        if not rst[0]:
            msg["error"] = rst[1]
            return jsonify(msg)
        msg["success"] = "已读取规则"
        msg["data"] = rst[1]
        return jsonify(msg)

    def deleteRules(self,form):
        msg = dict()
        ids = form["ids"]
        # category = request.form["category"]
        # ids = ids[:-1]#去掉最后一个","
        if ids == "":
            msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)
        listid = ids.split(",")
        #print(listid)
        rst = self.iptablesManageModel.deleteRules(self.iptablesManageModel.default_table_name, listid)
        if not rst[0]:
            msg["error"] = rst[1]
        else:
            msg["success"] = rst[1]
        return jsonify(msg)


