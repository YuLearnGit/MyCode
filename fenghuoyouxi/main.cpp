#include <iostream>
#include <string>
#include <vector>

using namespace std;

void redirectInput(char *filename = nullptr)
{
    if (filename == nullptr)
    {
        filename = "input.txt";
    }
    freopen(filename, "r", stdin);
}

typedef pair<string,string> SPAIR;

bool mapping(const string& a,const string& b)
{
    unsigned int a_len = a.size();
    unsigned int b_len = b.size();
    if(a_len != b_len || a==b)
        return false;
    int distance = (int)(b[0]-a[0]);
    string tmp = a;
    for(auto &item:tmp)
    {
        item = item - distance;
    }
    if(b == tmp)
        return false;
    for(int i=1;i<a_len;++i)
    {
        if((int)(b[i]-a[i]) != distance)
            return false;
    }
    return true;
}
int main()
{
    redirectInput("input.txt");
    int line = 0;
    cin>>line;
    vector<SPAIR> data_v;
    for(int i=0;i<line;++i)
    {
        string a(""),b("");
        cin>>a>>b;
        data_v.emplace_back(make_pair(a,b));
    }
    for(auto it:data_v)
    {
        if(mapping(it.first,it.second))
            cout<<"Yes"<<endl;
        else
            cout<<"No"<<endl;
    }
    return 0;
}
