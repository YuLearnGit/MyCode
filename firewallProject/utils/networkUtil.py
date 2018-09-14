import re

#检查IP的格式是否规范
def isIp(ip):
    reg_ip_str = "^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
    if re.match(reg_ip_str,ip) is not None:
        return True
    return False

#检查掩码的格式是否规范
def isMask(mask):
    reg_mask_str = "^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$"
    if re.match(reg_mask_str,mask) is not None:
        return True
    return False

#将IP地址转为int型变量
def ipToInt(ip):
    ip = ip.split(".")
    intIp = 0
    intIp |= int(ip[0]) << 24
    intIp |= int(ip[1]) << 16
    intIp |= int(ip[2]) << 8
    intIp |= int(ip[3])
    return intIp

#将int型变量转为IP地址字符串
def intToIp(intIp):
    return "{0}.{1}.{2}.{3}".format((intIp&0xFF000000)>>24,(intIp&0x00FF0000) >> 16,(intIp&0x0000FF00) >> 8,(intIp&0xFF))
