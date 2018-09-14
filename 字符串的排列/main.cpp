#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

void mutation(string str,unsigned int index,vector<string>& res)
{
    unsigned int len = str.size();
    if(index == len)
        res.emplace_back(str);
    else
    {
        for(unsigned int start = index; start<len; ++start)
        {
            if(str[start] == str[index] && start != index)
                continue;
            swap(str[start],str[index]);
            mutation(str,index+1,res);
        }
    }

}
vector<string> Permutation(string str)
{
    vector<string> res;
    unsigned int len = str.size();
    if(len<=0)
        return res;
    mutation(str,0,res);
    sort(res.begin(),res.end());
    for(auto it : res)
        cout<<it<<endl;
    return res;
}
int main()
{
    string str1 = "abc";

    cout<<"str = abc 的结果:"<<endl;
    Permutation(str1);
    string str2 = "aab";
    cout<<"str = aab 的结果:"<<endl;

    Permutation(str2);
    return 0;
}

