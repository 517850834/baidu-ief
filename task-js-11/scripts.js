(function () {
    var negative = [],
        timer,
        root = document.getElementById("root"),
        search = document.getElementById("search"),
        select = document.getElementById("select"),
        selectStatus = {
            now: select.value
        };

    function clickHandler() {
        var button = document.getElementsByTagName("button"),
            length = button.length;
        for (var i = 0; i < length; i++) {
            (function (i) {
                button[i].addEventListener("click", function () {
                    clickEvent(this.value);
                });
            })(i)
        }
        select.addEventListener("change", function () {
            selectStatus.now = select.value;
            console.log(selectStatus);
        });
    }

    function clickEvent(value) {
        negative = [];
        clearInterval(timer);
        if (value == "pre") {
            preOrderTraverse(root, addToNegative);
        } else if (value == "in") {
            inOrdertraverse(root, addToNegative);
        } else if (value == "post") {
            postOrdertraverse(root, addToNegative);
        } else {
            searchOrder();
        }
        broadcast();
    }

    function searchOrder() {
        var value = search.value;
        value = value.replace(/^\s*/, "");
        value = value.replace(/\s*$/, "");
        if (selectStatus.now == "pre") {
            preSearch(root, value, addToNegative);
        }
    }

    function preSearch(node, value, callback) {
        var nowNodeText = node.firstChild.textContent;
        nowNodeText = nowNodeText.replace(/^\s*/, "");
        nowNodeText = nowNodeText.replace(/\s*$/, "");
        var length = node.children.length;
        if (nowNodeText == value) {
            callback(node);
            return;
        } else {
            callback(node);
            for (var i = 0; i < length; i++) {
                preSearch(node.children[i], value, callback);
            }
        }
    }

    function addToNegative(node) {
        negative.push(node);
    }

    function broadcast() { //设置遍历动作完成后开始播放底片的函数
        var i = 0,
            length = negative.length;
        if (length !== 0) {
            timer = setInterval(function () {
                if (i < length) {
                    negative[i].style.backgroundColor = "dodgerblue"; //给当前播放的底片加背景色
                    if (i > 0) {
                        negative[i - 1].style.backgroundColor = ""; //同时清除上一个播放底片的背景色
                    }
                    i++;
                    console.log(i);
                } else {
                    clearInterval(timer);
                    var lastFPS = negative[length - 1];
                    lastFPS.style.backgroundColor = ""; //播放介绍时清除最后一个底片的背景色
                }
            }, 1000);
        }
        if (length !== 0) {
            for (var j = 0; j < length; j++) {
                negative[j].style.backgroundColor = "";
            }
        }
    }

    function preOrderTraverse(node, callback) {
        if (node !== null && node !== undefined) {
            callback(node);
            var length = node.children.length;
            for (var i = 0; i < length; i++) {
                preOrderTraverse(node.children[i], callback);
            }
        }
    }

    function inOrdertraverse(node, callback) {
        if (node !== null && node !== undefined) {
            var length = node.children.length;
            inOrdertraverse(node.firstElementChild, callback);
            callback(node);
            for (var i = 1; i < length; i++) {
                inOrdertraverse(node.children[i], callback);
            }
        }
    }

    function postOrdertraverse(node, callback) {
        if (node !== null && node !== undefined) {
            var length = node.children.length;
            for (var i = 0; i < length; i++) {
                postOrdertraverse(node.children[i], callback);
            }
            callback(node);
        }
    }

    function init() {
        clickHandler();
    }
    init();
})();