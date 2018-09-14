from flask import jsonify
from settingManage.settingManageModle import SettingManageModel


class SettingManageCon:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(SettingManageCon, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        self.settingManageModel = SettingManageModel()
        pass

    def getAllSetting(self):
        rst = self.settingManageModel.getJsonDict()
        msg = dict()
        if rst[0]:
            msg["success"] = rst[1]
            return jsonify(msg)
        else:
            msg["error"] = "无已保存设置"
            return jsonify(msg)

    def getSetting(self,setting_name):
        rst = self.settingManageModel.getValue(setting_name)
        msg = dict()
        if rst[0]:
            msg["success"] = rst[1]
            return jsonify(msg)
        else:
            msg["error"] = "无已保存设置"
            return jsonify(msg)

    def setThemeSetting(self,form):
        msg = dict()
        themeSetting = dict()
        themeSetting["background_color"] = form["background_color"]
        themeSetting["hover_background_color"] = form["hover_background_color"]
        themeSetting["font_color"] = form["font_color"]
        themeSetting["font"] = form["font"]
        themeSetting["split_line_color"] = form["split_line_color"]
        rst = self.settingManageModel.set("theme", themeSetting)
        if rst[0]:
            msg["success"] = rst[1]
        else:
            msg["error"] = rst[1]
        return jsonify(msg)





