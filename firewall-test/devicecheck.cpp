#include "devicecheck.h"

DeviceCheck::~DeviceCheck()
{

}
/*
 * 判断一个List是否包含某个值
*/
bool contains(const std::list<std::string>& lhs,const std::string& rhs)
{
    for(auto item: lhs)
    {
        if(rhs == item)
            return true;
    }
    return false;
}
//监听并处理扫描设备返回信息，并将结果存入相应的列表中
void DeviceCheck::CheckDevices()
{   
    fwdevList.clear();
    fwMacList.clear();
    listenThread *thread1 = new listenThread(30331);
    thread1->start();
    int ip_num = DeviceCheck::ScanDevice();
    thread1->msleep(ip_num*100);
    thread1->quit();
    //对每一条返回信息进行处理
    for(auto msg : thread1->back_result)
    {
        qDebug()<<"check info:"<<msg;
        QStringList back_info_array = msg.split("&");
        std::string fwIP = back_info_array[0].toStdString();
        std::string fwMAC = back_info_array[2].toStdString();
        std::string devIP = back_info_array[4].toStdString();
        std::string devMAC = back_info_array[1].toStdString();
        //如果防火墙设备下没有接被保护设备
        if(devMAC == "")
        {
            qDebug()<<"防火墙未连接任何被保护设备！";
            if(!contains(fwMacList,fwMAC))
            {
                FWDeviceForm fwdevform(fwIP,fwMAC);
                fwdevList.push_back(fwdevform);
                fwMacList.push_back(fwMAC);
            }
        }
        if(devMAC != "")
        {
            if(contains(fwMacList,fwMAC))
            {
                foreach (FWDeviceForm fwdev,fwdevList) {
                    if(fwdev.getdevMAC()==fwMAC)
                    {
                        ProtectDeviceForm protectdev(devIP,devMAC);
                        fwdev.add_protecDev(protectdev);
                    }
                }
            }
            else
            {
                FWDeviceForm fwdev(fwIP,fwMAC);
                ProtectDeviceForm protectdev(devIP,devMAC);
                fwdev.add_protecDev(protectdev);
                fwdevList.push_back(fwdev);
                fwMacList.push_back(fwMAC);
            }
        }
    }
}

std::list<std::string>DeviceCheck::get_fwMacList() const
{
    return fwMacList;
}

/*
 * IP 地址处理及给每一个IP地址发送扫描信息数据包，返回值为IP地址数目
*/
int DeviceCheck::ScanDevice() const
{
    QStringList startIPList = QString::fromStdString(startIP).split(QString("."));
    QStringList endIPList = QString::fromStdString(endIP).split(QString("."));

    QString unchangePart = startIPList[0]+QString(".")+startIPList[1]+QString(".")
            +startIPList[2]+QString(".");
    //qDebug()<<"unchangePart:"<<unchangePart;
    int start = startIPList[3].toInt();
    int end = endIPList[3].toInt();
    int ip_num = end -start;
    std::vector<std::string> scanIP;
    for(int count=0;count + start <=end;++count)
    {
        scanIP.push_back((unchangePart+QString::number(count+start,10)).toStdString());
    }

    for(auto item : scanIP)
    {
        std::shared_ptr<BaseDeviceForm> devform(new BaseDeviceForm(item,33333));
        //std::shared_ptr<SendInfo> send(new SendInfo(devform));
        //std::shared_ptr<BaseDeviceForm> devform = std::make_shared<BaseDeviceForm>(item,33333);
        std::shared_ptr<SendInfo> send = std::make_shared<SendInfo>(devform);
        send->SendCheckInfo();
    }
    return ip_num;
}
