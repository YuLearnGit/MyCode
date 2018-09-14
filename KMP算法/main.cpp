#include <iostream>
#include <string>

using namespace std;

void getNext(string &str, int *next)
{
    int i = 1, j = 0;
    int len=str.length();
    while(i < len) {
        if(j == 0 || str[i] == str[j]) {
            ++i;
            ++j;
            if(str[i] != str[j])
                next[i] = j ;
            else
                next[i] = next[j];

        } else
            j = next[j];
    }
}

int main()
{
    cout<<"ÊäÈë´ýÆ¥Åä×Ö·û´®£¨Ê×Î»Îª×Ö·û´®³¤¶È£©£º"<<endl;
    string str = "";
    while(getline(cin,str)) {
        int next[20] = {0};
        getNext(str, next);
        for(int i = 1; i < 10; ++i)
            cout << next[i] << " ";
            cout<<endl;
    }
    return 0;
}
