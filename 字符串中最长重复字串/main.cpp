#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

string find(string& str)
{
    int len = str.size();
    vector<string> tmp;
    //ºó×ºÊý×é
    for(int i=0; i<len; ++i)
        tmp.push_back(str.substr(i));
    vector<string> copytmp = tmp;
    sort(tmp.begin(),tmp.end());
    for(auto i : tmp)
        cout<<i<<endl;
    int max = 0;
    int index = 0;
    for(unsigned int i =0; i<tmp.size()-1; ++i)
    {
        string tmp1 = tmp[i];
        string tmp2 = tmp[i+1];
        int count = 0;
        for(unsigned int j=0; j<tmp1.size() && j<tmp2.size(); ++j)
        {
            if(tmp1[j] == tmp2[j])
            {
                count++;
                if(count > max)
                {
                    max = count;
                    index = i;
                }
            }
            else
                break;
        }
    }
    string result = "";
    if(max == 0)
        return result;
    else
    {
        result = tmp[index].substr(0,max);
    }
    return result;
}

int main()
{
    string str = "asdfewvivovivolklerplkg";

    //cout<<"max repeat str:"<<find(str);
    vector<int> mv;
    cout<<sizeof(mv)<<endl;

}
