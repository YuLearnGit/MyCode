#include <iostream>
#include <memory.h>
using namespace std;

struct BitField1
{
    unsigned int a:4;  //占用4个二进制位;
    unsigned int  :0;  //空位域,自动置0;
    unsigned int b:4;  //占用4个二进制位,从下一个存储单元开始存放;
    unsigned int c:4;  //占用4个二进制位;
    unsigned int d:5;  //占用5个二进制位,剩余的3个bit不够存储4个bit的数据,从下一个存储单元开始存放;
    unsigned int  :0;  //空位域,自动置0;
    unsigned int e:4;  //占用4个二进制位,从这个存储单元开始存放;
};

struct BFA
{
    unsigned char a:2;
    unsigned char b:3;
    unsigned char c:3;
};
struct BFB
{
    unsigned char a:2;
    unsigned char b:3;
    unsigned char c:3;
    unsigned int  d:4;  //多出来这个位域字段;
    unsigned char e:2;
    unsigned char f:3;
    unsigned char g:3;

};

struct BitField
{
    unsigned char a:2;  //最低位;
    unsigned char b:3;
    unsigned char c:3;  //最高位;
};
union Union
{
    struct BitField bf;
    unsigned int n;
};

 struct A
 {
     int a:5;
     int b:3;
 };

int main()
{
//    union Union ubf;
//    ubf.n = 0;    //初始化;
//    ubf.bf.a = 0; //二进制为: 000
//    ubf.bf.b = 0; //二进制为: 000
//    ubf.bf.c = 1; //二进制为: 001
//
//    printf("sizeof(BitField) = %d\n",sizeof(BitField));
//    printf("ubf.bf.n = %u\n", ubf.n);
//    printf("ubf.bf.a = %d, ubf.bf.b = %d, ubf.bf.c = %d\n", ubf.bf.a, ubf.bf.b, ubf.bf.c);

//    BFA bfa;
//    BFB bfb;
//    cout<<"sizeof(bfa) = "<<sizeof(bfa)<<"\tsizeof(bfb) = "<<sizeof(bfb)<<endl;
    char *p = "C Language";
    string s = "C Languagesdfewfrewfwefsafawfe";
    char str[] = "C Language";
    cout<<sizeof(p)<<" "<<s.size()<<" "<<sizeof(s)<<" "<<sizeof(str);
    return 0;
}
