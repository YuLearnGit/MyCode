/**
 * Created by ZJ on 2017-07-24.
 */
var local_url = window.location.href;
$(document).ready(function () {
    var flag_stop = false;
    var selected_ids = "";
    var selected_variables;
    var legendData = [];
    var xAxisData = [];
    var series = [];
    var myChart = echarts.init(document.getElementById('monitor_chart'));
// 指定图表的配置项和数据
    var option = {
        title: {
            show: true,
            text:"变量实时监控"
        },
        // grid: {
        //     left: 5,
        //     right: 5
        // },
        tooltip: {},
        // legend: {
        //     show: true,
        //     data: [{
        //         name: "q"
        //     }, {
        //         name: "w"
        //     }, {
        //         name: "r"
        //     }]
        // },
        dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start: 0,      // 左边在 10% 的位置。
                end: 100         // 右边在 60% 的位置。
            },
            {   // 这个dataZoom组件，也控制x轴。
                type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                start: 0,      // 左边在 10% 的位置。
                end: 100         // 右边在 60% 的位置。
            }
        ],
        xAxis: {
            data: xAxisData
        },
        yAxis: {
            min: "dataMin"
        },
        series: series
        //     [
        //     //     {
        //     //     name: '销量',
        //     //     type: 'bar',
        //     //     data: [5, 20, 36, 10, 10, 20]
        //     // }
        // ]
    };

    function addDataToChart(data) {
        xAxisData.push(Math.floor(data.time));
        console.log(data.time);
        // option.xAxis.data.push(new String(data["time"]));
        for (var i = 0; i < selected_variables.length; i++) {
            series[i].data.push(data[new String(selected_variables[i].id)])
        }
        myChart.setOption({
            xAxis: {
                data: xAxisData
            },
            series: series
        });
    }

    // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
    //
    $(window).resize(function () {
        adjustChartSize();
    });
    //
    function adjustChartSize() {
        var browser_width = $(window).width();
        var browser_height = $(window).height();
        var new_width = Math.floor(browser_width - 30);
        var new_height = Math.floor(browser_height - 80);
        // console.log(new_width);
        // console.log(new_height);

        $("#monitor_chart").css({"width": new String(new_width) + "px", "height": new String(new_height) + "px"});
        myChart.resize(new_width, new_height);
        myChart.setOption(option);
    }

    setTimeout(adjustChartSize, 100);

    var table = $("#daq_variables").DataTable({
        "columns": [
            {"data": null, "title": "选择", "defaultContent": "<input type='checkbox'>"},
            {"data": "id", "title": "编号"},
            {"data": "dataName", "title": "变量名"},
            {"data": "deviceAddress", "title": "设备地址"},
            {"data": "dataUnit", "title": "单位"},
            {"data": "dataType", "title": "数据类型"},
            {"data": "dataLength", "title": "数据长度"},
            {"data": "dataAddress", "title": "数据地址"},
            {"data": "deviceName", "title": "设备名称"},
            {"data": "devicePort", "title": "设备端口"},
            {"data": "deviceUnit", "title": "设备单元"},
            {"data": "funCode", "title": "功能码"}
        ],
        "columnDefs": [
            {"orderable": false, "targets": 0}
        ],//第1列不排序
        "order": [[1, 'asc']],
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "每页显示数量  _MENU_ ",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "在结果中过滤:",
            "sUrl": "",
            "sEmptyTable": "无变量可选择",
            "sLoadingRecords": "表中数据为空",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "sDom": 'fl<"#load_div">rtip',//表外DOM位置
        "bFilter": true //开关，是否启用客户端过滤器
    });

    $("div#load_div").html('<button id="reload_variables">刷新</button> ' +
        '<button id="confirm_select" >确定</button> ' +
        '<button id="cancel_select" >撤销</button> ' +
        '<button id="close_select" >关闭</button> ');

    $("#load_div").on("click", "#reload_variables", function () {
        reload_variables(this);
    });
    $("#load_div").on("click", "#confirm_select", function () {
        confirm_select();
    });
    $("#load_div").on("click", "#cancel_select", function () {
        cancel_select();
    });
    $("#load_div").on("click", "#close_select", function () {
        close_pop()
    });

    function reload_variables(e) {
        console.log("reload");
        // var aAjaxObject = {
        //     "type": "POST",
        //     "url": local_url,
        //     "dataType": "json",
        //     "data": {
        //         "method": "r"
        //     },
        //     "error": function (e) {
        //         console.log(e);
        //         alert(e);
        //     }
        // };
        // table.settings()[0].ajax = aAjaxObject;
        // table.ajax.reload();
        createAjax(local_url, {
            "method": "r"
        }, function (data) {
            var variables = data.data;
            console.log(variables);
            selected_ids = "1,2,3";
            selected_variables = variables;
            table.clear().rows.add(variables).draw();
        })
    }

    function confirm_select() {

    }

    function cancel_select() {

    }

    function open_pop() {
        console.log("open_pop");
        $(".fade_div").removeClass("hide");
        $(".pop_div").removeClass("hide");
    }

    function close_pop() {
        console.log("close_pop");
        $(".fade_div").addClass("hide");
        $(".pop_div").addClass("hide");
    }

    $("#select_variables").click(function () {
        open_pop();
    });

    $("#close_pop").click(function () {
        close_pop();
    });

    function monitorVariables() {
        if (flag_stop) {
            return;
        }
        createAjax(local_url, {
            "method": "m",
            "ids": selected_ids
        }, function (data) {
            console.log(data);
            addDataToChart(data.data);
            setTimeout(monitorVariables, 1000);
        }, function (data) {
            console.log(data);
        });
    }

    $("#start_monitor").click(function () {
        flag_stop = false;
        for (var i = 0; i < selected_variables.length; i++) {
            legendData.push(
                selected_variables[i].id +
                " " + selected_variables[i].dataName
            );
            series.push({
                // name: selected_variables[i].dataUnit,
                name:selected_variables[i].id +
                " " + selected_variables[i].dataName,
                type: "line",
                data: []
            });
        }
        option = {
            legend: {
                data: legendData
            },
            xAxis: {
                data: xAxisData
            },
            series: series
        };
        myChart.setOption(option);
        monitorVariables();
    });

    $("#stop_monitor").click(function () {
        flag_stop = true;
    })
});
