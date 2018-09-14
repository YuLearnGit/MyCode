from functools import wraps

# 本测试总开关
isTest = True


def showParameter(func):
    """
    装饰器，打印被修饰函数的参数
    :param func:被修饰的函数
    :return:
    打印示例：
        utils.mySqlDb.listTables:      P: args:('MySqlDbUtil<48213264>', 'plcdaq'),kwargs:{}
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        if isTest:
            argList = list()
            for arg in args:
                if isinstance(arg, (int,str,list,tuple,dict,set)):
                    argList.append(arg)
                else:
                    argList.append("%s<%s>" % (arg.__class__.__name__, str(id(arg))))
            # print("showParameter:      ", "{0}.{1}:".format(func.__module__,func.__name__).ljust(22, " "), "args:%s,kwargs:%s" % (str(args), str(kwargs)))
            print("\033[1;33m","{0}.{1}:".format(func.__module__, func.__name__).ljust(30, " "), "P:",
                  "args:%s,kwargs:%s" % (str(tuple(argList)), str(kwargs)),"\033[0m")
        return func(*args, **kwargs)

    return wrapper


def showReturn(func):
    """
    装饰器，打印被修饰函数的返回值
    :param func:被修饰的函数
    :return:
    打印示例：
        utils.mySqlDb.listTables:      R: [True, ['datasources']]
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        rst = func(*args, **kwargs)
        if isTest:
            # print("showReturn:         ", "{0}.{1}:".format(func.__module__,func.__name__).ljust(22, " "), rst)
            print("\033[1;34m","{0}.{1}:".format(func.__module__, func.__name__).ljust(30, " "), "R:", rst,"\033[0m")
        # print("\"%s\":return:" % func.__name__,rst)
        return rst

    return wrapper
