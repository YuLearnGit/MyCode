#ifndef SINGLETON_H
#define SINGLETON_H


class Singleton
{

public:
	static Singleton* getInstance();

private:
	Singleton();
	//把复制构造函数和=操作符也设为私有,防止被复制
	Singleton(const Singleton&);
	Singleton& operator=(const Singleton&);
	static Singleton* instance;


};

#endif // SINGLETON_H
