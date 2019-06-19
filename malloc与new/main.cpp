#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <malloc.h>

//#include <malloc>
using namespace std;

class test
{
public:
    test(){cout<<"constructor"<<endl;}
    ~test(){cout<<"destructor"<<endl;}
};
int main()
{
    //test *ptr = new test;
    void *a = malloc(sizeof(test));
    test *ptr = new(a) test;
    delete ptr;
    free(a);
    return 0;
}
