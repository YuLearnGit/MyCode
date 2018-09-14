#ifndef DEVICECHECK_H
#define DEVICECHECK_H

/*
 * 扫描设备
 *<param name="start_IP">扫描开始IP地址</param>
 *<param name="end_IP">扫描结束IP地址</param>
 * 数据成员：防火墙设备列表，防火墙设备MAC地址列表
 * 成员函数：扫描设备方法CheckDevices，列表的get方法
 * Author:于仁飞
 * Date:2018-5-03
*/
/*std headers*/
#include <string>
#include <vector>
#include <list>
#include <memory>
/*QT5 headers*/
#include <QUdpSocket>
#include <QtNetwork>
#include <QHostAddress>
#include <QThread>
/*my headers*/
#include "sendinfo.h"
#include "fwdeviceform.h"
#include "protectdeviceform.h"
#include "tools.h"
class DeviceCheck
{
public:
    DeviceCheck(const std::string &start_IP,const std::string &end_IP)
        :startIP(start_IP),endIP(end_IP){}
    ~DeviceCheck();
    void CheckDevices();
    //std::list<FWDeviceForm> get_fwdevList() const;
    std::list<std::string> get_fwMacList() const;

//   void run();
private:
    int ScanDevice() const;
    const std::string startIP;
    const std::string endIP;
    std::list<FWDeviceForm> fwdevList;
    std::list<std::string> fwMacList;
};

#endif // DEVICECHECK_H
