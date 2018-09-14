#include <iostream>
#include <vector>
#include <memory>

#include "Blob.h"

using namespace std;

class a{

};
class b{
    static int hehe(){};
};
int main()
{
    Blob<int> ia;
    b b1,b2;
    cout<<sizeof(b1)<<endl;
    cout<<sizeof(b2)<<endl;

    return 0;
}
