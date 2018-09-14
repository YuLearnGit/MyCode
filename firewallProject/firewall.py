import re
import os
from flask import Flask, session, redirect, url_for, escape, render_template, request, jsonify

app = Flask(__name__)

import utils
# 初始化工具类
utils.init()

# 载入各个模块并对页面初始化
import accountManage

app = accountManage.init(app)

import main

app = main.init(app)

import welcome

app = welcome.init(app)

import networkManage

app = networkManage.init(app)

import daqManage

app = daqManage.init(app)

import iptablesManage

app = iptablesManage.init(app)

import snortManage

app = snortManage.init(app)

import errorManage

app = errorManage.init(app)

import helpManage

app = helpManage.init(app)

import settingManage

app = settingManage.init(app)

# 浏览器session会话所用的密钥
app.secret_key = "hello guys,you got me now"

if __name__ == "__main__":
    app.run(debug=True)
