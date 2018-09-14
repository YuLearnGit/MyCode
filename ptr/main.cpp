#include <iostream>
#include <memory>
#include <vector>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "StrBlob.h"
using namespace std;

int main0()
{
    StrBlob b1;
    {
        StrBlob b2 = {"a", "an", "the"};
        b1 = b2;
        b2.push_back("about");
    }
    cout << b1.size();
    return 0;
}

void each(int int_ref[10])
{
    std::cout << sizeof(int_ref) << std::endl;
    for(int i = 0; i < 10; i++)
        std::cout << int_ref[i] << " ";
    std::cout << std::endl;
}

void each2(int (&int_ref)[10])
{
    std::cout << sizeof(int_ref) << std::endl;
    for(int i = 0; i < 10; i++)
        std::cout << int_ref[i] << " ";
    std::cout << std::endl;
}

int main1()
{
    int int_array[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    each(int_array);//问题1：sizeof()的值？
    each2(int_array);//问题2：sizeof()的值？

    return 0;
}

int main2(){
    char str1[]={'a','b','c','d','e','f'};
    char *str2="abcdef";
    string str3="abcdef";
    cout <<"str1 " <<sizeof(str1)<<" "<<strlen(str1)<<endl;
    cout <<"str2 "<<sizeof(str2) <<" "<<strlen(str2)<<endl;
    cout <<"str3 "<<sizeof(str3)<<" "<<str3.length()<<endl;
    return 0;
}

