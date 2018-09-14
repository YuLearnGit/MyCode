#ifndef SINGLETON_H
#define SINGLETON_H


class Singleton
{

public:
	static Singleton* getInstance();

private:
	Singleton();
	//�Ѹ��ƹ��캯����=������Ҳ��Ϊ˽��,��ֹ������
	Singleton(const Singleton&);
	Singleton& operator=(const Singleton&);
	static Singleton* instance;


};

#endif // SINGLETON_H
