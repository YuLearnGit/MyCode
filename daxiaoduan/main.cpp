#include <iostream>
#include <typeinfo>
#include <bitset>
#include <algorithm>
using namespace std;

struct student{
    int data;
    char ch;
};
    union endian
    {
        int data;
        char ch;
    } test;
int main()
{
    bitset<32> bitvec(0x12345678);
    for(int i=0;i<32;++i)
        cout<<bitvec[i];
    cout<<endl;
    cout<<bitvec.to_string()<<endl;
    test.data = 0x12345678;

    if(test.ch == 0x78)
    {
        printf("little endian!\n");

    }
    else
    {
        printf("big endian!\n");

    }

    for(int i=0; i<4; i++)

    {
        printf("%#x ------- %p\n",*((char *)&test.data + i),(char *)&test.data + i);

    }

    return 0;

}
