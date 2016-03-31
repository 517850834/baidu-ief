(function () {
    var data = [];
    var dataStatus = {
        status: "未排序"
    }
    var sortedData = [];

    function dataMaker(minNum, maxNum, amount) {
        for (var i = 0; i < amount; i++) {
            data.push(Math.floor(Math.random() * (maxNum - minNum) + minNum));
        }
    }

    function renderData(source) {
        var chartWrap = document.getElementById("chartWrap");
        var arrayList = document.getElementById('arrayList');
        var length = source.length;
        var chartWrapString = "";
        var arrayListString = "";
        for (var i = 0; i < length; i++) {
            chartWrapString += '<div style="height:' + (source[i]) * 5 + 'px;" title="数值为:' + source[i] + '"></div>';
            arrayListString += '<span>' + source[i] + '</span>';
        }
        chartWrap.innerHTML = chartWrapString;
        arrayList.innerHTML = arrayListString;
    }

    function buttonHandler() {
        var button = document.getElementsByTagName("button");
        var length = button.length;
        for (var i = 0; i < length; i++) {
            button[i].addEventListener("click", buttonClickSift);
        }
    }

    function buttonClickSift() {
        var length = data.length;
        var inputValue = document.getElementById("inputValue").value;
        inputValue.replace(/\s/g, "");
        inputValue = parseInt(inputValue);
        var result = /^[1-9]\d*$/.test(inputValue);
        switch (this.value) {
        case "leftIn":
            if (length >= 60) {
                alert("数据已满60个，请先删除些数据再试！");
            } else if (result && inputValue >= 10 && inputValue <= 100) {
                if (dataStatus.status == "未排序") {
                    data.unshift(inputValue);
                    sortedData.unshift(inputValue);
                    renderData(data);
                } else {
                    sortedData.unshift(inputValue);
                    data.unshift(inputValue);
                    renderData(sortedData);
                }
            } else {
                alert("请输入正确的数值噢");
            }
            break;
        case "rightIn":
            if (length >= 60) {
                alert("数据已满60个，请先删除些数据再试！");
            } else if (result && inputValue >= 10 && inputValue <= 100) {
                if (dataStatus.status == "未排序") {
                    data.push(inputValue);
                    sortedData.push(inputValue);
                    renderData(data);
                } else {
                    sortedData.unshift(inputValue);
                    data.push(inputValue);
                    renderData(sortedData);
                }
            } else {
                alert("请输入正确的数值噢");
            }
            break;
        case "leftOut":
            if (dataStatus.status == "未排序") {
                data.shift();
                sortedData.shift();
                renderData(data);
            } else {
                sortedData.shift();
                data.shift();
                renderData(sortedData);
            }
            break;
        case "rightOut":
            if (dataStatus.status == "未排序") {
                data.pop();
                sortedData.pop();
                renderData(data);
            } else {
                sortedData.pop();
                data.pop();
                renderData(sortedData);
            }
            break;
        case "bubbleSort":
            bubbleSort(data);
            dataStatus.status = "已排序";
            break;
        case "selectionSort":
            selectionSort(data);
            dataStatus.status = "已排序";
            break;
        case "insertionSort":
            insertionSort(data);
            dataStatus.status = "已排序";
            break;
        case "reset":
            renderData(data);
            dataStatus.status = "未排序";
            break;
        }
    };

    function bubbleSort(source) {
        var bubbleData = [],
            length = source.length;
        for (var x = 0; x < length; x++) {
            bubbleData.push(source[x]);
        }
        var sortStatus = [];
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - 1 - i; j++) {
                if (bubbleData[j] > bubbleData[j + 1]) {
                    var aux = bubbleData[j];
                    bubbleData[j] = bubbleData[j + 1];
                    bubbleData[j + 1] = aux;
                    sortStatus.push(JSON.parse(JSON.stringify(bubbleData)));
                }
            }
        }
        var y = 0,
            timer = null;
        timer = setInterval(function () {
            if (y < sortStatus.length) {
                renderData(sortStatus[y]);
                y++;
            } else {
                clearInterval(timer);
            }
        }, 100);
        sortedData = bubbleData;

    }

    function selectionSort(source) {
        var selectionData = [];
        length = source.length;
        for (var x = 0; x < length; x++) {
            selectionData.push(source[x]);
        }
        var indexMin;
        var sortStatus = [];
        for (var i = 0; i < length - 1; i++) {
            indexMin = i;
            for (var j = i; j < length; j++) {
                if (selectionData[indexMin] > selectionData[j]) {
                    indexMin = j;
                }
            }
            if (i !== indexMin) {
                var aux = selectionData[i];
                selectionData[i] = selectionData[indexMin];
                selectionData[indexMin] = aux;
            }
            sortStatus.push(JSON.parse(JSON.stringify(selectionData)));
        }
        var y = 0,
            timer = null;
        timer = setInterval(function () {
            if (y < sortStatus.length) {
                renderData(sortStatus[y]);
                y++;
            } else {
                clearInterval(timer);
            }
        }, 100);
        sortedData = selectionData;
    }

    function insertionSort(source) {
        var insertionData = [];
        length = source.length;
        for (var x = 0; x < length; x++) {
            insertionData.push(source[x]);
        }
        var sortStatus = [],
            j, temp;
        for (var i = 1; i < length; i++) {
            j = i;
            temp = insertionData[i];
            while (j > 0 && insertionData[j - 1] > temp) {
                insertionData[j] = insertionData[j - 1];
                j--;
                sortStatus.push(JSON.parse(JSON.stringify(insertionData)));
            }
            insertionData[j] = temp;
        }
        var y = 0,
            timer = null;
        timer = setInterval(function () {
            if (y < sortStatus.length) {
                renderData(sortStatus[y]);
                y++;
            } else {
                clearInterval(timer);
            }
        }, 100);
        sortedData = insertionData;
    }

    function init() {
        dataMaker(10, 101, 60);
        buttonHandler();
        renderData(data);
    }
    init();
})();