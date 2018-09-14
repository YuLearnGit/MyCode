#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int getFirstK(vector<int>& data,int k,int start,int end)
{
    while(start<=end)
    {
        int mid = (start+end)/2;
        int middata = data[mid];
        if(middata == k)
        {
            if(mid == 0 || (data[mid-1]!=k && mid>0))
                return mid;
            else
                end = mid -1;
        }
        else if(middata < k)
        {
            start = mid+1;
        }
        else
            end = mid-1;
    }

    return -1;
}

int getLastK(vector<int>& data,int k,int len,int start,int end)
{
    while(start<=end)
    {
        int mid = (start+end)/2;
        int middata = data[mid];
        if(middata == k)
        {
            if((data[mid+1]!= k && mid<len-1) || mid==len-1)
                return mid;
            else
                start = mid+1;
        }
        else if(middata > k)
            end = mid-1;
        else
            start = mid+1;
    }
    return -1;
}

int GetNumberOfK(vector<int> data,int k)
{
    int len = data.size();
    int count = 0;
    if(len>0)
    {
        int firstindex = getFirstK(data,k,0,len-1);
        int lastindex = getLastK(data,k,len,0,len-1);
        if(firstindex>-1 && lastindex>-1)
            count = lastindex-firstindex+1;
    }
    return count;

}
int main()
{
    vector<int> data = {1,5,9,8,58,96,97,2,2,4,8,9,2,6,2};
    sort(data.begin(),data.end());
    for(auto item : data)
        cout<<item<<" ";
    cout<<endl;
    cout<<GetNumberOfK(data,2);
    return 0;
}
