#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

int reverse(int x)
{
    int rev = 0;
    while (x != 0)
    {
        int pop = x % 10;
        x /= 10;
        if (rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7))//x>0
            return 0;
        if (rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8))//x<0
            return 0;
        rev = rev * 10 + pop;//此步可能导致溢出，所以前面要判断
    }
    return rev;
}

int main()
{
    int i = 0;
    cin>>i;
    cout<<reverse(x);
    return 0;
}
