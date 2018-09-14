import os
import subprocess
from utils import networkUtil
from utils.jsonFileUtil import JsonFileUtil
import testTool

class NetworkSettingFile(JsonFileUtil):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(NetworkSettingFile, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            super(NetworkSettingFile, self).__init__("./configure/network.cfg")

class NetworkManageModel:
    def __init__(self):
        NetworkSettingFile()
        #self.gatewayFilename = "./cfg/gateway.cfg"
        self.myGateway = self.MyGateway()
        self.myNetPattern = self.MyNetPattern()
        self.myVpn = self.MyVpn()
        pass

    class MyGateway:
        """
        "gateway":{
            ip:"192.168.1.2",
            mask:"255.255.255.0"
        }
        """
        def __init__(self):
            self.configure_name = "gateway"
            self.setting = NetworkSettingFile()
            # self.gatewayFilename = "./cfg/gateway.cfg"
            pass

        def __readGateway(self):
            rst = self.setting.getValue(self.configure_name)
            if rst[0]:
                return [True, [rst[1]["ip"], rst[1]["mask"]]]
            else:
                gateway = dict()
                gateway["ip"] = "192.168.1.2"
                gateway["mask"] = "255.255.255.0"
                self.setting.set(self.configure_name, gateway)
                return [True,[gateway["ip"],gateway["mask"]]]
            # fp = None
            # ip = None
            # mask = None
            # try:
            #
            #     fp = open(self.gatewayFilename, "r")
            #     ip = fp.readline()
            #     mask = fp.readline()
            #     if ip is None or mask is None:
            #         raise IOError("File is Empty!")
            #     else:
            #         ip = ip[:-1]
            #         mask = mask[:-1]
            # except IOError:
            #     if fp is not None:
            #         fp.close()
            #     fp = open(self.gatewayFilename, "w")
            #     # should be encrypt
            #     default_ip = "192.168.1.2"
            #     default_mask = "255.255.255.0"
            #     fp.write("%s\n" % default_ip)
            #     fp.write("%s\n" % default_mask)
            #     ip = default_ip
            #     mask = default_mask
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return [True, [ip, mask]]

        # 将网关设置写入文件
        def __writeGateway(self, ip, mask):
            rst = [None, None]
            gateway = dict()
            gateway["ip"] = ip
            gateway["mask"] = mask
            rst = self.setting.set(self.configure_name, gateway)
            return rst


            # fp = None
            #
            # try:
            #     fp = open(self.gatewayFilename, "w")
            #     # 应该先读取出来再保存操作，如果网络重启失败，需要写回原数据
            #     fp.write(ip)
            #     fp.write("\n")
            #     fp.write(mask)
            #     fp.write("\n")
            #     rst[0] = True
            #     rst[1] = "操作成功"
            # except IOError:
            #     rst[0] = False
            #     rst[1] = "保存时出现错误，请重试"
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return rst

        # 获取网关配置
        @testTool.mydecorator.showReturn
        def getGateway(self):
            return self.__readGateway()


        # 设置网关
        @testTool.mydecorator.showReturn
        def setGateway(self, ip, mask):
            rst = self.__shcfgGateway(ip, mask)
            if not rst[0]:
                return rst
            rst1 = self.__writeGateway(ip, mask)
            if not rst1[0]:
                return rst1
            return rst

        # 用网关的设置配置网络并重启网络
        def __shcfgGateway(self, ip, mask):
            rst = [None, None]
            if not os.path.isfile("/etc/network/interfaces.backup"):
                # p = subprocess.Popen(["sudo","cp","/etc/network/interfaces","/etc/network/interfaces.backup"],shell=True)
                p = subprocess.Popen(["sudo cp /etc/network/interfaces /etc/network/interfaces.backup"], shell=True)
                p.wait()
                if p.poll() != 0:
                    rst[0] = False
                    rst[1] = "旧文件备份失败"
                    return rst
            p = subprocess.Popen(["sudo chmod 666 /etc/network/interfaces"], shell=True)
            p.wait()
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "配置失败：无法更改权限"
                return rst
            fo = None
            try:  # 写入interfaces文件
                fo = open("/etc/network/interfaces", "w")
                fo.write("source-directory /etc/network/interfaces.d\n")
                fo.write("auto lo\n")
                fo.write("iface lo inet loopback\n")
                fo.write("auto eth0\n")
                fo.write("allow-hotplug eth0\n")
                fo.write("iface eth0 inet static\n")
                fo.write("    address {0}\n".format(ip))
                fo.write("    netmask {0}\n".format(mask))
                fo.write("auto wlan0\n")
                fo.write("allow-hotplug wlan0\n")
                fo.write("iface wlan0 inet manual\n")
                fo.write("    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf\n")
                fo.write("auto wlan1\n")
                fo.write("allow-hotplug wlan1\n")
                fo.write("iface wlan1 inet manual\n")
                fo.write("    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf\n")
                rst[0] = True
                rst[1] = "配置成功：请使用{0}:5000来登录本系统".format(ip)
            except:
                rst[0] = False
                rst[1] = "配置失败：无法写入文件，权限不足"
            finally:
                if fo is not None:
                    fo.close()
            # 重启网络
            p = subprocess.Popen(["sudo /etc/init.d/networking restart"], shell=True, stdout=subprocess.PIPE)
            while p.poll() is None:
                print(p.stdout.readline())
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "配置已写入，但无法重启网络，请重启本设备再试"
                return rst
            p = subprocess.Popen(["sudo chmod 644 /etc/network/interfaces"], shell=True)
            return rst

    class MyNetPattern:
        """
        "netPattern":{
            "pattern":"wifi", or "mobile3g"
            "wifi":{

                },
            "mobile3g":{

                }
            }
        """
        def __init__(self):
            self.configure_name = "netPattern"
            self.setting = NetworkSettingFile()
            # self.netPatternFilename = "./cfg/netPattern.cfg"
            # self.wifiSetFilename = "./cfg/wifiSet.cfg"

        # 读取文件中当前网络模式的设定
        def __readNetPattern(self):
            rst = self.setting.getValue([self.configure_name,"pattern"])
            if rst[0]:
                return [True,rst[1]]
            else:
                default_pattern = "wifi"
                self.setting.set([self.configure_name, "pattern"], default_pattern)
                return [True,default_pattern]
            # fp = None
            # pattern = None
            # try:
            #     fp = open(self.netPatternFilename, "r")
            #     pattern = fp.readline()
            #     if pattern is None:
            #         raise IOError("File is Empty!")
            #     else:
            #         pattern = pattern[:-1]
            # except IOError:
            #     if fp is not None:
            #         fp.close()
            #     fp = open(self.netPatternFilename, "w")
            #     default_pattern = "wifi"
            #     fp.write("%s\n" % default_pattern)
            #     pattern = default_pattern
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return [True, pattern]

        # 记录当前选择的网络模式
        def __writeNetPattern(self,pattern):
            rst = self.setting.set([self.configure_name, "pattern"], pattern)
            return rst
            # fp = None
            # rst = [None, None]
            # try:
            #     fp = open(self.netPatternFilename, "w")
            #     fp.write(pattern)
            #     fp.write("\n")
            #     rst[0] = True
            #     rst[1] = "操作成功"
            # except IOError:
            #     rst[0] = False
            #     rst[1] = "无法写入文件"
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return rst

        # 读取文件中Wifi的配置
        def __readWifiSet(self):
            rst = self.setting.getValue([self.configure_name, "wifi"])
            if rst[0]:
                rst[1] = [rst[1]["wifiName"], rst[1]["wifiPassword"], rst[1]["isHidden"]]
            else:
                rst[1] = "服务器端无Wifi配置"
            return rst
            # fp = None
            # rst = [None, None]
            # wifiname = None
            # wifipassword = None
            # ishidden = None
            # try:
            #     fp = open(self.wifiSetFilename, "r")
            #     wifiname = fp.readline()
            #     wifipassword = fp.readline()
            #     ishidden = fp.readline()
            #     if wifiname is None or wifipassword is None or ishidden is None:
            #         raise IOError("File is Empty!")
            #     else:
            #         wifiname = wifiname[:-1]
            #         wifipassword = wifipassword[:-1]
            #         ishidden = ishidden[:-1]
            #         rst[0] = True
            #         rst[1] = [wifiname, wifipassword, ishidden]
            # except IOError:
            #     if fp is not None:
            #         fp.close()
            #     rst[0] = False
            #     rst[1] = "服务器端无Wifi配置"
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return rst

        # 在文件中记录WIFI配置
        def __writeWifiSet(self,wifiname, wifipassword, ishidden):
            wifi_setting = {
                "wifiName":wifiname,
                "wifiPassword":wifipassword,
                "isHidden":ishidden
            }
            return self.setting.set([self.configure_name, "pattern", "wifi"], wifi_setting)
            # fp = None
            # rst = [None, None]
            # try:
            #     fp = open(self.wifiSetFilename, "w")
            #     fp.write(wifiname)
            #     fp.write("\n")
            #     fp.write(wifipassword)
            #     fp.write("\n")
            #     fp.write(ishidden)
            #     fp.write("\n")
            #     rst[0] = True
            #     rst[1] = "保存成功"
            # except:
            #     rst[0] = False
            #     rst[1] = "保存时出现错误，请重试"
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return rst

        # 将wifi信息，写入系统配置文件
        def __shcfgWifi(self,wifiname, wifipassword, ishidden):
            rst = [None, None]
            if not os.path.isfile("/etc/wpa_supplicant/wpa_supplicant.backup"):
                p = subprocess.Popen(
                    ["sudo cp /etc/wpa_supplicant/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.backup"],
                    shell=True)
                p.wait()
                if p.poll() != 0:
                    rst[0] = False
                    rst[1] = "旧文件备份失败"
                    return rst
            p = subprocess.Popen(["sudo chmod 666 /etc/wpa_supplicant/wpa_supplicant.conf"], shell=True)
            p.wait()
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "配置失败，无法更改权限"
                return rst
            fo = None
            try:
                fo = open("/etc/wpa_supplicant/wpa_supplicant.conf", "w")
                fo.write("ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n")
                fo.write("update_config=1\n")
                fo.write("country=CN\n")  # CN or US or UK ??
                fo.write("network={\n")
                fo.write("    ssid=\"{0}\"\n".format(wifiname))
                if wifipassword != "":
                    fo.write("    psk=\"{0}\"\n".format(wifipassword))
                else:
                    fo.write("    key_mgmt=NONE\n")
                if ishidden == "1":
                    fo.write("    scan_ssid=1\n")
                fo.write("}\n")
                rst[0] = True
                rst[1] = "配置写入成功，请点击测试按钮测试是否能连接上Wifi"
            except:
                rst[0] = False
                rst[1] = "配置失败：无法写入文件，权限不足"
            finally:
                if fo is not None:
                    fo.close()
            p = subprocess.Popen(["sudo rfkill unblock 0"], shell=True, stdout=subprocess.PIPE)
            while p.poll() is None:
                print(p.stdout.readline())
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "配置已写入，打开wifi设备失败，请重启本设备再试"
                return rst
            p = subprocess.Popen(["sudo /etc/init.d/networking restart"], shell=True, stdout=subprocess.PIPE)
            while p.poll() is None:
                print(p.stdout.readline())
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "配置已写入，但无法重启网络，请重启本设备再试"
                return rst
            p = subprocess.Popen(["sudo chmod 644 /etc/network/interfaces"], shell=True)
            p.wait()
            return rst

        # 测试WIFI是否连接成功，获取ip等信息
        def __shtestWifi(self):
            rst = [False, None]
            p = subprocess.Popen(["ifconfig wlan0"], shell=True, stdout=subprocess.PIPE)
            while True:
                line = p.stdout.readline()
                line = line.decode("utf-8")
                if p.poll() is not None and line == "":
                    break
                line.lstrip()
                if "inet addr" in line:
                    sp = line.split()
                    ip = sp[1][5:]
                    broadcast = sp[2][6:]
                    mask = sp[3][5:]
                    rst[0] = True
                    rst[1] = [ip, broadcast, mask]
            if not rst[0]:
                rst[1] = "未连接成功"
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "查询命令出错"
                return rst
            return rst

        def testNetPattern(self):
            pass

        def testWifi(self):
            return self.__shtestWifi()

        # 获取网络模式和其配置
        def getNetPattern(self):
            netPattern = self.__readNetPattern()
            if netPattern[0]:
                print(netPattern[1])
                if netPattern[1] == "wifi":
                    wifiSet = self.__readWifiSet()
                    if wifiSet[0]:
                        return [True, ["wifi", wifiSet[1]]]
                    else:
                        return [False, wifiSet[1]]
                elif netPattern[1] == "mobile3g":
                    print("readMobile3gSet")
                    pass
                    return [False, ["服务器端无3g配置"]]
                else:
                    return [False, ["无法打开指定文件"]]
            return [False, ["服务器发生了错误"]]

        # 设置网络模式和其配置
        def setNetPattern(self,pattern, args):
            if pattern == "wifi":
                rst = self.__shcfgWifi(args[0], args[1], args[2])
                if not rst[0]:
                    return rst
                rst1 = self.__writeWifiSet(args[0], args[1], args[2])
                if not rst1[0]:
                    return rst1
                return rst
            elif pattern == "mobile3g":
                rst = [False, "无需存储"]
                return rst

    class MyVpn:
        """
        "vpn":{
            "serverIp": ,
            "username": ,
            "password": ,
            "route":
        }
        """
        def __init__(self):
            self.setting = NetworkSettingFile()
            self.configure_name = "vpn"
            # pass
            # self.vpnFilename = "./cfg/vpn.cfg"
            # self.routeFilename = "./cfg/route.cfg"

        def __read(self):
            rst = self.setting.getValue(self.configure_name)
            if rst[0]:
                rst[1] = [rst[1]["serverIp"],rst[1]["username"],rst[1]["password"]]
            else:
                rst[1] = "服务器端无VPN配置"
            return rst
            # fp = None
            # serverip = None
            # username = None
            # password = None
            # rst = [None, None]
            # try:
            #     fp = open(self.vpnFilename, "r")
            #     serverip = fp.readline()
            #     username = fp.readline()
            #     password = fp.readline()
            #     if serverip is None or username is None or password is None:
            #         raise IOError("File is Empty!")
            #     else:
            #         serverip = serverip[:-1]
            #         username = username[:-1]
            #         password = password[:-1]
            #         rst[0] = True
            #         rst[1] = [serverip, username, password]
            # except IOError:
            #     if fp is not None:
            #         fp.close()
            #     rst[0] = False
            #     rst[1] = "服务器端无VPN配置"
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return rst

        def get(self):
            return self.__read()

        def __write(self,serverip, username, password):
            vpn_setting = {
                "serverIp":serverip,
                "username":username,
                "password":password
            }
            rst = self.setting.set(self.configure_name, vpn_setting)
            return rst
            # fp = None
            # rst = [None, None]
            # try:
            #     fp = open(self.vpnFilename, "w")
            #     fp.write(serverip)
            #     fp.write("\n")
            #     fp.write(username)
            #     fp.write("\n")
            #     fp.write(password)
            #     fp.write("\n")
            #     rst[0] = True
            #     rst[1] = "保存成功"
            # except IOError as e:
            #     rst[0] = False
            #     rst[1] = "保存时出现错误，请重试"
            #     print(e)
            # finally:
            #     if fp is not None:
            #         fp.close()
            # return rst

        def set(self,serverip, username, password):
            return self.__write(serverip, username, password)

        def test(self):
            rst = [False, "未连接成功"]
            p = subprocess.Popen(["sudo ifconfig ppp0 "], shell=True, stdout=subprocess.PIPE)
            while True:
                line = p.stdout.readline()
                line = line.decode("utf-8")
                if p.poll() is not None and line == "":
                    break
                line.lstrip()
                if "error" in line:
                    rst[0] = False
                    rst[1] = "未连接成功"
                elif "inet addr" in line:
                    sp = line.split()
                    ip = sp[1][5:]
                    broadcast = sp[2][6:]
                    mask = sp[3][5:]
                    rst[0] = True
                    rst[1] = [ip, broadcast, mask]

            return rst

        def addRoute(self,ip, mask):
            rst = [None, None]
            net = networkUtil.intToIp(networkUtil.ipToInt(ip) & networkUtil.ipToInt(mask))
            command = "sudo route add -net " + net + " netmask " + mask + " ppp0"
            p = subprocess.Popen([command], shell=True)
            p.wait()
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "路由添加失败"
            pass

        #
        def __connect(self,serverip, username, password):
            p = subprocess.Popen(["sudo rm -f /etc/ppp/chap-secrets"])
            p.wait()
            rst = [False, None]
            command = "sudo pptpsetup --create pptpd --server " + serverip + " --username " + username + " --password " + password + " --encrypt --start "
            p = subprocess.Popen([command], shell=True, stdout=subprocess.PIPE)
            while True:
                line = p.stdout.readline()
                line = line.decode("utf-8")
                if p.poll() is not None and line == "":
                    break
                line.lstrip()
                if "terminated" in line:
                    rst[0] = False
                    rst[1] = "未连接成功"
                pass
                # 怎样算连接成功？
            return rst
            if p.poll() != 0:
                rst[0] = False
                rst[1] = "连接失败"
                return rst
            pass
            pass

        def connect(self):
            vpnset = self.__read()
            if not vpnset[0]:
                return vpnset
            rst = [False, None]
            serverip = vpnset[1][0]
            username = vpnset[1][1]
            password = vpnset[1][2]
            # 应该断开已存在的连接
            connectrst = self.__connect(serverip, username, password)
            if not connectrst[0]:
                return connectrst
            # 如果上一步能测出连接成功，能获取Ip等信息，那这里还需要调用测试函数么
            testrst = self.test()
            if not testrst:
                return testrst
            self.addRoute(testrst[1][0], testrst[1][2])
            return rst

        def disconnect(self):
            # 如何断开连接？
            return [False, None]