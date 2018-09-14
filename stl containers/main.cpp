#include <iostream>
#include <vector>
#include <iterator>
using namespace std;

#include <deque>

int my_deque ()
{

    // constructors used in the same order as described above:
    std::deque<int> first;                                // empty deque of ints
    cout<<"first size : "<<first.size()<<endl;
    std::deque<int> second (4,100);                       // four ints with value 100
    cout<<"second size : "<<second.size()<<endl;

    std::deque<int> third (second.begin(),second.end());  // iterating through second
    cout<<"third size : "<<third.size()<<endl;

    std::deque<int> fourth (third);                       // a copy of third
    cout<<"fourth size : "<<fourth.size()<<endl;

    // the iterator constructor can be used to copy arrays:
    int myints[] = {16,2,77,29};
    std::deque<int> fifth (myints, myints + sizeof(myints) / sizeof(int) );

    std::cout << "The contents of fifth are:";
    for (std::deque<int>::iterator it = fifth.begin(); it!=fifth.end(); ++it)
        std::cout << ' ' << *it;

    std::cout << '\n';

    return 0;
}
#include <map>
#include <algorithm>
#include <typeinfo>
#include <unordered_set>
#include <string>

class CText
{
private:
    string str;
public:
    CText(string s) :str(s)
    {
    }
    void show()const
    {
        cout << str << endl;
    }

};
int main()
{
    vector<CText > vi;
    vi.emplace_back("hey");
    vi.front().show();
    //vi.push_back("girl");//´íÎó
    vi.back().show();
    return 0;
}
//int main ()
//{
//    std::deque<int> mydeque;
//
//    // set some initial values:
//    for (int i=1; i<6; i++)
//        mydeque.push_back(i); // 1 2 3 4 5
//
//    std::deque<int>::iterator it = mydeque.begin();
//    ++it;
//
//    it = mydeque.insert (it,10);                  // 1 10 2 3 4 5
//    // "it" now points to the newly inserted 10
//    //mydeque.insert (it,2,20);                     // 1 20 20 10 2 3 4 5
//    // "it" no longer valid!
//    it = mydeque.begin()+2;
//    cout<<*it<<endl;
//    std::vector<int> myvector (2,30);
//    mydeque.insert (it,myvector.begin(),myvector.end());
//    // 1 20 30 30 20 10 2 3 4 5
//
//    std::cout << "mydeque contains:";
//    for (it=mydeque.begin(); it!=mydeque.end(); ++it)
//        std::cout << ' ' << *it;
//    std::cout << '\n';
//    cout<<"size = "<<mydeque.size()<<"\tmax_size = "<<mydeque.max_size()<<endl;
//
//    return 0;
//}
