#-------------------------------------------------
#
# Project created by QtCreator 2018-04-25T10:43:47
#
#-------------------------------------------------

QT       += core gui
QT += network
CONFIG += c++11
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets
OBJECTS_DIR  = tmp
MOC_DIR      = tmp
TARGET = firewall-test
TEMPLATE = app

# The following define makes your compiler emit warnings if you use
# any feature of Qt which has been marked as deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
        main.cpp \
        mainwindow.cpp \
    sendinfo.cpp \
    basedeviceform.cpp \
    protectdeviceform.cpp \
    tools.cpp \
    devicecheck.cpp \
    fwdeviceform.cpp \
    fileoperation.cpp \
    configdpirules.cpp


HEADERS += \
        mainwindow.h \
    sendinfo.h \
    basedeviceform.h \
    protectdeviceform.h \
    tools.h \
    devicecheck.h \
    fwdeviceform.h \
    fileoperation.h \
    configdpirules.h

FORMS += \
        mainwindow.ui

DISTFILES +=
