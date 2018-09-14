$(document).ready(function() {
	$(".tipped").attr('data-tipper-options','{"direction":"bottom"}');

	$("#comment_label").attr("data-title","给新建的规则添加备注，记录与规则相关的信息，如此规则意思，用途等<br>此备注存放于数据库，不参与规则的生成");
	$("#append_table_label").attr("data-title","-t<br>" +
		"指定此规则所添加的表，有以下几个选择：<br>" +
		"1.filter<br>" +
		"2.nat<br>" +
		"3.mangle<br>" +
		"4.raw");
	$("#append_chain_label").attr("data-title","-A<br>" +
		"指定此规则所添加的链，有以下几个选择：<br>" +
		"1.INPUT<br>" +
		"2.OUTPUT<br>" +
		"3.FORWARD<br>" +
		"4.PREROUTING<br>" +
		"5.POSTROUTING");
	$("#protocol_label").attr("data-title","-p<br>" +
		"指定此规则所添加的表，有以下几个选择：<br>" +
		"1.tcp<br>" +
		"2.icmp<br>" +
		"3.ip<br>" +
		"4.udp");
	$("#ip_version_label").attr("data-title","指定IP协议版本，可用选项如下：<br>" +
		"1.ipv4:--ipv4<br>" +
		"2.ipv6:--ipv6");
	$("#src_ip_label").attr("data-title","-s<br>" +
		"源地址");
	$("#dst_ip_label").attr("data-title","-d<br>" +
		"目的地址");
	$("#src_port_label").attr("data-title","--sport<br>" +
		"源端口");
	$("#dst_port_label").attr("data-title","--dport<br>" +
		"目的端口");
	$("#in_interface_label").attr("data-title","-i<br>" +
		"入口网卡");
	$("#out_interface_label").attr("data-title","-o<br>" +
		"出口网卡");
	$("#change_src_dst_label").attr("data-title","交换源、目的地址和端口");

	$("#other1_label").attr("data-title","如果此处列出的参数不够用，可以在此处输入参数和参数值（此部分放在-j参数之前）");


	$("#target_label").attr("data-title","-j<br>" +
		"当此规则被匹配时，采取的操作,可选动作如下：<br>" +
		"1.ACCEPT<br>" +
		"2.DROP<br>" +
		"3.RETURN");
	$("#other2_label").attr("data-title","如果此处列出的参数不够用，可以在此处输入参数和参数值（此部分放在-j参数之后）")
	
	$(".tipped").tipper();
});