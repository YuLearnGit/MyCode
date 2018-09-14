#include "tools.h"
using namespace std;

//获取本机MAC地址
std::string getLocal_mac()
{
    QList<QNetworkInterface> nets = QNetworkInterface::allInterfaces();// 获取所有网络接口列表
    int nCnt = nets.count();
    QString strMacAddr = "";
    for(int i = 0; i < nCnt; i ++)
    {
        // 如果此网络接口被激活并且正在运行并且不是回环地址，则就是我们需要找的Mac地址
        if(nets[i].flags().testFlag(QNetworkInterface::IsUp) && nets[i].flags().testFlag(QNetworkInterface::IsRunning) && !nets[i].flags().testFlag(QNetworkInterface::IsLoopBack))
        {
            strMacAddr = nets[i].hardwareAddress();
            break;
        }
    }
    //qDebug()<<"MAC= "<<strMacAddr;
    std::string MACAddr = strMacAddr.toStdString();
    //cout<<"MAC= "<<MACAddr<<endl;
    return MACAddr;
}

//获取本机IP地址
QString getLocal_IP()
{
    QString strIpAddress = "";
    QList<QHostAddress> ipAddressesList = QNetworkInterface::allAddresses();
    // 获取第一个本主机的IPv4地址
    int nListSize = ipAddressesList.size();
    for (int i = 0; i < nListSize; ++i)
    {
        if (ipAddressesList.at(i) != QHostAddress::LocalHost &&
                ipAddressesList.at(i).toIPv4Address()) {
            strIpAddress = ipAddressesList.at(i).toString();
            break;
        }
    }
    // 如果没有找到，则以本地IP地址为IP
    if (strIpAddress.isEmpty())
        strIpAddress = QHostAddress(QHostAddress::LocalHost).toString();

//    qDebug()<<"Local IP addr:"<<strIpAddress;
    //std::string IPAddr = strIpAddress.toStdString();
    return strIpAddress;
}

/*
 * 监听端口线程类
*/

void listenThread::run()
{
    //qDebug()<<"start listen";
    //接收返回信息
    //QUdpSocket *listener = new QUdpSocket();
    std::shared_ptr <QUdpSocket> listener = std::make_shared<QUdpSocket>();
    listener->bind(QHostAddress(getLocal_IP()),port);
    try
    {
        while(true)
        {
            if(listener->hasPendingDatagrams())
            {
                int size = listener->pendingDatagramSize();
                char datagram[size];
                listener->readDatagram(datagram,size);
                datagram[size] = '\0';
                QString msg = QString(datagram);
                if(msg != "" && msg.contains(QString("firedeviceConfirm")))
                {
                    qDebug()<<"catch back info:"<<msg;
                    back_result.push_back(msg);
                }
            }

        }
    }
    catch (std::exception)
    {
        listener->close();
    }
}
