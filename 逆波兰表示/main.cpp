#include <iostream>
#include <string>
#include <stack>

using namespace std;

void RPExpression(string &e)
{
    //栈s1用于存放运算符
    stack<char> s1;
    //假设字符'#'是运算级别最低的运算符，并压入栈s1中
    s1.push('#');
    //遍历字符串
    char ch;
    for(auto it = e.begin(); it != e.end(); ++it) {
        switch(*it) {
        //遇'('则直接入栈s1
        case '(':
            s1.push(*it);
            break;
        //遇')'则将距离栈s1栈顶的最近的'('之间的运算符，逐个出栈，抛弃'('
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
        //栈顶为'('直接入栈，否则栈中元素出栈
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
    cout << "输入表达式：" << endl;
    string str;
    while(cin >> str) {
        RPExpression(str);
    }

    return 0;
}
