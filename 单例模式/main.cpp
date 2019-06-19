//#include <iostream>
//#include "Singleton.h"
//
//using namespace std;
//
//int main()
//{
//    Singleton* singleton1 = Singleton::getInstance();
//	Singleton* singleton2 = Singleton::getInstance();
//
//	if (singleton1 == singleton2)
//        cout<<"singleton1 = singleton2"<<endl;
//    return 0;
//}
#include<iostream>
#include<mutex>
#include<memory>

using namespace std;

std::mutex mtx;
class CSingleton
{
private:
    CSingleton() //构造函数是私有的
    {
    }
    CSingleton(const CSingleton&){}
    CSingleton& operator=(const CSingleton&){}
   // static CSingleton *m_pInstance;
    static std::shared_ptr<CSingleton> m_pInstance;
public:
    static shared_ptr<CSingleton> GetInstance()
    {
        mtx.lock();
        if (m_pInstance == nullptr) //判断是否第一次调用
            m_pInstance = shared_ptr<CSingleton>(new CSingleton());
        mtx.unlock();
        return m_pInstance;
    }
};

shared_ptr<CSingleton>CSingleton::m_pInstance = nullptr;

int main()
{
std::shared_ptr<CSingleton> single1 = CSingleton::GetInstance();
std::shared_ptr<CSingleton> single2 = CSingleton::GetInstance();
if(single1 == single2)
	cout<<"single1 = single2"<<endl;
return 0;

}
