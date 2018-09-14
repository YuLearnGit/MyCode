#include <iostream>
#include <string>

using namespace std;

int main()
{
    string s1="a value",s2="another";
    auto n=(s1+s2).find('a');
    cout << n<<endl;
    return 0;
}
