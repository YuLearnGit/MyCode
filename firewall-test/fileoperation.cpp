#include "fileoperation.h"

QDir dir;
FileOperation::FileOperation()
{
    //如果不存在config目录则创建之
    if(!dir.exists("config"))
    {
        dir.mkdir("config");
    }
}
/*
 * 在进行文件操作之前进行一些初始化工作
*/
QStringList before_file_operate(const std::string& ruleStr)
{
    QString QruleStr = QString::fromStdString(ruleStr);
    QStringList ruleStrList = QruleStr.split(" ");
    //判断此类规则目录是否存在，若不存在则创建之
    if(!dir.exists("config/"+ruleStrList[0]))
    {
        dir.mkdir("config/"+ruleStrList[0]);
        dir.cd("config/"+ruleStrList[0]);
    }
    //判断规则类目录下的某种规则json文件是否存在，不存在则创建之
    QFile file("config/"+ruleStrList[0]+"/"+ruleStrList[1]+".json");
    if(!file.exists())
    {
        file.open(QIODevice::WriteOnly);
        file.close();
    }
    return ruleStrList;
}
/*
 * 根据规则前缀构造规则对象，用于添加、删除、查询规则
*/
QString buildObject(const QStringList& ruleList)
{
    if(ruleList[1] == "modbustcp")
    {
        QJsonObject modjson
        {
            {"applyDevIP",ruleList[2]},
            {"applyDevMAC",ruleList[3]},
            {"rule_dstIP",ruleList[4]},
            {"rule_srcIP",ruleList[5]},
            {"min_addr",ruleList[6]},
            {"max_addr",ruleList[7]},
            {"function code",ruleList[8]},
            {"min_data",ruleList[9]},
            {"max_data",ruleList[10]},
            {"logFlag",ruleList[11]}
        };
        QJsonDocument document(modjson);
        QByteArray byte_array = document.toJson(QJsonDocument::Compact);
        QString jsonStr(byte_array);
        return jsonStr;
    }
    if(ruleList[1] == "opc")
    {
        QJsonObject opcjson
        {
            {"applyDevIP",ruleList[2]},
            {"applyDevMAC",ruleList[3]},
            {"rule_dstIP",ruleList[4]},
            {"rule_srcIP",ruleList[5]},
            {"logFlag",ruleList[6]}
        };
        QJsonDocument document(opcjson);
        QByteArray byte_array = document.toJson(QJsonDocument::Compact);
        QString jsonStr(byte_array);
        return jsonStr;
    }
    if(ruleList[1]=="dnp3")
    {
        QJsonObject dnpjson
        {
            {"applyDevIP",ruleList[2]},
            {"applyDevMAC",ruleList[3]},
            {"rule_dstIP",ruleList[4]},
            {"rule_srcIP",ruleList[5]},
            {"logFlag",ruleList[6]}
        };
        QJsonDocument document(dnpjson);
        QByteArray byte_array = document.toJson(QJsonDocument::Compact);
        QString jsonStr(byte_array);
        return jsonStr;
    }
    return NULL;
}
/*
 * 判断规则是已经否存在，true表示存在
*/
bool rule_exist(const QStringList& ruleList, const QString& jsonStr)
{
    bool exist_flag = false;
    QFile file("config/"+ruleList[0]+"/"+ruleList[1]+".json");
    QTextStream in(&file);
    if(file.open(QIODevice::ReadOnly))
    {
        while(!in.atEnd())
        {
            QString line = in.readLine();
            if(jsonStr == line)
            {
                qDebug()<<"rule exists!";
                exist_flag = true;
            }
        }
        file.close();
    }
    return exist_flag;
}
/*
 * 将QJsonObject存入文件
*/
bool saveObject(const QStringList& ruleList, const QString& jsonStr)
{
    QFile file("config/"+ruleList[0]+"/"+ruleList[1]+".json");
    if(file.open(QIODevice::Append))
    {
        QTextStream in(&file);
        in<<jsonStr<<"\n";
        file.flush();
        file.close();
        return true;
    }
    else
        return false;
}
bool deleteObject(const QStringList& ruleList, const QString& jsonStr)
{
    bool flag = false;
    //如果不存在字符串则返回false
    if(!rule_exist(ruleList,jsonStr))
        return flag;
    QFile file("config/"+ruleList[0]+"/"+ruleList[1]+".json");
    QStringList tmp;
    QTextStream in(&file);
    //将要删除规则文件内的规则字符串缓存区
    if(file.open(QIODevice::ReadOnly))
    {
        while(!in.atEnd())
        {
            QString line = in.readLine();
            if(line != jsonStr)
                tmp.append(line);
        }
        file.close();
    }
    //以只读方式打开文件，将缓存区内容逐个写入
    if(file.open(QIODevice::WriteOnly))
    {
        for(auto item : tmp)
        {
            QTextStream in(&file);
            in<<item<<"\n";
        }
        file.flush();
        file.close();
        flag = true;
    }
    return flag;
}
/*
 * 添加规则
*/
bool FileOperation::addRule(const std::string& ruleStr) const
{
    //若规则为空则返回false
    if(ruleStr == "")
        return false;
    QStringList ruleList = before_file_operate(ruleStr);
    //构造json对象
    QString jsonStr = buildObject(ruleList);
    //首先判断是否已经存在此规则，若存在则返回false
    if(rule_exist(ruleList,jsonStr))
        return false;
    if(saveObject(ruleList,jsonStr))
        return true;
    else
        return false;

}
/*删除规则*/
bool FileOperation::deleteRule(const std::string& ruleStr) const
{
    //若规则为空则返回false
    if(ruleStr == "")
        return false;
    QStringList ruleList = before_file_operate(ruleStr);
    QString jsonStr = buildObject(ruleList);
    if(deleteObject(ruleList,jsonStr))
        return true;
    else
        return false;


}
/*更新规则 */
bool FileOperation::updateRule(const std::string& oldruleStr,const std::string& newruleStr) const
{
    if(deleteRule(oldruleStr) && addRule(newruleStr))
        return true;
    else
        return false;
}
/*查询规则*/
std::list<QJsonObject> FileOperation::searchRule(const std::string& rule_pro) const
{
    std::list<QJsonObject> ruleObjectList;
    //若规则为空则返回false
    if(rule_pro != "")
    {
        QStringList rule_pro_list = before_file_operate(rule_pro);
        QFile file("config/"+rule_pro_list[0]+"/"+rule_pro_list[1]+".json");
        QTextStream in(&file);
        if(file.open(QIODevice::ReadOnly))
        {
            while(!in.atEnd())
            {
                QByteArray byte_array = in.readLine().toLatin1();
                QJsonParseError json_error;
                QJsonDocument parse_document = QJsonDocument::fromJson(byte_array,&json_error);
                if(!parse_document.isNull() && json_error.error == QJsonParseError::NoError)
                {
                    if(parse_document.isObject())
                    {
                        QJsonObject obj = parse_document.object();
                        ruleObjectList.push_back(obj);
//                        QStringList list = obj.keys();
//                        for(int i =0;i<list.count();++i)
//                        {
//                            qDebug()<<list.at(i);
//                        }
                    }
                }

            }
            file.close();
        }
    }

    return ruleObjectList;

}
