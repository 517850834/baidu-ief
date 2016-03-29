/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chartBox = document.getElementById('aqi-chart-wrap');
    var chart = '';
    var width = '';
    for (var chartDate in chartData) {
        var color = "";
        if (chartData[chartDate] < 100) {
            color = "#009966";
        } else if (chartData[chartDate] < 200) {
            color = "#ff9933";
        } else {
            color = "#cc0033";
        }
        if (pageState.nowGraTime == 'day') {
            width = '10px';
        } else if (pageState.nowGraTime == 'week') {
            width = '50px';
        } else {
            width = '150px';
        }
        chart += '<div style = "height:' + chartData[chartDate] + 'px;background-color:' + color + '; width:' + width + ';" title="' + pageState.nowSelectCity + '  ' + chartDate + '  污染指数' + chartData[chartDate] + '"></div>'
    }
    chartBox.innerHTML = chart;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
    // 确定是否选项发生了变化 
    if (radio.value == pageState.nowGraTime) {
        return;
    } else {
        pageState.nowGraTime = radio.value;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(select) {
    // 确定是否选项发生了变化 
    if (select.value == pageState.nowSelectCity) {
        return;
    } else {
        pageState.nowSelectCity = select.value;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTime = document.getElementsByTagName('input');
    var graTimeLength = graTime.length;
    for (var i = 0; i < graTimeLength; i++) {
        (function (i) {
            graTime[i].addEventListener('change', function () {
                graTimeChange(this);
            });
        })(i);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var selectItems = document.getElementById('city-select');
    var cityOptions = '';
    for (var city in aqiSourceData) {
        cityOptions += '<option value="' + city + '">' + city + '</option>';
    }
    selectItems.innerHTML = cityOptions;
    pageState.nowSelectCity = selectItems.value;
    selectItems.addEventListener('change', function () {
        citySelectChange(this);
    })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var dataSource = aqiSourceData[pageState.nowSelectCity];
    var weekData = {},
        monthData = {};

    function getWeekData() {
        var sum = 0,
            i = 0,
            week = 0;
        for (var day in dataSource) {
            sum += dataSource[day];
            i++;
            if (new Date(day).getDay() == 0) {
                week++;
                weekData['2016年第' + week + '周'] = parseInt(sum / i);
                i = 0;
                sum = 0;
            }
        }
        if (i != 0) {
            week++;
            weekData['2016年第' + week + '周'] = parseInt(sum / i);
        }
        return weekData;
    }

    function getMonthData() {
        sum = 0;
        i = 0;
        var month = 1;
        for (day in dataSource) {
            var date = new Date(day);
            //console.log(date.getMonth());
            if (date.getMonth() != month) {
                month = date.getMonth();

                if (sum != 0)
                    monthData[date.getFullYear() + '-' + (month ? ('0' + month) : month)] = parseInt(sum / i);
                sum = 0;
                i = 0;
            }
            sum += dataSource[day];
            i++;
        }
        if (i != 0) {
            month++;
            monthData[date.getFullYear() + '-' + (month ? ('0' + month) : month)] = parseInt(sum / i);
        }
        return monthData;
    }
    switch (pageState.nowGraTime) {
    case 'day':
        chartData = dataSource;
        break;
    case 'week':
        chartData = getWeekData();
        break;
    case 'month':
        chartData = getMonthData();
    }
}



/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();