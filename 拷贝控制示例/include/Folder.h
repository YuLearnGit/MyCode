#ifndef FOLDER_H
#define FOLDER_H

#include<set>
#include "Message.h"

using namespace std;
class Folder {
public:
    Folder();
    virtual ~Folder();
    //Folder& operator=(const Folder&);
    //Folder(const Folder&);

    void addMsg(Message *m3) {
        messages.insert(m3);
    }
    void remMsg(Message *m4) {
        messages.erase(m4);
    }

protected:

private:
    set<Message*> messages;
};

#endif // FOLDER_H
