#include <iostream>
#include <sstream>
#include <vector>
#include <math.h>
using namespace std;



//将IP和掩码拆分成四段整型
void dealString(const std::string& s, std::vector<int>& result, const std::string& c)
{
    std::vector<std::string> v;
    std::string::size_type pos1, pos2;
    pos2 = s.find(c);
    pos1 = 0;
    while(std::string::npos != pos2) {
        v.push_back(s.substr(pos1, pos2 - pos1));
        pos1 = pos2 + c.size();
        pos2 = s.find(c, pos1);
    }
    if(pos1 != s.length())
        v.push_back(s.substr(pos1));

    //string to int
    int len = v.size();
    result.resize(v.size());
    for(int i = 0; i < len; ++i) {
        stringstream ss;
        ss << v[i];
        ss >> result[i];
    }

}

//int to string
string intToString(int a)
{
    stringstream ss;
    string str = "";
    ss << a;
    ss >> str;
    return str;
}

//strint to int
int stringToInt(const char str)
{
    stringstream ss;
    int a = 0;
    ss << str;
    ss >> a;
    return a;
}

//获取网络位、主机位、主机数
int getNum(vector<int>IP, vector<int> netmask)
{
    int len = netmask.size();
    string maskStr = "";
    int ipLen = IP.size();
    string ipStr = "";

    for(int i = 0; i < len; ++i) {
        int bin[8] = {0};
        int n = 0, j = 7;
        do {
            n = netmask[i] % 2;
            bin[j] = n;
            netmask[i] = netmask[i] / 2;
            --j;
        } while(netmask[i] != 0);
        for(int i = 0; i < 8; ++i) {
            maskStr += intToString(bin[i]);
        }

    }
    int counts = 0;
    for(auto it = maskStr.begin(); *it != '0'; ++it) {
        ++counts;
    }
    int hostBits = 32 - counts;
    int hostNum = pow(2, hostBits);
    cout << "网络位：" << counts << endl;
    cout << "主机位：" << hostBits << endl;
    cout << "主机数：" << (hostNum - 2) << endl;

    for(int i = 0; i < ipLen; ++i) {
        int bin[8] = {0};
        int n = 0, j = 7;
        do {
            n = IP[i] % 2;
            bin[j] = n;
            IP[i] = IP[i] / 2;
            --j;
        } while(IP[i] != 0);
        for(int i = 0; i < 8; ++i) {
            ipStr += intToString(bin[i]);
        }
    }
    for(unsigned int i = counts; i < ipStr.size(); ++i) {
        ipStr[i] = '0';
    }
    string broadcastStr = ipStr;
    for(unsigned int i = counts; i < broadcastStr.size(); ++i) {
        broadcastStr[i] = '1';
    }

    //求网络地址
    int secNum = counts / 8;
    int netAddress[4] = {0};
    int broadcast[4] = {255, 255, 255, 255};
    switch(secNum) {
    case 0:
        broadcast[0] = 0;
        for(int i = 0; i < 8; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[0] += pow(2, 7 - i);
            if(stringToInt(broadcastStr[i]) == 1)

                broadcast[0] += pow(2, 7 - i);
        }
        break;
    case 1:
        broadcast[0] = 0;
        broadcast[1] = 0;

        for(int i = 0; i < 8; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[0] += pow(2, 7 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[0] += pow(2, 7 - i);
        }
        for(int i = 8; i < 16; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[1] += pow(2, 15 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[1] += pow(2, 15 - i);
        }
        break;
    case 2:
        broadcast[0] = 0;
        broadcast[1] = 0;
        broadcast[2] = 0;

        for(int i = 0; i < 8; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[0] += pow(2, 7 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[0] += pow(2, 7 - i);
        }
        for(int i = 8; i < 16; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[1] += pow(2, 15 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[1] += pow(2, 15 - i);
        }
        for(int i = 16; i < 24; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[2] += pow(2, 23 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[2] += pow(2, 23 - i);
        }
        break;
    case 3:
        broadcast[0] = 0;
        broadcast[1] = 0;
        broadcast[2] = 0;
        broadcast[3] = 0;

        for(int i = 0; i < 8; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[0] += pow(2, 7 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[0] += pow(2, 7 - i);
        }
        for(int i = 8; i < 16; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[1] += pow(2, 15 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[1] += pow(2, 15 - i);
        }
        for(int i = 16; i < 24; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[2] += pow(2, 23 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[2] += pow(2, 23 - i);
        }
        for(int i = 24; i < 32; ++i) {
            if(stringToInt(ipStr[i]) == 1)
                netAddress[3] += pow(2, 31 - i);
            if(stringToInt(broadcastStr[i]) == 1)
                broadcast[3] += pow(2, 31 - i);
        }
        break;
    }
    cout << "网络地址：" << netAddress[0] << "." << netAddress[1] << "." << netAddress[2] << "." << netAddress[3] << endl;
    cout << "广播地址：" << broadcast[0] << "." << broadcast[1] << "." << broadcast[2] << "." << broadcast[3] << endl;

    return 0;
}
/**
已知IP地址和掩码地址计算网络地址、广播地址、网络位、主机位、主机数
*/

int ip_netmask(string IP, string netmask)
{
    string c = ".";
    vector<int>IP_section;
    vector<int>netmask_section;
    dealString(IP, IP_section, c);
    dealString(netmask, netmask_section, c);
    getNum(IP_section, netmask_section);
    return 0;

}

int main()
{
    cout << "输入IP和子网掩码(用空格区分):" << endl;
    string IP_str, netmask;
    while(cin >> IP_str >> netmask) {
        cout << "计算结果为：" << endl;
        ip_netmask(IP_str, netmask);
    }

    return 0;
}
