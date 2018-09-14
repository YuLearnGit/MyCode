#include <iostream>
#include <cstring>
#include <vector>
#include <map>
#include <set>

using namespace std;

void FindNumsAppearOnce(vector<int> data,int* num1,int *num2)
{
    map<int,int> my_map;
    for(unsigned int i=0; i<data.size(); ++i)
    {
        my_map[data[i]]++;
    }
    for(auto it=my_map.begin(); it != my_map.end(); ++it)
    {
        cout<<it->first<<" "<<it->second<<endl;
    }
    for(auto it=my_map.begin(); it != my_map.end(); ++it)
    {
        if(it->second == 1)
        {
            *num1 = it->first;
            break;
        }
    }
    for(auto it=my_map.rbegin(); it != my_map.rend(); ++it)
    {
        if(it->second == 1)
        {
            *num2 = it->first;
            break;
        }
    }
}
class Test{
public:
    virtual void hello() final {cout<<"test hello"<<endl;}
    Test(){cout<<"constructor"<<endl;}
    ~Test(){cout<<"destructor"<<endl;};
};
class derived: public Test
{
    void hello() {cout<<"derived hello"<<endl;}
};
int main()
{

    derived *a = new derived;
    a->hello();
}
struct RandomListNode
{
    int label;
    struct RandomListNode *next, *random;
    RandomListNode(int x) :
        label(x), next(NULL), random(NULL)
    {
    }
};

RandomListNode* Clone(RandomListNode* pHead)
{
    if(pHead == NULL)
        return NULL;
    /*复制节点*/
    RandomListNode* pNode = pHead;
    while(pNode != NULL)
    {
        RandomListNode* pCloned = new RandomListNode(0);
        pCloned->label = pNode->label;
        pCloned->next = pNode->next;
        pCloned->random = NULL;

        pNode->next = pCloned;
        pNode = pCloned->next;
    }
    RandomListNode* cloneRes = pHead;
    while(cloneRes != NULL)
    {
        cout<<cloneRes->label<<" ";
        cloneRes = cloneRes->next;
    }

    cout<<"\n复制节点没问题"<<endl;

    /*随机节点连接*/
    RandomListNode* pNodeC = pHead;
    while(pNodeC != NULL)
    {
        RandomListNode* pRandom = pNodeC->next;
        if(pNodeC->random != NULL)
        {
            pRandom->random = pNodeC->random->next;
        }
        pNodeC = pRandom->next;
    }
    cout<<"随机节点连接没问题"<<endl;
    /*拆分*/
    RandomListNode* tmpNode = pHead;
    RandomListNode* pClonedHead = NULL;
    RandomListNode* pClonedNode = NULL;
    if(tmpNode != NULL)
    {
        pClonedHead = tmpNode->next;
        pClonedNode = tmpNode->next;
        tmpNode->next = pClonedNode->next;
        tmpNode = tmpNode->next;
    }
    while(tmpNode != NULL)
    {
        pClonedNode->next = tmpNode->next;
        pClonedNode = pClonedNode->next;
        tmpNode->next = pClonedNode->next;
        tmpNode = tmpNode->next;
    }
    cout<<"复制成功"<<endl;
    return pClonedHead;
}

#include <set>
#include <map>

bool compare(const int lhs,const int rhs)
{
    return lhs>rhs;
}

//int main()
//{
//    //使用关键字类型的比较函数
//    set<int,decltype(compare)*> my_set(compare);
//    my_set = {2,5,3,1,8,15,23,4};
//    for(auto it : my_set)
//        cout<<it<<" ";
//
//    map<int,int,decltype(compare)*> my_map(compare);
////    RandomListNode* a = new RandomListNode(0);
////    RandomListNode* b = new RandomListNode(1);
////    RandomListNode* c = new RandomListNode(2);
////    RandomListNode* d = new RandomListNode(3);
////    RandomListNode* e = new RandomListNode(4);
////    a->next = b;
////    a->random = c;
////    b->next = c;
////    b->random = e;
////    c->next = d;
////    d->next = e;
////    d->random = b;
////    RandomListNode* res = Clone(a);
//
//}
