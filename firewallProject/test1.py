import re
import json
import time, os
import pprint
class Class:
    G = "GG"
    _H = "HH"
    _I_ = "II"
    __J = "JJ"
    __K__ = "KK"

    def __init__(self):
        print("I am class c")
        self.a = "aa"
        self.b = "bb"
        self._c = "cc"
        self.__d = "dd"
        self.__e__ = "ee"
        self._f_ = "ff"



try:
    c = Class()
    print(c)
    print(c.__dict__)
    print(Class.__dict__)

except Exception as e:
    print(e)
finally:
    pass
if __name__ == "__main__":
    pass
