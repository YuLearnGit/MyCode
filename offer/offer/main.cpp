#include <iostream>
#include <map>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int merge_bra(vector<int>& data,int start,int mid,int end_flag,vector<int>& tmp)
{
    int i=mid, j=end_flag, k=end_flag-start;
    int cnt = 0;
    while(i>=start && j>=mid+1)
    {
        if(data[i]<=data[j])
        {
            tmp[k] = data[j];
            j--;
        }
        else
        {
            tmp[k] = data[i];
            i--;
            cnt += j-(mid+1)+1;
            cnt %= 1000000007;
        }
        k--;
    }

    while(i>=start)
    {
        tmp[k--] = data[i--];
    }
    while(j>=mid+1)
    {
        tmp[k--] = data[j--];
    }

    for(int i=start; i<=end_flag; i++)
        data[i] = tmp[i];
    return cnt%1000000007;
}
int mergeSort(vector<int>& data,int start,int end_flag,vector<int>& tmp)
{
    if(start<end_flag)
    {
        int mid = (end_flag+start)/2;
        int leftCnt = mergeSort(data, start, mid,tmp);
        int rightCnt = mergeSort(data, mid+1, end_flag,tmp);
        int merge_braCnt = merge_bra(data, start, mid, end_flag,tmp);
        for(auto item : data)
            cout<<item<<" ";
        cout<<endl;
        return (leftCnt+rightCnt+merge_braCnt)%1000000007;
    }
    return 0;
}
int InversePairs(vector<int> data)
{
    int p =0;
    int len = data.size();
    if(len <= 1)
        return p;
    vector<int> tmp(len,0);
    return mergeSort(data,0,len-1,tmp);
}

int main()
{
    vector<int> data = {1,2,3,4,5,6,7,0};
    cout<<InversePairs(data);
    return 0;
}
