#include <iostream>
#include <memory.h>
using namespace std;

struct BitField1
{
    unsigned int a:4;  //ռ��4��������λ;
    unsigned int  :0;  //��λ��,�Զ���0;
    unsigned int b:4;  //ռ��4��������λ,����һ���洢��Ԫ��ʼ���;
    unsigned int c:4;  //ռ��4��������λ;
    unsigned int d:5;  //ռ��5��������λ,ʣ���3��bit�����洢4��bit������,����һ���洢��Ԫ��ʼ���;
    unsigned int  :0;  //��λ��,�Զ���0;
    unsigned int e:4;  //ռ��4��������λ,������洢��Ԫ��ʼ���;
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
    unsigned int  d:4;  //��������λ���ֶ�;
    unsigned char e:2;
    unsigned char f:3;
    unsigned char g:3;

};

struct BitField
{
    unsigned char a:2;  //���λ;
    unsigned char b:3;
    unsigned char c:3;  //���λ;
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
//    ubf.n = 0;    //��ʼ��;
//    ubf.bf.a = 0; //������Ϊ: 000
//    ubf.bf.b = 0; //������Ϊ: 000
//    ubf.bf.c = 1; //������Ϊ: 001
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
