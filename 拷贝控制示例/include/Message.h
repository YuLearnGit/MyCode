#ifndef MESSAGE_H
#define MESSAGE_H

#include <string>
#include <set>


class Message {
friend class Folder;
public:
    explicit Message(const std::string &str = ""): contents(str) {}
    Message(const Message&);//�������캯��
    Message& operator=(const Message&);//������ֵ�����

    virtual ~Message();//��������
    //�Ӹ���Folder���������/ɾ����Message
    void save (Folder&);
    void remove(Folder&);

protected:

private:
    std::string contents;//ʵ����Ϣ�ı�
    std::set<Folder*> folders;//������Message��Folder
    void add_to_Folders(const Message&);//����Message��ӵ�ָ��������Folder��
    void remove_from_Folders();//��folders�е�ÿ��Folder��ɾ����Message
};

#endif // MESSAGE_H
