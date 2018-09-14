#include <iostream>
#include <sstream>
#include <vector>
#include <math.h>

using namespace std;

int stringToInt(string str)
{
    stringstream ss;
    int a = 0;
    ss << str;
    ss >> a;
    return a;
}

int charToInt(char c)
{
    stringstream ss;
    int a = 0;
    ss << c;
    ss >> a;
    return a;
}

string intToString(int a)
{
    string str;
    stringstream ss;
    ss << a;
    ss >> str;
    return str;
}

int getNetNum(string &str)
{
    string::size_type pos;
    string::size_type len = str.size();
    string NetNum;
    pos = str.find('/');
    NetNum = str.substr(pos + 1, len - pos);
    str = str.substr(0, pos);
    int num = stringToInt(NetNum);
    int hostBits = 32 - num;
    int hostNum = pow(2, hostBits) - 2;
    cout << "主机位：" << hostBits << endl;
    cout << "主机数：" << hostNum << endl;
    return num;
}

void splitString(const string str, vector<int> &num_vec, const string c)
{
    string::size_type pos1, pos2;
    vector<string> my_vec;
    pos1 = 0;
    pos2 = str.find(c);
    while(string::npos != pos2) {
        my_vec.push_back(str.substr(pos1, pos2 - pos1));
        pos1 = pos2 + c.size();
        pos2 = str.find(c, pos1);
    }
    if(pos1 != str.length())
        my_vec.push_back(str.substr(pos1));
    for(auto it = my_vec.begin(); it != my_vec.end(); ++it) {
        num_vec.push_back(stringToInt(*it));
    }
}

void bitToInt(string str, vector<int> &net)
{
    int p[4] = {0};
    for(int i = 0; i < 8; ++i) {
        if(charToInt(str[i]) == 1)
            p[0] += pow(2, 7 - i);
    }

    for(int j = 8; j < 16; ++j) {
        if(charToInt(str[j]) == 1)
            p[1] += pow(2, 15 - j);
    }
    for(int m = 16; m < 24; ++m) {
        if(charToInt(str[m]) == 1)
            p[2] += pow(2, 23 - m);
    }
    for(int n = 24; n < 32; ++n) {
        if(charToInt(str[n]) == 1)
            p[3] += pow(2, 31 - n);
    }
    for(int i = 0; i < 4; ++i) {
        net.push_back(p[i]);
    }

}

void ipNetnum(string str)
{
    vector<int> num;
    int netNum = getNetNum(str);
    splitString(str, num, ".");
    int len = num.size();
    string ip_str;
    for(int i = 0; i < len; ++i) {
        int bin[8] = {0};
        int n = 0, j = 7;
        do {
            n = num[i] % 2;
            bin[j] = n;
            num[i] = num[i] / 2;
            --j;
        } while(num[i] != 0);
        for(int i = 0; i < 8; ++i) {
            ip_str += intToString(bin[i]);
        }
    }
    string netmask_str = "11111111111111111111111111111111";
    for(int i = netNum; i < 32; ++i) {
        netmask_str[i] = '0';
        ip_str[i] = '0';
    }
    vector<int> netmask;
    bitToInt(netmask_str, netmask);
    cout << "子网掩码：" << netmask[0] << "." << netmask[1] << "." << netmask[2] << "." << netmask[3] << endl;
    vector<int>ipaddress;
    bitToInt(ip_str, ipaddress);
    cout << "网络地址：" << ipaddress[0] << "." << ipaddress[1] << "." << ipaddress[2] << "." << ipaddress[3] << endl;
    for(int i = netNum; i < 32; ++i) {
        ip_str[i] = '1';
    }
    vector<int>castaddress;
    bitToInt(ip_str, castaddress);
    cout << "广播地址：" << castaddress[0] << "." << castaddress[1] << "." << castaddress[2] << "." << castaddress[3] << endl;


}

int main()
{
    string str;
    cout << "输入ip段/数字，如192.168.0.1/24 ：" <<endl;
    while(cin >> str){
      ipNetnum(str);
    }
    return 0;
}
