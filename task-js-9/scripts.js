(function () {
    var tagData = [],
        hobbyData = [],
        tagInput = document.getElementById("tagInput"),
        tagList = document.getElementById("tagList"),
        hobbyInput = document.getElementById("hobbyInput"),
        hobbyList = document.getElementById("hobbyList"),
        hobbyBtn = document.getElementById("hobbyBtn");

    function render(data, list) {
        var length = data.length,
            dataString = "";
        for (var i = 0; i < length; i++) {
            dataString += "<span>" + data[i] + "</span>";
        }
        list.innerHTML = dataString;
        clickDel(tagList, tagData);
    }

    function autoAdd(inputSource, data, list, e) {
        var inputSourceValue = inputSource.value,
            length = data.length;
        var autoAddRules = /(\s|,|，|、)/g;
        if (autoAddRules.test(inputSourceValue) || e.keyCode === 13) { //当符合以下条件时
            inputSourceValue = inputSourceValue.replace(autoAddRules, ""); //先将作为条件的字符替换成空白
            if (inputSourceValue == "") { //如果只剩下空白则提示要求输入字符
                alert("请输入点东西吧！");
                inputSource.value = ""; //清空输入框
            } else {
                var j = 0;
                for (var i = 0; i < length; i++) {
                    if (data[i] == inputSourceValue) {
                        j++;
                    }
                }
                if (length >= 10 && j == 0) {
                    data.shift();
                    data.push(inputSourceValue);
                } else if (j == 0) {
                    data.push(inputSourceValue);
                }
                render(data, list);
                inputSource.value = "";
            }
        }
    }

    function clickAdd(inputSoure, data, list) {
        var inputSoureValue = inputSoure.value;
        inputSoureValue = inputSoureValue.replace(/^\s*/, "");
        inputSoureValue = inputSoureValue.replace(/\s*$/, "");
        inputSoureValue = inputSoureValue.replace(/(,|，|、|\s|\r\n)/g, " ");
        inputSoureValue = inputSoureValue.replace(/\s{2,}/g, " ");
        inputSoureValue = inputSoureValue.split(" ");
        for (var i = 0; i < inputSoureValue.length; i++) {
            if (data.indexOf(inputSoureValue[i]) == -1) {
                if (data.length < 10) {
                    data.push(inputSoureValue[i]);
                } else {
                    data.shift();
                    data.push(inputSoureValue[i]);
                }
            }
        }
        render(data, list);
    };

    function clickDel(list, data) {
        var clickList = list.children,
            length = clickList.length;
        for (var i = 0; i < length; i++) {
            (function (i) {
                var clickListText = clickList[i].innerHTML;
                clickList[i].addEventListener("mouseenter", function () {
                    clickList[i].innerHTML = "删除" + clickListText;
                });
                clickList[i].addEventListener("mouseleave", function () {
                    clickList[i].innerHTML = clickListText;
                });
                clickList[i].addEventListener("click", function () {
                    data.splice(i, 1);
                    render(data, list);
                });
            })(i);
        }
    }

    function eventHandler() {
        tagInput.addEventListener("keyup", function (e) {
            autoAdd(tagInput, tagData, tagList, e);
        });
        hobbyBtn.addEventListener("click", function () {
            clickAdd(hobbyInput, hobbyData, hobbyList);
        });
        clickDel(tagList, tagData);
    }

    function init() {
        render(tagData, tagList);
        render(hobbyData, hobbyList);
        eventHandler();
    }
    init();
})();