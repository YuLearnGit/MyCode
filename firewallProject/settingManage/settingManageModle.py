import json
from utils.jsonFileUtil import JsonFileUtil


class SettingManageModel(JsonFileUtil):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(SettingManageModel, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            super(JsonFileUtil, self).__init__()
            super(SettingManageModel,self).__init__("./configure/setting")

# def __init__(self):
#     self.setting_file_name = "setting"
#     self.setting_dict = None
#     self.readSettingFile()
#
# def readSettingFile(self):
#     fo = None
#     try:
#         fo = open(self.setting_file_name, "r", encoding="utf-8")
#         settingStr = fo.read()
#         if len(settingStr) > 0:
#             self.setting_dict = json.loads(settingStr)
#             # print(type(dataJson))
#             # print(dataJson["aa"]["tt"])
#
#             # print(json.dumps(dataJson))
#     except Exception as e:
#         print(e)
#     finally:
#         if fo is not None:
#             fo.close()
#
# def writeSettingFile(self):
#     if self.setting_dict is None:
#         return [False,"服务器出错，配置加载失败"]
#     fo = None
#     try:
#         fo = open(self.setting_file_name, "w", encoding="utf-8")
#         fo.write(json.dumps(self.setting_dict))
#         return [True,"存储成功"]
#     except Exception as e:
#         print(e)
#         return [False,str(e)]
#     finally:
#         if fo is not None:
#             fo.close()
#
# def getAllSetting(self):
#     if self.setting_dict is not None:
#         return [True,self.setting_dict]
#     return [False,None]
#
# def getSetting(self, setting_name):
#     if self.setting_dict is not None:
#         setting_value = self.setting_dict.get(setting_name, None)
#         if setting_value is not None:
#             return [True, setting_value]
#     return [False, None]
#
# def setSetting(self, setting_name, setting_value):
#     if self.setting_dict is None:
#         self.setting_dict = dict()
#     self.setting_dict[setting_name] = setting_value
#     rst = self.writeSettingFile()
#     if rst[0]:
#         return [True,"设置已保存至服务器"]
#     else:
#         return rst
