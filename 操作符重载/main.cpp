#include <iostream>

using namespace std;

class Date
{
private:
    int _year;
    int _month;
    int _day;
public:
    //构造函数
    Date(int year,int month,int day):_year(year),_month(month),_day(day){}
    //拷贝构造函数
    Date(Date& d):_year(d._year),_month(d._month),_day(d._day){}

    Date& operator = (const Date& d)
    {
        this->_day = d._day;
        this->_month = d._month;
        this->_day = d._day;
        return *this;
    }
    bool operator == (const Date& d)
    {
        return this->_year == d._year && this->_month == d._month && this->_day == d._day;
    }
};
int main()
{

    cout << "Hello world!" << endl;
    return 0;
}
