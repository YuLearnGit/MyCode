#include <iostream>
#include <iterator>
#include <vector>

using namespace std;

int main()
{
    vector<int> my_v;
    istream_iterator<int> in(cin),eof;
    while(in != eof)
        my_v.push_back(*in++);
        ostream_iterator<int> out_iter(cout," ");
    copy(my_v.begin(),my_v.end(),out_iter);
    cout<<endl;
    return 0;
}
