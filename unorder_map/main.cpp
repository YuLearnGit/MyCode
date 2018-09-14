#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

typedef unordered_map<string,string> stringmap;

stringmap merge (stringmap a,stringmap b) {
  stringmap temp(a); temp.insert(b.begin(),b.end()); return temp;
}

int main ()
{
  stringmap first;                              // 空
  stringmap second ( {{"apple","red"},{"lemon","yellow"}} );       // 用数组初始
  stringmap third ( {{"orange","orange"},{"strawberry","red"}} );  // 用数组初始
  stringmap fourth (second);                    // 复制初始化
  stringmap fifth (merge(third,fourth));        // 移动初始化
  stringmap sixth (fifth.begin(),fifth.end());  // 范围初始化

  cout << "sixth contains:";
  for (auto& x: sixth) cout << " " << x.first << ":" << x.second;
  cout << endl;

  return 0;
}
