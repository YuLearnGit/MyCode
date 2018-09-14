#include <iostream>

using namespace std;

int Fbi(int i){
    if(i<2)
        return i==0?0:1;
    return Fbi(i-1)+Fbi(i-2);

}
int main()
{
    int i=0;
    for(i;i<40;++i)
    {
        cout<<Fbi(i)<<endl;
    }
    return 0;
}
