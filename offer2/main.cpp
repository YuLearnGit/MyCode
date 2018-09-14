#include <iostream>
#include <vector>

#define Debug 1
using namespace std;

struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

TreeNode* core(const vector<int>& pre,const vector<int>& vin)
{
    if(pre.empty() || vin.empty())
        return nullptr;
    TreeNode* pHead = new TreeNode(pre[0]);
    pHead->left = nullptr;
    pHead->right = nullptr;
    unsigned int index = 0;
    for(unsigned int i=0; i<vin.size(); ++i)
    {
        if(vin[i] == pre[0])
        {
            index = i;
            break;
        }
    }
    vector<int> left_pre;
    vector<int> left_vin;
    vector<int> right_pre;
    vector<int> right_vin;

    for(unsigned int i=1; i<index+1; ++i)
    {
        left_pre.push_back(pre[i]);
    }
    for(unsigned int i =index+1; i<pre.size(); ++i)
    {
        right_pre.push_back(pre[i]);
    }
    for(unsigned int i=0; i<vin.size(); ++i)
    {
        if(i<index)
            left_vin.push_back(vin[i]);
        if(i>index)
            right_vin.push_back(vin[i]);
    }
#ifdef Debug
    for(auto item:left_pre)
        cout<<item<<" ";
    cout<<endl;
    for(auto item:left_vin)
        cout<<item<<" ";
    cout<<endl;
    for(auto item:right_pre)
        cout<<item<<" ";
    cout<<endl;
    for(auto item:right_vin)
        cout<<item<<" ";
    cout<<endl;
#endif // Debug
    pHead->left = core(left_pre,left_vin);
    pHead->right = core(right_pre,right_vin);
    left_pre.clear();
    left_vin.clear();
    right_pre.clear();
    right_vin.clear();
    return pHead;
}
TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> vin)
{

    if(pre.size() <=0 || vin.size()<=0)
        return nullptr;
    return core(pre,vin);
}
int main()
{
    vector<int> pre = {1,2,4,7,3,5,6,8};
    vector<int> vin = {4,7,2,1,5,3,8,6};
    reConstructBinaryTree(pre,vin);
    return 0;
}
