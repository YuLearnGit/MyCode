#include <iostream>
#include <vector>

using namespace std;

void Merge(vector<int>& data,vector<int>& result,int start,int mid,int end)
{
    int i = start, j = mid+1, k=0;
    while(i<=mid && j<=end)
    {
        if(data[i]<=data[j])
            result[k++] = data[i++];
        else
            result[k++] = data[j++];
    }
    while(i<=mid)
        result[k++] = data[i++];
    while(j<=end)
        result[k++] = data[j++];
    for(int i=0;i<k;++i)
    {
        data[i+start] = result[i];
        cout<<result[i]<<" ";
    }
    cout<<endl;

}

void MergeSort(vector<int>& data,vector<int>& result,int start,int end)
{
//    if(start == end)
//        result[start] = data[start];
    if(start < end)
    {
        int mid = (start+end)/2;
        MergeSort(data,result,start,mid);
        MergeSort(data,result,mid+1,end);
        Merge(data,result,start,mid,end);
    }
}

int main()
{
    vector<int> data = {6,1,8,2,3,9,7,5};
    int len = data.size();
    vector<int> result(len,0);
    MergeSort(data,result,0,len-1);
//    for(auto item:data)
//        cout<<item<<" ";
//    cout<<endl;

    return 0;
}
