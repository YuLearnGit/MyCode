#include <iostream>
#include <string>

using namespace std;

int myAtoi(string str)
{
    if(str == "")
        return 0;
    //跳过开头的空格
    unsigned int index = 0;
    unsigned int length = str.size();
    while(str[index] == ' ' && index<length)
        ++index;
    if(index == length-1 && str[index] == ' ')
        return 0;
    int res = 0;
    int sign = 1;
    if(isdigit(str[index]))
    {
        while(isdigit(str[index]) && index<length)
        {
            if(res > INT_MAX/10 || (res == INT_MAX/10 && (int)(str[index]-'0')>7))
                return INT_MAX;
            res = 10*res+(str[index]-'0');
            ++index;
        }
    }
    else if(str[index]=='+' || str[index] == '-')
    {
        sign = str[index]=='+' ? 1:-1;
        ++index;
        while(isdigit(str[index]) && index<length)
        {
            if(res>INT_MAX/10  || (res == INT_MAX/10 && (int)(str[index]-'0')>7))
                return sign == 1 ? INT_MAX:INT_MIN;
            res = 10*res+(int)(str[index]-'0');
            ++index;
        }
    }
    return sign*res;
}
int main()
{
    string digit("2147483648");
    cout<<"digit-->"<<myAtoi(digit)<<endl;

    string str1("   42");
    cout<<"42-->"<<myAtoi(str1)<<endl;
    string str2("   -42");
    cout<<"  -42-->"<<myAtoi(str2)<<endl;

    string str3("4193 with words");
    cout<<"4193 with words-->"<<myAtoi(str3)<<endl;

    string str4("words and 987");
    cout<<"words and 987-->"<<myAtoi(str4)<<endl;

    string str5("-91283472332");
    cout<<"-91283472332-->"<<myAtoi(str5)<<endl;

    return 0;
}
