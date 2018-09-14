#include "StrBlob.h"
#include <vector>
#include <string>
#include <memory>

using namespace std;

StrBlob::StrBlob():data(make_shared<vector<string>>()){}
StrBlob::StrBlob(std::initializer_list<std::string> il):data(make_shared<vector<string>>(il)){}

void StrBlob::check(size_type i,const string &msg) const{
    if(i>=data->size())
        throw out_of_range(msg);
}

const string& StrBlob::front() {
    check(0,"front on empty StrBlob");
    return data->front();
}

const string& StrBlob::back(){
    check(0,"back on empty StrBlob");
    return data->back();
}

void StrBlob::pop_back(){
    check(0,"pop_back on empty StrBlob");
    data->pop_back();
}
