#include <iostream>       // std::cout
#include <thread>         // std::thread
#include <typeinfo>

using namespace std;

void thread1()
{
    cout<<"thread1"<<endl;
}

void thread2(int x)
{
    cout<<"thread2"<<endl;
}

int main()
{
    cout<<"main thread id = "<<this_thread::get_id()<<endl;
    std::thread first (thread1);     // spawn new thread that calls foo()
    thread::id th1 = first.get_id();
    cout<<th1<<endl;
    std::thread second (thread2,0);  // spawn new thread that calls bar(0)

    // synchronize threads:
    first.join();                // pauses until first finishes
    second.join();               // pauses until second finishes

    return 0;
}
