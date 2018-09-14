#include "configdpirules.h"
using namespace std;
std::shared_ptr<BaseDeviceForm>ConfigDPIRules::device = nullptr;
//构造函数
ConfigDPIRules::ConfigDPIRules(const std::shared_ptr<BaseDeviceForm>& dev,const std::string& fw_mac):fwMAC(fw_mac)
{
    device = dev;
    fileOP = new FileOperation();
}
//析构函数
ConfigDPIRules::~ConfigDPIRules()
{
    if(fileOP != nullptr)
        delete fileOP;
}
//ModbusTcp
bool ConfigDPIRules::ChangeModbusTcpRules(const std::string& dst_IP,
                                          const std::string& src_IP,
                                          const std::string& min_addr,
                                          const std::string& max_addr,
                                          const std::string& func,
                                          const std::string& min_data,
                                          const std::string& max_data,
                                          bool log_record, bool add_delete) const
{
    string dpi_pro("DPI modbustcp");
    string flag("");
    string rule("");
    string log_rule("");
    if(dst_IP == "any" && src_IP=="any")
    {
        rule = "iptables -A FORWARD -p tcp --dport 502 -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 502 -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j LOG --log-prefix "+"\""+"ACCEPT&modbusTCP&dlegal " + "\"";
    }
    if(dst_IP == "any" && src_IP!="any")
    {
        rule = "iptables -A FORWARD -p tcp --dport 502 -s "+src_IP+" -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 502 -s "+src_IP+" -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j LOG --log-prefix "+"\""+"ACCEPT&modbusTCP&dlegal " + "\"";
    }
    if(dst_IP!="any" && src_IP=="any")
    {
        rule = "iptables -A FORWARD -p tcp --dport 502 -d "+dst_IP+" -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 502 -d "+dst_IP+" -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j LOG --log-prefix "+"\""+"ACCEPT&modbusTCP&dlegal " + "\"";
    }
    else
    {
        rule = "iptables -A FORWARD -p tcp --dport 502 -s "+src_IP+" -d "+dst_IP+" -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 502 -s "+src_IP+" -d "+dst_IP+" -m modbusTcp --data-addr "+min_addr+":"+max_addr+" --modbus-func "+
                func+" --modbus-data "+min_data+":"+max_data+" -j LOG --log-prefix "+"\""+"ACCEPT&modbusTCP&dlegal " + "\"";
    }
    string fileStr = dpi_pro+ " "+device->getdevIP()+" "+device->getdevMAC()+" "+dst_IP+" "+src_IP+" "+min_addr
            +" "+max_addr+" "+func+" "+min_data+" "+max_data+" "+QString::number(log_record).toStdString();
    std::cout<<fileStr<<std::endl;
    if(add_delete)
    {
        flag = "DPI1";
        fileOP->addRule(fileStr);
    }
    if(!add_delete)
    {
        flag = "DPI0";
        fileOP->deleteRule(fileStr);
    }
    if(log_record)
        rule = rule+" && "+log_rule;
    rule = flag + rule;
    std::shared_ptr<SendInfo> sendcmd = std::make_shared<SendInfo>(device);
    return sendcmd->SendConfigInfo(rule);
}
//OPC
bool ConfigDPIRules::ChangeOPCRules(const std::string& dst_IP, const std::string& src_IP,  bool log_record, bool add_delete) const
{
    string dpi_pro("DPI opc");
    string flag("");
    string rule("");
    string log_rule("");
    if(dst_IP == "any" && src_IP=="any")
    {
        rule = "iptables -A FORWARD -p tcp --dport 135 -m state --state ESTABLISHED -j NFQUEUE --queue-num 1";
        log_rule = "iptables -A FORWARD -p tcp --dport 135 -m state --state ESTABLISHED j LOG --log-prefix  \"ACCEPT&OPC&ESTABLISHED\" ";
    }
    if(dst_IP == "any" && src_IP!="any")
    {
        rule = "iptables -A FORWARD -p tcp --dport 135 -s "+src_IP+" -m state --state ESTABLISHED -j NFQUEUE --queue-num 1";
        log_rule = "iptables -A FORWARD -p tcp --dport 135 -s "+src_IP+" -m state --state ESTABLISHED -j LOG --log-prefix "+"\""
                +"ACCEPT&OPC&ESTABLISHED "+"\"";
    }
    if(dst_IP!="any" && src_IP=="any")
    {
        rule = "iptables -A FORWARD -p tcp --dport 135 -d "+dst_IP+" -m state --state ESTABLISHED -j NFQUEUE --queue-num 1";
        log_rule = "iptables -A FORWARD -p tcp --dport 135 -d "+dst_IP+" -m state --state ESTABLISHED -j LOG --log-prefix "+"\""
                +"ACCEPT&OPC&ESTABLISHED "+"\"";
    }
    else
    {
        rule = "iptables -A FORWARD -p tcp --dport 135 -s "+src_IP+" -d"+dst_IP+" -m state --state ESTABLISHED -j NFQUEUE --queue-num 1";
        log_rule = "iptables -A FORWARD -p tcp --dport 135 -s "+src_IP+" -d"+dst_IP+" -m state --state ESTABLISHED j LOG --log-prefix "+"\""
                +"ACCEPT&OPC&ESTABLISHED "+"\"";
    }
    string fileStr = dpi_pro +" "+device->getdevIP()+" "+device->getdevMAC()+" "+dst_IP+" "+src_IP+" "+QString::number(log_record).toStdString();
    std::cout<<"rule= "<<rule<<std::endl;
    std::cout<<"log_rule= "<<log_rule<<std::endl;
    std::cout<<fileStr<<std::endl;
    if(add_delete)
    {
        flag = "DPI1";
        fileOP->addRule(fileStr);
    }
    if(!add_delete)
    {
        flag = "DPI0";
        fileOP->deleteRule(fileStr);
    }
    if(log_record)
        rule = rule+" && "+log_rule;
    rule = flag + rule;
    std::shared_ptr<SendInfo> sendcmd = std::make_shared<SendInfo>(device);
    return sendcmd->SendConfigInfo(rule);
}
//DNP3
bool ConfigDPIRules::ChangeDNP3Rules(const std::string& dst_IP,const std::string& src_IP,  bool log_record, bool add_delete) const
{
    string dpi_pro("DPI dnp3");
    string flag("");
    string rule_new(""); string rule_estab("");
    string log_rule("");
    if(dst_IP == "any" && src_IP=="any")
    {
       rule_new = "iptables -A FORWARD -p tcp --dport 20000 -m state --state NEW -j ACCEPT";
       rule_estab = "iptables -A FORWARD -p tcp --dport 20000 -m state --state ESTABLISHED -j ACCEPT";
       log_rule = "iptables -A FORWARD -p tcp --dport 20000 -m state --state NEW -j LOG --log-prefix \"ACCEPT&DNP3&NEW \" "
                  " && iptables -A FORWARD -p tcp --dport 20000 -m state --state ESTABLISHED -j LOG --log-prefix \"ACCEPT&DNP3&ESTABLISHED \"";
    }
    if(dst_IP == "any" && src_IP!="any")
    {
        rule_new = "iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -m state --state NEW -j ACCEPT";
        rule_estab = "iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -m state --state ESTABLISHED -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -m state --state NEW -j LOG --log-prefix \"ACCEPT&DNP3&NEW \" "
                   " && iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -m state --state ESTABLISHED -j LOG --log-prefix \"ACCEPT&DNP3&ESTABLISHED \"";
    }
    if(dst_IP!="any" && src_IP=="any")
    {
        rule_new = "iptables -A FORWARD -p tcp --dport 20000 -d "+dst_IP+" -m state --state NEW -j ACCEPT";
        rule_estab = "iptables -A FORWARD -p tcp --dport 20000 -d "+dst_IP+" -m state --state ESTABLISHED -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 20000 -d "+dst_IP+" -m state --state NEW -j LOG --log-prefix \"ACCEPT&DNP3&NEW \" "
                   " && iptables -A FORWARD -p tcp --dport 20000 -d "+dst_IP+" -m state --state ESTABLISHED -j LOG --log-prefix \"ACCEPT&DNP3&ESTABLISHED \"";
    }
    else
    {
        rule_new = "iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -d "+dst_IP+" -m state --state NEW -j ACCEPT";
        rule_estab = "iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -d "+dst_IP+" -m state --state ESTABLISHED -j ACCEPT";
        log_rule = "iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -d "+dst_IP+" -m state --state NEW -j LOG --log-prefix \"ACCEPT&DNP3&NEW \" "
                   " && iptables -A FORWARD -p tcp --dport 20000 -s "+src_IP+" -d "+dst_IP+" -m state --state ESTABLISHED -j LOG --log-prefix \"ACCEPT&DNP3&ESTABLISHED \"";
    }
    string fileStr = dpi_pro +" "+device->getdevIP()+" "+device->getdevMAC()+" "+dst_IP+" "+src_IP+" "+QString::number(log_record).toStdString();
    string rule = rule_new+" && "+rule_estab;
    std::cout<<"rule= "<<rule<<std::endl;
    std::cout<<"log_rule= "<<log_rule<<std::endl;
    std::cout<<fileStr<<std::endl;
    if(add_delete)
    {
        flag = "DPI1";
        fileOP->addRule(fileStr);
    }
    if(!add_delete)
    {
        flag = "DPI0";
        fileOP->deleteRule(fileStr);
    }
    if(log_record)
        rule = rule+" && "+log_rule;
    rule = flag + rule;
    std::shared_ptr<SendInfo> sendcmd = std::make_shared<SendInfo>(device);
    return sendcmd->SendConfigInfo(rule);
}
//bool ConfigDPIRules::ClearAllDPIRules(std::string& dev_IP)
//{

//}
