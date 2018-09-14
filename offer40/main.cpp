#include <iostream>
#include <vector>
#include <map>

using namespace std;

void FindNumsAppearOnce(vector<int>& data,int* num1,int *num2)
{
    if(data.size() == 0)
        return;
    map<int,int> tmp;
    for(auto it = data.begin(); it!=data.end(); ++it)
    {
        if(tmp.find(*it) != tmp.end())
            tmp[*it]++;
        else
            tmp.insert(pair<int,int>(*it,1));
    }
    for(auto it = tmp.begin(); it != tmp.end(); ++it)
        cout<<it->first<<":"<<it->second<<endl;
    for(auto it = tmp.begin();; ++it)
    {
        if(it->second == 1)
        {
            *num1 = it->first;
            break;
        }
    }
    for(auto it = tmp.rbegin();; ++it)
    {
        if(it->second == 1)
        {
            *num2 = it->first;
            break;
        }
    }
    cout<<*num1<<*num2;
}
int main()
{
    vector<int> data = {2,4,3,6,3,2,5,5};
    int num1 = 0;
    int num2 = 0;
    FindNumsAppearOnce(data,&num1,&num2);
    return 0;
}
