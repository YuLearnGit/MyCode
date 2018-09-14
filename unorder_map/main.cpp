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
  stringmap first;                              // ��
  stringmap second ( {{"apple","red"},{"lemon","yellow"}} );       // �������ʼ
  stringmap third ( {{"orange","orange"},{"strawberry","red"}} );  // �������ʼ
  stringmap fourth (second);                    // ���Ƴ�ʼ��
  stringmap fifth (merge(third,fourth));        // �ƶ���ʼ��
  stringmap sixth (fifth.begin(),fifth.end());  // ��Χ��ʼ��

  cout << "sixth contains:";
  for (auto& x: sixth) cout << " " << x.first << ":" << x.second;
  cout << endl;

  return 0;
}
