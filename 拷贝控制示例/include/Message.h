#ifndef MESSAGE_H
#define MESSAGE_H

#include <string>
#include <set>


class Message {
friend class Folder;
public:
    explicit Message(const std::string &str = ""): contents(str) {}
    Message(const Message&);//拷贝构造函数
    Message& operator=(const Message&);//拷贝赋值运算符

    virtual ~Message();//析构函数
    //从给定Folder集合中添加/删除本Message
    void save (Folder&);
    void remove(Folder&);

protected:

private:
    std::string contents;//实际消息文本
    std::set<Folder*> folders;//包含本Message的Folder
    void add_to_Folders(const Message&);//将本Message添加到指定参数的Folder中
    void remove_from_Folders();//从folders中的每个Folder中删除本Message
};

#endif // MESSAGE_H
