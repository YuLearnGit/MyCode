#include <iostream>

using namespace std;

class Base {
public:
    void pub_mem();
    void memfcn(Base &b) {
        b = *this;
    }
    virtual void print(){cout<<"Base"<<endl;}
protected:
    int prot_mem;
private:
    char priv_mem;
};

class Pub_Derv: public Base {
    int f() {
        return prot_mem;
    }
    void print(){cout<<"Pub_Derv"<<endl;}

    void memfcn(Base &b) {
        b = *this;
    }
};

class Priv_Derv: private Base {
    int f1() const {
        return prot_mem;
    }
    void memfcn(Base &b) {
        b = *this;
    }
};

class Derived_from_Public: public Pub_Derv {
    int use_base() {
        return prot_mem;
    }
    void memfcn(Base &b) {
        b = *this;
    }
};
int main()
{

    Base *b = new Pub_Derv();
    b->print();
    return 0;
}
