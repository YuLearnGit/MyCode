#include <iostream>
#include <vector>
#include <utility>
#include <string>
#include <fstream>
#include <map>

using namespace std;

int main0()
{
    vector<pair<string, int>> vec1(3);
    ifstream in1("string.txt");
    string str;
    size_t i = 0;
    while (in1 >> str) {
        vec1[i].first = str;
        ++i;
    }
    ifstream in2("int.txt");
    int val;
    size_t j = 0;
    while (in2 >> val) {
        vec1[j].second = val;
        ++j;
    }

    vector<pair<string, int>>::iterator it1 = vec1.begin();
    cout << "vector��Ԫ��Ϊ��" << endl;
    for (it1; it1 != vec1.end(); ++it1) {
        cout << it1->first << " " << it1->second << endl;
    }
    return 0;
}

int main1()
{
    vector<pair<string, int>> my_vec;
    ifstream in1("string.txt");
    string str;

    ifstream in2("int.txt");
    int i = 0;
    while(in1 >> str && in2 >> i)
        my_vec.push_back(make_pair(str, i));

    cout << "vector��Ԫ��Ϊ��" << endl;
    for (auto it1 = my_vec.begin(); it1 != my_vec.end(); ++it1) {
        cout << it1->first << " " << it1->second << endl;
    }
    return 0;
}

int main()
{
    map<string, vector<string>> family;
    vector<pair<string,string>> child;

    string first_name, child_name, _birthday;
    while ( [&]() {cout << "�������ͥ����:"; return cin >> first_name && (first_name != "end");}()) {
        while([&]() {cout << "�����뺢�ӵ����֣�"; return cin >> child_name && (child_name != "end");}()){
            family[first_name].push_back(child_name);
            while([&]() {cut << "�����뺢�ӵ����գ�" ; return cin >> _birthday && (_birthday !="end");}()){
                child.push_back(make_pair(child_name,_birthday));

            }

        }

    }

    return 0;
}
