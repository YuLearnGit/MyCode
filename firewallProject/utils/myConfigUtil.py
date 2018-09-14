import os
import subprocess
import testTool

# zj create at 2017-05-09 9:11
# rewrite to OOP at 2017-07-05 17:27
# 用途：读取配置文件

class MyConfig:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(MyConfig, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        if not hasattr(self,"_init_complete"):
            self._init_complete = True

            #配置文件路径和打开编码
            self.conf_file = "./configure/firewall.conf"
            self.encode_type = "utf-8"

            self.conf = dict()
            self.initConf()
            self.readConfFile()
            self.listConf()

    #默认值
    def initConf(self):
        self.conf["command_activate_snort"] \
            = "sudo /usr/local/bin/snort -q -u snort -c /etc/snort/snort.conf"  # + "-i wlan0"
        self.conf["command_activate_barnyard2"] \
            = "sudo barnyard2 -c /etc/snort/barnyard2.conf -d /var/log/snort -f snort.u2 -w /var/log/snort/barnyard2.waldo -g snort -u snort"
        self.conf["command_activate_guardian"] \
            = "sudo /usr/bin/perl /usr/local/bin/guardian.pl -c /etc/snort/guardian.conf"
        self.conf["command_snort_process"] \
            = "/usr/local/bin/snort"
        self.conf["command_guardian_process"] \
            = "/usr/local/bin/guardian.pl"
        self.conf["snort_rule_file_path"] \
            = "/home/pi/firewallProject/snort_rules/"
        self.conf["snort_conf_file"] \
            = "/etc/snort/snort.conf"
        self.conf["mysql_host"] = "localhost"
        self.conf["mysql_port"] = "3306"
        self.conf["mysql_user"] = "root"
        self.conf["mysql_password"] = "root"
        self.conf["mysql_charset"] = "utf8"
        self.conf["local"] = os.getcwd()
        if os.name is "posix":
            self.conf["char_code"] = "utf-8"
        elif os.name is "nt":
            self.conf["char_code"] = "gbk"

    # 由其他文件调用，读取配置值
    def getConf(self,key: str):
        try:
            value = self.conf[key]
            return value
        except KeyError:
            # try:
            #     value = default_conf[key]
            #     return value
            # except KeyError:
            print("No value of the key '%s'!" % (key))
        return None

        #设置配置值
    def setConf(self,key,value):
        self.conf[key] = value
        return True

    #将所有配置值打印出来
    def listConf(self):
        print("\nList configure parameter:")
        for key in self.conf:
            print("'%s' = '%s'"%(key,self.conf[key]))
        print()

    #从文件读取配置值
    @testTool.mydecorator.showReturn
    def readConfFile(self):
        fo = None
        rst = [None,None]
        try:
            org_line = ""
            fo = open(self.conf_file,"r",encoding=self.encode_type)
            while True:
                line = fo.readline()
                if line is None or line == "": #整个文件读取完毕
                    break
                if line[-1] == "\n":
                    line = line[:-1]    #去除换行符
                if line == "":
                    continue
                try:
                    line = line.strip() #去除首尾空格换行符tab
                    if line[0] == "#":
                        continue
                    if line[len(line)-1] == "\\":
                        org_line += line[:-1]
                    else:
                        org_line += line
                        org_line = org_line.strip()
                        sp = org_line.split("=")
                        if len(sp) != 2:
                            print("error parameter: %s"%(org_line))
                        else:
                            sp[0] = sp[0].strip()
                            sp[1] = sp[1].strip()
                            self.conf[str(sp[0])] = str(sp[1])
                        org_line = ""
                except TypeError:
                    continue
            rst[0] = True
            rst[1] = "Read '%s' Complete"%(self.conf_file)
        except Exception as e:
            rst[0] = False
            rst[1] = str(e)
        finally:
            if fo is not None:
                fo.close()
        return rst

