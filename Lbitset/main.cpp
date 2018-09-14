#include <iostream>
#include <bitset>

using namespace std;

int main()
{
    bitset<32> my_b(0x12345678);
    cout<<"contains: ";
    for(int i=0;i<32;++i)
        cout<<my_b[i];
    cout<<endl;
    cout<<"my_b.to_ulong(): "<<my_b.to_ulong()<<endl;
    cout<<"my_b.to_ullong(): "<<my_b.to_ullong()<<endl;
    cout<<"my_b.to_string(): "<<my_b.to_string()<<endl;
    return 0;
}
