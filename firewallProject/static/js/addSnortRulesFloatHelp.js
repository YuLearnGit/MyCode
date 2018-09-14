
$(document).ready(function() {
	$(".tipped").attr('data-tipper-options','{"direction":"bottom"}')	

	$("#categories_label").attr("data-title","新建规则归类到这当前选中的分类下");
	$("#manage_categories_label").attr("data-title","进入管理分类界面");
	$("#reload_categories_label").attr("data-title","重新获取所有分类");
	$("#comment_label").attr("data-title","给新建的规则添加备注，记录与规则相关的信息，如此规则意思，用途等<br>此备注存放于数据库，不参与规则的生成");


	$("#action_label").attr("data-title","action<br>当此规则被匹配时，采取的操作,可选动作如下：<br>" +
		"1.报警：alert<br>2.记录：log<br>3.通过：pass<br>4.丢弃：drop<br>5.拒绝：reject");
	$("#protocol_label").attr("data-title","protocol<br>匹配此协议：可选协议如下：</br>" +
		"1.tcp<br>2.icmp<br>3.ip<br>4.udp")
	$("#change_src_dst_label").attr("data-title","交换源、目的地址和端口");
	$("#direction_label").attr("data-title","direction_operator<br>指定在哪个方向上使用snort规则，可选方向如下：<br>" +
		"1.-><br>2.<><br>" +
		"注意：不支持'<-'，如需使用请调换原目的地址、端口,然后使用'->'");
	$("#src_ip_label").attr("data-title","源IP地址<br>可填写举例如下：<br>" +
		"1.指定IP地址：192.168.1.1<br>" +
		"2.IP地址范围：172.16.10.1/24<br>" +
		"3.内置变量：可选有'$HOME_NET','$EXTERNAL_NET'<br>" +
		"4.取反操作（对以上三个都适用）：!192.169.1.1<br>" +
		"5.同时指定多个：192.168.1.1,172.16.10.1/24<br>" +
		"6.任意IP地址:填写'any'<br>");
	$("#dst_ip_label").attr("data-title","目的IP地址<br>可填写举例如下：<br>" +
		"1.指定IP地址：192.168.1.1<br>" +
		"2.IP地址范围：172.16.10.1/24<br>" +
		"3.内置变量：可选有'$HOME_NET','$EXTERNAL_NET'<br>" +
		"4.取反操作（对以上三个都适用）：!192.169.1.1<br>" +
		"5.同时指定多个：192.168.1.1,172.16.10.1/24<br>" +
		"6.任意IP地址:填写'any'<br>");
	$("#src_port_label").attr("data-title","源端口<br>可填写举例如下：<br>" +
		"1.指定端口：8080<br>" +
		"2.端口范围：三中方法，(1）1:1024 (2）:512 (3) 1024:<br>" +
		"3.取反操作（对以上两个都适用）：!1:1024<br>" +
		"4.任意端口:填写'any'<br>");
	$("#dst_port_label").attr("data-title","目的端口<br>可填写举例如下：<br>" +
		"1.指定端口：8080<br>" +
		"2.端口范围：三中方法，(1）1:1024 (2）:512 (3) 1024:<br>" +
		"3.取反操作（对以上两个都适用）：!1:1024<br>" +
		"4.任意端口:填写'any'<br>");

	$("#classtype_label").attr("data-title","classtype");
	$("#flow_label").attr("data-title","flow<br>" +
		"TCP会话状态：<br>established<br>no_established<br>" +
		"<br>应对于流量方向：<br>1.to_client><br>2.to_server<br>3.from_client<br>4.from_server");
	$("#content_label").attr("data-title",'content<br>' +
		'输入内容请用双引号括起来，如写成 "abc"<br>' +
		'使用!操作符时，请将!写在双引号外面，如写成 !"abc"<br>' +
		'清空或只填入""将不使用此选项<br>' +
		'匹配二进制内容如"|0A 0D|"' +
		'注意，请使用英文符号')
	$("#nocase_label").attr("data-title","匹配内容时忽略大小写");
	$("#add_content_tr").attr("data-title",'添加一行');
	$("#offset_label").attr("data-title","offset<br>" +
		"与content配合起作用<br>可在有效载荷内设置起点（不是包的起点）来开始匹配表达式");
	$("#depth_label").attr("data-title","depth<br>" +
		"限制content可以匹配的有效载荷的数量，降低content关键字的消耗")
	$("#gid_label").attr("data-title","gid<br>" +
		"生成器id<br>")
	$("#sid_label").attr("data-title","sid<br>" +
		"snort规则id<br>" +
		"请输入大于 1 000 000 的数值")
	$("#rev_label").attr("data-title","rev<br>" +
		"此规则版本号")
	$("#priority").attr("data-title","priority<br>" +
		"规则优先级<br>" +
		"此值越小，优先级越高，最小为0")
	$("#msg_label").attr("data-title","msg<br>" +
		"报警文本，随触发此规则的数据包一起被记录");
	$("#other_label").attr("data-title","Snort规则选项众多,如果此处列出的规则不够用，可以在此处输入需要使用规则选项和其值<br>")

	$("#modbustcp_label").attr("data-title","勾选则可用modbusTcp高级匹配功能")
	$("#modbus_unit_label").attr("data-title","modbus_unit<br>" +
		"设备单元号");
	$("#modbus_data_label").attr("data-title","modbus_data<br>" +
		"在数据域设置检测起始位置");
	$("#modbus_func_label").attr("data-title","modbus_func:&lt;code&gt;<br>预置的功能码检测<br>" +
		"如果此处列出来的功能码未能满足您的需要，请在规则选项'content'输入框中检测");


	
	$(".tipped").tipper();
});



