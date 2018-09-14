#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int Partition(vector<int>& l,int low,int high)
{
    int pivot = l[low];
    while(low<high)
    {
        while(low<high && l[high]>=pivot)
            high--;
        swap(l[low],l[high]);
        while(low<high && l[low]<=pivot)
            low++;
        swap(l[low],l[high]);
    }
    return low;
}
void Qsort(vector<int>& l,int low,int high)
{
    int pivot = 0;
//    if(low<high)
//    {
//        pivot = Partition(l,low,high);
//        Qsort(l,low,pivot-1);
//        Qsort(l,pivot+1,high);
//    }
/*ÓÅ»¯µÝ¹é²Ù×÷*/
    while(low<high)
    {
        pivot = Partition(l,low,high);
        Qsort(l,low,pivot-1);
        low = pivot+1;
    }
}

int main()
{
    vector<int> my_v = {12,5,8,4,7,2,9,23,8};
    cout<<"before sort: ";
    for(auto it:my_v)
        cout<<it<<" ";
    cout<<endl;
    Qsort(my_v,0,my_v.size()-1);
    cout<<"after sort: ";
        for(auto it:my_v)
            cout<<it<<" ";
    cout<<endl;
    return 0;
}
