import json, os
import testTool


class JsonFileUtil:
    # def __new__(cls, *args, **kwargs):
    #     if not hasattr(cls, '_inst'):
    #         cls._inst = super(JsonFileUtil, cls).__new__(cls)
    #     return cls._inst

    def __init__(self, json_file_name="./setting.txt"):
        rst = self.checkFileExisted(json_file_name)
        if not rst:
            print("File %s is not existed, and cannot be create" % json_file_name)
        self.json_file_name = json_file_name
        self.json_dict = None
        self.readJsonFile()

    def checkFileExisted(self, filename: str):
        try:
            if not os.path.exists(filename):
                nameList = filename.rsplit("/", 1)
                if len(nameList[0]) > 1:
                    os.makedirs(nameList[0], exist_ok=True)
                    fo = open(filename, "w", encoding="utf-8")
                    fo.close()
            return True
        except IOError:
            return False

    @testTool.mydecorator.showReturn
    def readJsonFile(self):
        fo = None
        try:
            fo = open(self.json_file_name, "r", encoding="utf-8")
            try:
                self.json_dict = json.load(fo)
            except json.JSONDecodeError as e:
                print(e)
                self.json_dict = dict()
            return [True, self.json_dict]
        except Exception as e:
            print(e)
            self.json_dict = dict()
            return [False, str(e)]
        finally:
            if fo is not None:
                fo.close()

    def writeJsonFile(self):
        if self.json_dict is None:
            return [False, "服务器出错，文件加载失败"]
        fo = None
        try:
            fo = open(self.json_file_name, "w", encoding="utf-8")
            json.dump(self.json_dict, fo, indent=4)
            return [True, "存储成功"]
        except Exception as e:
            print(e)
            return [False, str(e)]
        finally:
            if fo is not None:
                fo.close()

    def getJsonDict(self):
        if self.json_dict is not None:
            return [True, self.json_dict]
        return [False, None]

    # @testTool.mydecorator.showReturn
    def getValue(self, name):
        if self.json_dict is not None:
            setting = self.json_dict
            if isinstance(name, list):
                length = len(name)
                for i in range(0, length - 1):
                    if name[i] not in setting:
                        return [False, None]
                    setting = setting[name[i]]
                    if not isinstance(setting, dict):
                        return [False, "获取出错"]
                setting_value = setting.get(name[length - 1], None)
            else:
                setting_value = setting.get(name, None)
            if setting_value is not None:
                return [True, setting_value]
        return [False, None]

    def set(self, name, value):
        if self.json_dict is None:
            self.json_dict = dict()
        if isinstance(name, list):
            setting = self.json_dict
            length = len(name)
            for i in range(0, length - 1):
                if name[i] not in setting:
                    setting[name[i]] = dict()
                setting = setting[name[i]]
            if not isinstance(setting, dict):
                return [False, "设置出错"]
            setting[name[length - 1]] = value
        else:
            self.json_dict[name] = value
        rst = self.writeJsonFile()
        if rst[0]:
            return [True, "设置已保存至服务器"]
        else:
            return rst