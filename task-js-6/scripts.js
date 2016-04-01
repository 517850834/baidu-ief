(function () {
    var numData = [];
    var inputSource = document.getElementById('inputSource');
    var leftInBtn = document.getElementById('leftIn');
    var rightInBtn = document.getElementById('rightIn');
    var leftOutBtn = document.getElementById('leftOut');
    var rightOutBtn = document.getElementById('rightOut');
    var numList = document.getElementById('numList');

    function checkInputSource(func) {
        var inputSourceValue = inputSource.value;
        if (inputSourceValue != "" && /^-?\d(\.\d+)?\d?$/.test(inputSourceValue)) {
            func();
        } else {
            alert("请输入正确的数字");
        }
    }

    function leftIn() {
        numData.unshift(inputSource.value);
        inputSource.value = "";
    }

    function rightIn() {
        numData.push(inputSource.value);
        inputSource.value = "";
    }

    function leftOut() {
        if (numData.length == 0) {
            alert("没有数据可以删除")
        } else {
            alert(numData.shift());
        }

    }

    function rightOut() {
        if (numData.length == 0) {
            alert("没有数据可以删除");
        } else {
            alert(numData.pop());
        }
    }

    function render() {
        var result = "";
        for (var i = 0; i < numData.length; i++) {
            result += '<span>' + numData[i] + '</span>';
        }
        numList.innerHTML = result;
        spanListClick();
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

    function spanListClick() {
        var spanList = numList.children,
            length = spanList.length;
        for (var i = 0; i < length; i++) {
            (function (i) {
                spanList[i].addEventListener("click", function () {
                    numData.splice(i, 1);
                    render();
                    console.log(numData);
                });
            })(i);
        }
    }

    function init() {
        render();
        btnHandle();
    }
    init();
})();