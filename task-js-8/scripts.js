(function () {
    var inputSource = document.getElementById("inputSource"),
        leftInBtn = document.getElementById("leftIn"),
        rightInBtn = document.getElementById("rightIn"),
        leftOutBtn = document.getElementById("leftOut"),
        rightOutBtn = document.getElementById("rightOut"),
        numList = document.getElementById("numList"),
        searchSource = document.getElementById("search"),
        searchBtn = document.getElementById("searchBtn"),
        data = ["1", "2", "3", "one", "two", "three", "7", "11"];

    function dataTrim() {
        var dataSource = inputSource.value;
        dataSource = dataSource.replace(/(,|，|、|\s|\r\n)/g, " "); //将所有内容分割格式转换为空格。
        dataSource = dataSource.replace(/^\s*/, ""); //将最左边所有空格消除
        dataSource = dataSource.replace(/\s*$/, ""); //将最右边所有空格消除
        dataSource = dataSource.replace(/\s{2,}/g, " "); //将中间出现两次以上空格换成一次空格。
        dataSource = dataSource.split(" "); //将处理好的字符串以空格分割成数组。
        return dataSource; //返回处理好的数组
    }

    function render() {
        var renderString = "",
            length = data.length;
        for (var i = 0; i < length; i++) {
            renderString += "<span>" + data[i] + "</span>";
        }
        numList.innerHTML = renderString;
    }

    function clickHandler() {
        leftInBtn.addEventListener("click", function () {
            var textAreaData = dataTrim();
            data = textAreaData.concat(data);
            render();
            inputSource.value = "";
        });
        rightInBtn.addEventListener("click", function () {
            var textAreaData = dataTrim();
            data = data.concat(textAreaData);
            render();
            inputSource.value = "";
        });
        leftOutBtn.addEventListener("click", function () {
            data.shift();
            render();
            inputSource.value = "";
        });
        rightOutBtn.addEventListener("click", function () {
            data.pop();
            render();
            inputSource.value = "";
        });
        searchBtn.addEventListener("click", function () {
            var length = data.length,
                searchSourceValue = searchSource.value,
                spanList = numList.children,
                mark = [];
            searchSourceValue = searchSourceValue.replace(/^\s*/, "");
            searchSourceValue = searchSourceValue.replace(/^\s*$/, "");
            searchSourceValue = searchSourceValue.replace(/\s{2,}/g, " ");
            searchSourceValue = searchSourceValue.split(" ");
            for (var i = 0; i < length; i++) {
                spanList[i].className = "";
                for (var j = 0; j < searchSourceValue.length; j++) {
                    if (data[i].indexOf(searchSourceValue[j]) >= 0) {
                        mark.push(i);
                        spanList[i].className = "firebrick";
                    }
                }
            }
            console.log(mark);
        });
    }

    function init() {
        render();
        dataTrim();
        clickHandler();

    }
    init();
})();