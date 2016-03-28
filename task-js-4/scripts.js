/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
    "北京": 1000,
    "天津": 1000,
    "深圳": 19,
    "上海": 150
};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
    var city = document.getElementById('aqi-city-input').value,
        index = document.getElementById('aqi-value-input').value;
    city = city.replace(/\s/g, "");
    index = index.replace(/\s/g, "");
    var cityTest = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    var indexTest = /^[1-9]\d*$/;
    if (cityTest.test(city) && indexTest.test(index)) {
        if (aqiData[city] == undefined) { //如果这个城市不存在则添加该城市属性
            aqiData[city] = index;
        } else {
            alert("您输入的城市已经存在"); //如果城市已经存在则提示
        }
    } else {
        alert("请输入正确的城市名称或者污染指数");
    }
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tableBody = document.getElementById('aqi-table').children[1];
    var cityList = "";
    for (var city in aqiData) {
        cityList += '<tr><td>' + city + '</td><td>' + aqiData[city] + '</td><td><button>删除</button></td></tr>';
    }
    tableBody.innerHTML = cityList;
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() { //当点击添加按钮时
    addAqiData(); //执行新增数据操作
    renderAqiList(); //重新渲染表格
    delBtnHandle(); //给渲染出来表格中的删除按钮添加事件
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    var table = document.getElementById('aqi-table');
    var delBtn = table.getElementsByTagName('button');
    var delBtnLength = delBtn.length;
    for (var i = 0; i < delBtnLength; i++) {
        (function (i) {
            delBtn[i].addEventListener('click', function () {
                var delCity = delBtn[i].parentElement.parentElement.firstChild.innerHTML;
                delete aqiData[delCity];
                renderAqiList(); //删除城市属性完成后重新渲染表格
                delBtnHandle(); //给重新渲染出来表格中的按钮重新添加事件
            })
        })(i);
    }
}

function init() {
    var addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function () {
        addBtnHandle();
    });
    renderAqiList(); //先渲染出表格数据
    delBtnHandle(); //再进行表格删除按钮事件添加
}

init();