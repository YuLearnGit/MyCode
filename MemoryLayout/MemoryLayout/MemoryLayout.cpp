// MemoryLayout.cpp: 定义控制台应用程序的入口点。
//

#include "stdafx.h"

class Base
{
	int a;
	int b;
public:
	void CommonFunction();
	void virtual VirtualFunction();
};


class DerivedClass1 : public Base
{
	int c;
public:
	void DerivedCommonFunction();
	void virtual VirtualFunction();
};

class DerivedClass2 : public Base
{
	int d;
public:
	void DerivedCommonFunction();
	void virtual VirtualFunction();
};

class DerivedDerivedClass : public DerivedClass1, public DerivedClass2
{
	int e;
public:
	void DerivedDerivedCommonFunction();
	void virtual VirtualFunction();
};
int main()
{
    return 0;
}

