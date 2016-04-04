(function () {
    var negativeFilm = [],
        timer; //新建一个空数组来存储遍历的顺序作为播放的底片。

    function clickHandler() { //给每个按钮添加一个点击事件
        var button = document.getElementsByTagName("input"),
            length = button.length;
        for (var i = 0; i < length; i++) {
            (function (i) {
                button[i].addEventListener("click", function () {
                    clickEvent(this.value);
                });
            })(i);
        }
    }

    function clickEvent(value) { //根据点击的按钮不同来触发不同的遍历
        clearInterval(timer);
        var root = document.getElementById("root"); //获取到遍历的根节点
        negativeFilm = []; //每次点击将播放底片清空
        if (value == "前序遍历") { //执行对应的遍历函数
            preOrderTraverse(root, doSomeThing);
        } else if (value == "中序遍历") {
            inOrderTraverse(root, doSomeThing);
        } else {
            postOrderTraverse(root, doSomeThing);
        }
        broadcast();
    }

    function broadcast() { //设置遍历动作完成后开始播放底片的函数
        var i = 0,
            length = negativeFilm.length;
        timer = setInterval(function () {
            if (i < length) {
                negativeFilm[i].style.backgroundColor = "dodgerblue"; //给当前播放的底片加背景色
                if (i > 0) {
                    negativeFilm[i - 1].style.backgroundColor = ""; //同时清除上一个播放底片的背景色
                }
                i++;
                console.log(i);
            } else {
                clearInterval(timer);
                var lastFPS = negativeFilm[length - 1];
                lastFPS.style.backgroundColor = ""; //播放介绍时清除最后一个底片的背景色
            }
        }, 1000);
        for (var j = 0; j < length; j++) {
            negativeFilm[j].style.backgroundColor = "";
        }
    }

    function doSomeThing(node) { //遍历时将每次遍历的过程插入到播放底片数组
        negativeFilm.push(node);
    }

    function preOrderTraverse(node, callback) { //前序
        if (node !== null && node !== undefined) {
            callback(node);
            preOrderTraverse(node.children[0], callback);
            preOrderTraverse(node.children[1], callback);
        }
    }

    function inOrderTraverse(node, callback) { //中序
        if (node !== null && node !== undefined) {
            preOrderTraverse(node.children[0], callback);
            callback(node);
            preOrderTraverse(node.children[1], callback);
        }
    }

    function postOrderTraverse(node, callback) { //后序
        if (node !== null && node !== undefined) {
            preOrderTraverse(node.children[0], callback);
            preOrderTraverse(node.children[1], callback);
            callback(node);
        }
    }

    function init() {
        clickHandler();
    }
    init();
})();