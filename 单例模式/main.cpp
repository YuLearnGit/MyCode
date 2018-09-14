#include <iostream>
#include "Singleton.h"

using namespace std;

int main()
{
    cout << "Hello world!" << endl;
    Singleton* singleton1 = Singleton::getInstance();
	Singleton* singleton2 = Singleton::getInstance();

	if (singleton1 == singleton2)
        cout<<"singleton1 = singleton2"<<endl;
    return 0;
}
