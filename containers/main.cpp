#include <iostream>
#include <vector>
#include <set>
#include <map>
#include <fstream>
#include <string>
#include <sstream>

using namespace std;

map<string, string> buildMap(ifstream &map_file)
{
    map<string, string> trans_map;
    string key, value;
    while(map_file >> key && getline(map_file, value)) {
        if(value.size() > 1) {
            cout << value << endl;
            trans_map[key] = value.substr(1);
        }

        else
            throw runtime_error("no rule for " + key);
    }

    return trans_map;
}

const string & transform(const string &s, const map<string, string> &m)
{
    auto map_it = m.find(s);
    if(map_it != m.cend())
        return map_it -> second;
    else
        return s;
}

void word_transform(ifstream &map_file, ifstream &input)
{
    auto trans_map = buildMap(map_file);
    string text;
    while(getline(input, text)) {
        istringstream stream(text);
        string word;
        bool firstword = true;
        while(stream >> word) {
            if(firstword)
                firstword = false;
            else
                cout << " ";
            cout << transform(word, trans_map);
        }
        cout << endl;
    }
}

int main()
{
//    vector<int> vec{2,4,6,8,2,4,6,8};
//    cout << "vec.size: " <<vec.size() <<endl;
//    set<int> se;
//    se.insert(vec.begin(),vec.end());
//    cout << "se.size: " << se.size() <<endl;
//    se.insert({1,3,5,7,1,3,5,7});
//    for(auto var : se){
//        cout << var <<" ";
//    }

//
//    map<string,int> m{{"hehe",1}};
//    m.insert({"hehe",2});
//    for(auto it = m.begin();it != m.end();++it){
//        cout <<it->first <<" " <<it->second;
//    }

//    multimap<string, string> author_works{{"tom", "C++ primer"}, {"bob", "C"}, {"tom", "C#"}, {"john", "hehe"}, {"john", "java"}};
//    string str;
//    cout << "please input author name: ";
//    while(cin >> str) {
//
//        auto it = author_works.find(str);
//        if(it != author_works.end()) {
//            author_works.erase(str);
//            cout << "erase successful!" << endl;
//        } else
//            cout << "name was not found" << endl;
//        for(auto var : author_works) {
//            cout << var.first << " " << var.second << endl;
//        }
//
//    }
    ifstream map_file("1.txt");
    ifstream input("2.txt");
    word_transform(map_file, input);
    return 0;
}
