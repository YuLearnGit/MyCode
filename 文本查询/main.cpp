#include <iostream>
#include <map>
#include <set>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

int main()
{
    ifstream in("test.txt");
    string line="";
    vector<string> my_vec;
    while(getline(in,line)){
        my_vec.push_back(line);
    }

    for(auto var : my_vec){
        cout << var <<endl;
    }

    map<string,set<int>> my_map;
    string word;
    cout <<"请输入查找的单词（输入q退出）：";
    while((cin>>word) && cin!="q"){
        for(int i=0;i<my_vec.size();++i){
            istringstream s(my_vec[i]);
            string m="";
            while(s >> m){
                if(m==word){
                    my_map[word].insert(i);
                    break;
                }
            }
        }
    }

    cout << "occurs "<<my_map[word].size() <<" times "<<endl;
    for(auto it=my_map[word].begin();it!=my_map[word].end();++it){
       cout<<"       "<<"(line "<<*it<<") "<<my_vec[*it]<<endl;
    }
    return 0;
}
