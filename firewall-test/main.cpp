#include "mainwindow.h"
#include "sendinfo.h"
#include <QApplication>
#include <iostream>
#include "tools.h"
#include "basedeviceform.h"
#include "fwdeviceform.h"
#include "protectdeviceform.h"
#include "devicecheck.h"
#include "configdpirules.h"
#include <string>
#include <QJsonDocument>
#include <QFile>
#include <QDir>
#include <fileoperation.h>

using namespace std;
int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    MainWindow w;
    w.show();
//    ProtectDeviceForm device("192.16.10.3","B4:52:7E");
//    device.getdev_type(device.getdevMAC());
    /*test sendinfo*/
    std::shared_ptr<BaseDeviceForm> dev(new BaseDeviceForm("192.16.10.8","mac_address"));
//    ConfigDPIRules testdpi(dev,"hehhehe");
//    testdpi.ChangeModbusTcpRules("any","192.16.10.2","22","33","6","100","600",true,true);
//    testdpi.ChangeOPCRules("any","any",true,false);
//    testdpi.ChangeDNP3Rules("192.16.10.3","any",true,false);
////    SendInfo testsend(dev);
//    SendInfo *testsend = new SendInfo(dev);
////    testsend.SendCheckInfo();
//    bool result = testsend->SendConfigInfo("iptables -P FORWARD ACCEPT");
//    qDebug()<<result;
//    delete testsend;
    /*test checkdevice*/
//    DeviceCheck dev("192.16.10.7","192.16.10.8");
//    dev.CheckDevices();

//    QJsonObject json;
//    json.insert("name", QString("Qt"));
//    json.insert("version", 5);
//    json.insert("windows", true);

//    QJsonDocument document;
//    document.setObject(json);
//    QByteArray byte_array = document.toJson(QJsonDocument::Compact);
//    QString json_str(byte_array);
//    QDir dir;
//    if(!dir.exists("config"))//判断需要创建的文件夹是否存在
//    {
//        dir.mkdir("config"); //创建文件夹
//    }
//    QFile file("config/hehe.txt");
//    if(file.open(QIODevice::WriteOnly))
//    {
//        qDebug()<<"open file success";
//        QTextStream in(&file);
//        in<<json_str;
//        file.flush();
//        file.close();
//    }
    return a.exec();
}


