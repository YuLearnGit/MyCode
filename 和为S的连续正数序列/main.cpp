#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> FindContinuousSequence(int sum)
{
    vector<vector<int>> result;
    if(sum <= 2)
        return result;
    int small = 1;
    int big = 2;
    int mid = (sum+1)/2;
    int curSum = small + big;
    while(small < mid)
    {
        if(curSum == sum)
        {
            vector<int> tmp;
            for(int i =small; i<=big; ++i)
                tmp.push_back(i);
            result.push_back(tmp);
        }
        while(curSum > sum && small < mid)
        {
            curSum -= small;
            small +=1;
            if(curSum == sum)
            {
                vector<int> tmp;
                for(int i =small; i<=big; ++i)
                    tmp.push_back(i);
                result.push_back(tmp);
            }
        }
        big++;
        curSum += big;
    }
    return result;
}

int main()
{
    int sum = 0;
    while(cin>>sum)
    {
        vector<vector<int>> result = FindContinuousSequence(sum);
        for(auto v_item : result)
        {
            for(auto item : v_item)
            {
                cout<<item<<" ";
            }
            cout<<endl;
        }
    }
    return 0;
}
