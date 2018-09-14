#include <iostream>
#include <set>
#include <string>
#include <algorithm>

using namespace std;

void combi(string &str, string &temp, set<string> &res, int start, int num)
{
    if(start > str.size())
        return ;

    if (num == 0)
    {
        res.insert(temp);
        return;
    }
    if (start == str.size())
        return;
    temp += str[start];
    combi(str, temp, res, start + 1, num - 1);
    temp = temp.substr(0, temp.size() - 1);
    combi(str, temp, res, start + 1, num);

}

set<string> combination(string& str)
{
    set<string> res;
    string tmp("");
    unsigned int len = str.size();
    if(len<=0)
    {
        cout<<"ÊäÈëµÄÎª¿Õ´®\n"<<endl;
        return res;
    }

    for(unsigned int i=1; i<=len; ++i)
        combi(str,tmp,res,0,i);
    for(auto it : res)
        cout<<it<<endl;
    return res;
}

int main()
{
    string str = "aac";
    combination(str);
    return 0;
}
