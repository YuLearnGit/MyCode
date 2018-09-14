
import os

path1 = os.getcwd()
print(path1)


# for parent,dirnames,filenames in os.walk(path1):    #三个参数：分别返回1.父目录 2.所有文件夹名字（不含路径） 3.所有文件名字
#     for dirname in  dirnames:                       #输出文件夹信息
#         print("dirnames","parent is:" + parent)
#         print("dirnames","dirname is:" + dirname)
#
#     for filename in filenames:                        #输出文件信息
#         print("filenames","parent is:" + parent)
#         print("filenames","filename is:" + filename)
#         print("filenames","the full name of the file is:" + os.path.join(parent,filename))  #输出文件路径信息

try:
    fo = open(r"myvpn.py", "r+",encoding="utf-8")
    lines = fo.readlines()
    print(len(lines))
    fo.seek(0,0)
    for line in lines:
        newline = line.replace('\t', '    ').rstrip()
        fo.write(newline)
        fo.write('\n')

except Exception as e:
    print(e)


if __name__ == "__main__":
    pass

