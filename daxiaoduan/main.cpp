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
    test.data = 0x12345678;

    if(test.ch == 0x78)
    {
        printf("little endian!\n");

    }
    else
    {
        printf("big endian!\n");

    }

//    for(int i=0; i<4; i++)
//
//    {
//        printf("%#x ------- %p\n",*((char *)&test.data + i),(char *)&test.data + i);
//
//    }

    return 0;

}
