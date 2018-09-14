#include "sendinfo.h"

bool SendInfo::confirm = false;
std::shared_ptr<BaseDeviceForm> SendInfo::device = nullptr;
SendInfo::SendInfo(const std::shared_ptr<BaseDeviceForm>& dev)
{
    device = dev;
    config_back_listener = new QUdpSocket();
    timer = new QTimer();
    QString addr = getLocal_IP();
    config_back_listener->bind(QHostAddress(addr),30333);
    connect(timer,SIGNAL(timeout()),SLOT(closeListener()));
    timer->setSingleShot(true);
    timer->start(100);
}
SendInfo::~SendInfo()
{
    if(config_back_listener != nullptr)
        delete config_back_listener;
    if(timer != nullptr)
        delete timer;
}
/*
 * 发送扫描设备信息
*/
void SendInfo::SendCheckInfo() const
{
    std::string mac = getLocal_mac();
    //构造自定的数据包头
    QByteArray head;
    head.append("\x0f");head.append("\x0e");head.append("\x0d");head.append("\x0c");head.append("\x0b");head.append("\x0a");
    QByteArray body = QString::fromStdString(mac+"*").toLatin1();
    QByteArray data = head.append(body);
    //发送扫描设备数据包
    std::shared_ptr<QUdpSocket> client(new QUdpSocket());
    QHostAddress address = QHostAddress(QString::fromStdString(device->getdevIP()));
    client->writeDatagram(data,data.size(),address,33333);
    client->close();
}

/*
 * 发送配置信息
*/
bool SendInfo::SendConfigInfo(const std::string &cmd) const
{
    QByteArray head;
    head.append("\x0f");head.append("\x0e");head.append("\x0d");head.append("\x0c");head.append("\x0b");head.append("\x0a");
    QByteArray body = QString::fromStdString(cmd+"*").toLatin1();
    QByteArray data = head.append(body);
    std::shared_ptr<QUdpSocket> client(new QUdpSocket());
    QHostAddress address = QHostAddress(QString::fromStdString(device->getdevIP()));
    client->writeDatagram(data,data.size(),address,22222);
    client->close();

    bool flag = false;
    try
    {
        //        timer->start(100);
        while(!flag)
        {
            if(timer->isActive())
            {
                if(config_back_listener->hasPendingDatagrams())
                {
                    int size = config_back_listener->pendingDatagramSize();
                    char datagram[size];
                    config_back_listener->readDatagram(datagram,size);
                    datagram[size] = '\0';
                    QString msg = QString(datagram);
                    if(msg !="")
                    {
                        qDebug()<<"catch config back info:"<<msg;
                        if(msg == QString("success"))
                        {
                            confirm = true;
                            flag = true;
                            timer->stop();
                        }
                        if(msg == QString("fail"))
                        {
                            confirm = false;
                            flag = true;
                            timer->stop();
                        }
                    }
                }
            }
            else
                break;
        }
    }
    catch (std::exception)
    {
        config_back_listener->close();
    }
    config_back_listener->close();
    qDebug()<<"confirm="<<confirm;
    return confirm;
}
/*
 * 在一定时间内没有接收到数据将强制关闭接收客户端
*/
void SendInfo::closeListener()
{
    qDebug()<<"receive timeout!";
    timer->stop();
    if(!timer->isActive())
        qDebug()<<"hehe";
}


