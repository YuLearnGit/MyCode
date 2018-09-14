#ifndef FILEOPERATION_H
#define FILEOPERATION_H

/*
 * 文件操作类
 * 采用json文件存取规则
 * 成员函数:参数为以空格区分开的std字符串
 * Author:于仁飞
 * Date:2018-5-8
*/
#include <string>
#include <iostream>
#include <list>
#include <QJsonDocument>
#include <QJsonObject>
#include <QTextStream>
#include <QFile>
#include <QDir>
#include <QString>
#include <QHostAddress>
class FileOperation
{
public:
    FileOperation();
    bool addRule(const std::string& ruleStr) const;//添加规则
    bool deleteRule(const std::string& ruleStr) const;//删除规则
    bool updateRule(const std::string& oldruleStr,const std::string& newruleStr) const;//更新规则
    std::list<QJsonObject> searchRule(const std::string& ruleStr) const;//查询规则
};

#endif // FILEOPERATION_H
