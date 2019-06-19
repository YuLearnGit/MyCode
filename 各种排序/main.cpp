#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

/*优化的冒泡排序*/
void bubbleSort(vector<int>& to_be_sorted)
{
    unsigned int len = to_be_sorted.size();
    bool status = true;
    for( int i=0; i<len-1 && status; ++i)
    {
        status = false;
        for( int j=len-2;j>=i;j--)
        {
            if(to_be_sorted[j]>to_be_sorted[j+1])
            {
                swap(to_be_sorted[j],to_be_sorted[j+1]);
                status = true;
            }
        }
    }
}

/*简单选择排序*/
void selectSort(vector<int>& to_be_sorted)
{
    unsigned int len = to_be_sorted.size();
    for(unsigned int i=0; i<len-1; ++i)
    {
        unsigned int min_index = i;
        for(unsigned int j = i+1; j<len; ++j)
        {
            if(to_be_sorted[j]<to_be_sorted[min_index])
                min_index = j;
        }
        if(min_index != i)
            swap(to_be_sorted[min_index],to_be_sorted[i]);
    }
}

/*直接插入排序*/
void insertSort(vector<int>& to_be_sorted)
{
    unsigned int len = to_be_sorted.size();
    for(unsigned int i=1; i<len; ++i)
    {
        unsigned int j = i;
        while(j>0 && to_be_sorted[j]<to_be_sorted[j-1])
        {
            swap(to_be_sorted[j],to_be_sorted[j-1]);
            --j;
        }
    }

}
int main()
{
    vector<int> my_v = {9,1,5,8,3,7,4,6,2};
    bubbleSort(my_v);
//    selectSort(my_v);
//    insertSort(my_v);
    for(int item:my_v)
        cout<<item<<" ";
    return 0;
}
