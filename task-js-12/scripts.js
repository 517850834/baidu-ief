(function () {
    var negative = [],
        timeToPlay, //播放negative的定时器
        timeToAlert, //查询完成后提示的定时器
        index, //这个index是用来记录匹配到搜索值时negative的length值
        root = document.getElementById("root"),
        item = root.getElementsByTagName("div"),
        search = document.getElementById("search"),
        select = document.getElementById("select"),
        selectStatus = {
            now: select.value
        };

    function clickHandler() { //给每一个按钮添加对应的事件
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
        index = undefined;
        clearInterval(timeToPlay);
        clearTimeout(timeToAlert);
        if (value == "pre") {
            preOrderTraverse(root, addToNegative);
            broadcast(function () {});
        } else if (value == "in") {
            inOrdertraverse(root, addToNegative);
            broadcast(function () {});
        } else if (value == "post") {
            postOrdertraverse(root, addToNegative);
            broadcast(function () {});
        } else {
            searchOrder();
            broadcast(searchEnd);
        }
    }

    function searchEnd() { //设置搜索完成后执行的提示
        if (index !== undefined) {
            negative[index - 1].style.backgroundColor = "red";
            alert("已经搜索到，红色显示！");
        } else {
            alert("对不起，没有搜索到您输入的内容");
        }
    }

    function searchOrder() { //给搜索按钮指定对应的搜索方式
        var value = search.value;
        if (value !== "") {
            value = value.replace(/^\s*/, "");
            value = value.replace(/\s*$/, "");
            if (selectStatus.now == "pre") {
                preSearch(root, value, addToNegative);
                if (index !== undefined) {
                    negative.splice(index); //如果index值不为undefined，则将negetive数组中index值以后的全部删除，因为我不知道如果在遍历时碰到匹配的值如何将递归停下来，设置了递归停止的条件但是实际查看negetive的时候所有的遍历到的都会被加到这个数组，所以之后使用这个下策来达到效果。
                }
            } else if (selectStatus.now == "in") {
                inSearch(root, value, addToNegative);
                if (index !== undefined) {
                    negative.splice(index);
                }
            } else {
                postSearch(root, value, addToNegative);
                if (index !== undefined) {
                    negative.splice(index);
                }
            }
        } else {
            alert("请输入要查询的内容！");
        }

    }

    function broadcast(callback) { //设置遍历动作完成后开始播放底片的函数
        var i = 0,
            length = negative.length;
        root.style.backgroundColor = ""; //在点击开始前清空之前的背景色
        for (var x = 0; x < item.length; x++) { //在点击开始之前清除之前存留的背景色
            item[x].style.backgroundColor = "";
        }
        if (length !== 0) {
            timeToPlay = setInterval(function () {
                if (i < length) {
                    negative[i].style.backgroundColor = "dodgerblue"; //给当前播放的底片加背景色
                    if (i > 0) {
                        negative[i - 1].style.backgroundColor = ""; //同时清除上一个播放底片的背景色
                    }
                    i++;
                    console.log(i);
                } else {
                    clearInterval(timeToPlay);
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
        if (index == undefined) { //根据negative的长度值来判断有没有搜索到输入的值
            timeToAlert = setTimeout(callback, (negative.length + 1) * 1000)
        } else {
            timeToAlert = setTimeout(callback, (index + 1) * 1000);
        }
    }

    function preSearch(node, value, callback) {
        if (node !== null && node !== undefined) {
            var nowNodeText = node.firstChild.textContent;
            nowNodeText = nowNodeText.replace(/^\s*/, "");
            nowNodeText = nowNodeText.replace(/\s*$/, "");
            var length = node.children.length;
            if (nowNodeText !== value) { //在这里设置了递归进行的条件是需要搜索的值不等于当前遍历到的值，但是在有等于的情况下还是会继续递归完全部。
                callback(node);
                for (var i = 0; i < length; i++) {
                    preSearch(node.children[i], value, callback);
                }
            } else {
                callback(node);
                index = negative.length;
            }
        }
    }

    function inSearch(node, value, callback) {
        if (node !== null && node !== undefined) {
            var nowNodeText = node.firstChild.textContent;
            nowNodeText = nowNodeText.replace(/^\s*/, "");
            nowNodeText = nowNodeText.replace(/\s*$/, "");
            var length = node.children.length;
            if (nowNodeText !== value) {
                inSearch(node.firstElementChild, value, callback);
                callback(node);
                for (var i = 1; i < length; i++) {
                    inSearch(node.children[i], value, callback);
                }
            } else {
                callback(node);
                index = negative.length;
            }
        }
    }

    function postSearch(node, value, callback) {
        if (node !== null && node !== undefined) {
            var nowNodeText = node.firstChild.textContent;
            nowNodeText = nowNodeText.replace(/^\s*/, "");
            nowNodeText = nowNodeText.replace(/\s*$/, "");
            var length = node.children.length;
            if (nowNodeText !== value) {
                for (var i = 0; i < length; i++) {
                    postSearch(node.children[i], value, callback);
                }
                callback(node);
            } else {
                callback(node);
                index = negative.length;
            }
        }
    }

    function addToNegative(node) {
        negative.push(node);
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