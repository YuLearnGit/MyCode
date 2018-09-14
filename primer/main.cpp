#include <iostream>
#include <sstream>
#include <set>
#include <vector>
#include <string>
#include <list>

using namespace std;

void func(string &s, string &oldVal, string &newVal)
{
    int _size = oldVal.size();
    string::iterator it1 = s.begin();
    string::iterator it2 = newVal.begin();
    string::iterator it3 = newVal.end();

    for(it1; it1 <= (s.end() - oldVal.size() + 1); ++it1) {
        if(s.substr(it1 - s.begin(), _size) == oldVal) {
            it1 = s.erase(it1, it1 + _size);
            s.insert(it1, it2, it3);
            advance(it1, _size);
        }
    }
}

int main()
{

    string s = "abcdefg";
    string oldval = "bc";
    string newval = "asas";
    func(s, oldval, newval);
    cout << s << endl;
    return 0;
}

