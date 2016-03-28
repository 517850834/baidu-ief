(function () {
    var numData = [1, 2, 3, 4, 5];
    var inputSource = document.getElementById('inputSource');
    var leftInBtn = document.getElementById('leftIn');
    var rightInBtn = document.getElementById('rightIn');
    var leftOutBtn = document.getElementById('leftOut');
    var rightOutBtn = document.getElementById('rightOut');
    var numList = document.getElementById('numList');

    function checkInputSource(func) { //输入数据的时候检测value值是否为空，免得显示不出效果，没有强制要求只能输入的数据只能数字。
        if (inputSource.value == '') {
            alert('请输入要操作的字符，没有强制要求是否为数字。');
        } else {
            func();
        }
    }

    function leftIn() {
        numData.unshift(inputSource.value);
    }

    function rightIn() {
        numData.push(inputSource.value);
    }

    function leftOut() {
        numData.shift(inputSource.value);
    }

    function rightOut() {
        numData.pop(inputSource.value);
    }

    function render() {
        var result = "";
        for (var i = 0; i < numData.length; i++) {
            result += '<span>' + numData[i] + '</span>';
        }
        numList.innerHTML = result;
    }

    function btnHandle() {
        leftInBtn.addEventListener('click', function () {
            checkInputSource(leftIn);
            render();
        });
        rightInBtn.addEventListener('click', function () {
            checkInputSource(rightIn);
            render();
        });
        leftOutBtn.addEventListener('click', function () {
            leftOut();
            render();
        })
        rightOutBtn.addEventListener('click', function () {
            rightOut();
            render();
        });
    }

    function init() {
        render();
        btnHandle();
    }
    init();
})();