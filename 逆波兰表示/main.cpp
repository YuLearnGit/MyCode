#include <iostream>
#include <string>
#include <stack>

using namespace std;

void RPExpression(string &e)
{
    //ջs1���ڴ�������
    stack<char> s1;
    //�����ַ�'#'�����㼶����͵����������ѹ��ջs1��
    s1.push('#');
    //�����ַ���
    char ch;
    for(auto it = e.begin(); it != e.end(); ++it) {
        switch(*it) {
        //��'('��ֱ����ջs1
        case '(':
            s1.push(*it);
            break;
        //��')'�򽫾���ջs1ջ���������'('֮���������������ջ������'('
        case ')':
            while(s1.top() != '(') {
                ch = s1.top();
                cout<<ch<<" ";
                s1.pop();
            }
            s1.pop();
            break;
        case '+':
        case '-':
        //ջ��Ϊ'('ֱ����ջ������ջ��Ԫ�س�ջ
                if(s1.top() == '(')
                {
                    s1.push(*it);
                    break;
                }
                else
                {
                    while(s1.top()!='#')
                    {
                    cout<<s1.top()<<" ";
                    s1.pop();
                    }
                }
                s1.push(*it);
            break;

        case '*':
        case '/':
            s1.push(*it);
            break;
        default:
            cout<<*it<<" ";
        }
    }
    while(s1.top()!='#'){
        cout<<s1.top()<<" ";
        s1.pop();
    }

}

int main()
{
    cout << "������ʽ��" << endl;
    string str;
    while(cin >> str) {
        RPExpression(str);
    }

    return 0;
}
