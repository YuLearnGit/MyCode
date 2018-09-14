from flask import jsonify
from networkManage.networkManageModel import NetworkManageModel
from utils import networkUtil
import testTool
networkModel = NetworkManageModel()

class NetworkManageCon:

    def __init__(self):
        pass
        self.myGateway = self.MyGateway()
        self.myNetPattern = self.MyNetPattern()
        self.myVpn = self.MyVpn()

    class MyGateway:

        def getGateway(self):
            gateway = networkModel.myGateway.getGateway()
            msg = dict()
            if gateway[0] and gateway[1] is not None:
                msg["success"] = "已读取服务器配置"
                msg["ip"] = gateway[1][0]
                msg["mask"] = gateway[1][1]
                return jsonify(msg)
            else:
                msg["error"] = "读取配置过程中发生错误"
                return jsonify(msg)

        def setGateway(self,form):
            changed = form["changed"]
            ip = form["ip"]
            mask = form["mask"]
            msg = dict()
            if ip is None or mask is None:
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
                return jsonify(msg)
            if not networkUtil.isIp(ip):
                msg["error"] = "IP地址格式不正确。正确如：192.168.1.1"
                return jsonify(msg)
            if not networkUtil.isMask(mask):
                msg["error"] = "掩码格式不正确。正确如：255.255.255.0"
                return jsonify(msg)
            gateway = networkModel.myGateway.getGateway()  # 检测rst[0]，false报错存储失败？
            if changed == "true" or ip != gateway[1][0] or mask != gateway[1][1]:
                rst = networkModel.myGateway.setGateway(ip, mask)
                if rst[0]:
                    msg["success"] = rst[1]
                else:
                    msg["error"] = rst[1]
                return jsonify(msg)
            else:
                msg["error"] = "您未做更改"
                return jsonify(msg)


    class MyNetPattern:
        def getNetPattern(self):
            rst = networkModel.myNetPattern.getNetPattern()
            msg = dict()
            if not rst[0]:
                msg["error"] = rst[1]
                return jsonify(msg)
            if rst[1][0] == "wifi":
                msg["success"] = "已读取服务器配置"
                msg["netmode"] = "wifi"
                msg["wifiname"] = rst[1][1][0]
                msg["wifipassword"] = rst[1][1][1]
                msg["ishidden"] = rst[1][1][2]
            elif rst[1][0] == "mobile3g":
                msg["error"] = "无配置"
            else:
                msg["error"] = "服务器发生了错误：找不到配置"
            return jsonify(msg)

        def setNetPattern(self,form):
            mode = form["mode"]
            msg = dict()
            if mode == "wifi":
                wifiname = form["wifiname"]
                wifipassword = form["wifipassword"]
                ishidden = form["ishidden"]
                rst = networkModel.myNetPattern.setNetPattern(mode, [wifiname, wifipassword, ishidden])
                if not rst[0]:
                    msg["error"] = rst[1]
                    return jsonify(msg)
                msg["success"] = rst[1]
                return jsonify(msg)
            elif mode == "mobile3g":
                print("post mobile3g")
                pass
            else:
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)

        def testNetPattern(self,form):
            mode = form["mode"]
            msg = dict()
            if mode == "wifi":
                rst = networkModel.myNetPattern.testWifi()
                if not rst[0]:
                    msg["error"] = rst[1]
                    return jsonify(msg)
                msg["success"] = "连接成功"
                msg["ip"] = rst[1][0]
                msg["broadcast"] = rst[1][1]
                msg["mask"] = rst[1][2]
            elif mode == "mobile3g":
                pass
            else:
                msg["error"] = "参数不正确，请使用浏览器刷新本页面"
            return jsonify(msg)

    class MyVpn:
        def __init__(self):
            pass

        def get(self):
            msg = dict()
            rst = networkModel.myVpn.get()
            if not rst[0]:
                msg["error"] = rst[1]
                # return jsonify(msg)
            else:
                msg["error"] = "服务器发生了错误：找不到配置"
            return jsonify(msg)

        def set(self,form):
            msg = dict()
            vpnserverip = form["vpnserverip"]
            vpnusername = form["vpnusername"]
            vpnpassword = form["vpnpassword"]
            rst = networkModel.myVpn.set(vpnserverip, vpnusername, vpnpassword)
            if not rst[0]:
                msg["error"] = rst[1]
                return jsonify(msg)
            msg["success"] = rst[1]
            return jsonify(msg)

        def test(self):
            msg = dict()
            rst = networkModel.myVpn.test()
            if not rst[0]:
                msg["error"] = rst[1]
                return jsonify(msg)
            msg["success"] = "连接成功"
            # js文件中接收返回值要改写
            msg["ip"] = rst[1][0]
            msg["broadcast"] = rst[1][1]
            msg["mask"] = rst[1][2]
            return jsonify(msg)

        def connect(self):
            msg = dict()
            rst = networkModel.myVpn.connect()
            if not rst[0]:
                msg["error"] = rst[1]
                return jsonify(msg)
            # 这步要看connect函数返回了啥，如果返回了ip等信息，要改写
            msg["success"] = rst[1]
            return jsonify(msg)

        def disconnect(self):
            msg = dict()
            rst = networkModel.myVpn.disconnect()
            ######################
            msg["error"] = rst[1]
            return jsonify(msg)