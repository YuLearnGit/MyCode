#ifndef SENDINFO_H
#define SENDINFO_H

/*
 * 发送信息
 * function:SendCheckInfo，用于发送扫描设备信息
 * function:SendConfigInfo,用于向防火墙发送配置信息, 返回bool值，true表示配置成功
 * Author:于仁飞
 * Date:2018-4-25
*/
#include <iostream>
#include <string>
#include <QUdpSocket>
#include <QtNetwork>
#include <QHostAddress>
#include <QThread>
#include <QTimer>
#include "basedeviceform.h"
#include "tools.h"
class SendInfo:public QObject
{
    Q_OBJECT
public:
    SendInfo(const std::shared_ptr<BaseDeviceForm> dev);
    void SendCheckInfo() const;
    bool SendConfigInfo(const std::string &cmd) const;
private:
    static std::shared_ptr<BaseDeviceForm> device;
    QUdpSocket *config_back_listener;
    QTimer *timer;//定时器
    bool static confirm;
private slots:
    void closeListener();//规定时间内为接收到数据即关闭UDP客户端
    bool listener();//监听配置返回信息

};

#endif // SENDINFO_H
