function isIp(ip) 
{ 
	obj=ip;
	var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
	var reg = obj.match(exp); 
	if(reg==null) 
	{ 
		return false;//不合法
	} 
	else 
	{ 
		return true; //合法
	} 
}

function isMask(mask) 
{ 
	obj=mask; 
	var exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/; 
	var reg = obj.match(exp); 
	if(reg==null)
	{
		 return false; //"非法"
	}
	else 
	{ 
		 return true; //"合法"
	} 
}
