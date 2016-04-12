(function () {
    function createAlertLayer(title,text,contentWidth,contentHeight) {//生成的弹出层，弹出层各子元素已添加对应事件。
        var alertLayer=document.createElement("div");
        alertLayer.id="alert";
        alertLayer.innerHTML='<div class="mask"></div><div class="content"><h2>'+title+'</h2><p>'+text+'</p><div class="btn"><button type="submit">确认</button><button>取消</button></div></div>';
        document.body.appendChild(alertLayer);
        var width=window.innerWidth,
            height=window.innerHeight, 
            content=alertLayer.getElementsByClassName("content")[0],
            btn=alertLayer.getElementsByTagName("button"),
            mask=alertLayer.getElementsByClassName("mask")[0];
            content.style.left=(width/2-contentWidth/2)+"px";
            content.style.top=(height/2-contentHeight/2)+"px";
            content.style.width=contentWidth+"px";
            content.style.height=contentWidth+"px";
            drag(content);
            for(var i=0,l=btn.length;i<l;i++){
                (function(i){
                    btn[i].addEventListener("click",function(){
                        document.body.removeChild(alertLayer);
                    });
                })(i);
            }
            mask.addEventListener("click",function(){
                document.body.removeChild(alertLayer);
            });
            return alertLayer;
    }
    function getSingle(fn){//将创建弹出层的函数转换为单例对象
        var result;
        return function(){
            return result||(result=fn.apply(this,arguments));
        }
    }
    function drag(node){//移动拖拽节点
        if(node!==null){
            var coordX=node.style.left,
                coordY=node.style.top,
                distanceX,
                distanceY,
                isClick=false;
                console.log(coordX,coordY);
            node.addEventListener("mousedown",function(e){
                isClick=true;
                distanceX=e.pageX;
                distanceY=e.pageY;
                console.log(distanceX,distanceY)
            });
            node.addEventListener("mousemove",function(e){
                if(isClick){
                    node.style.left=parseInt(coordX)+e.pageX-distanceX+"px";
                    node.style.top=parseInt(coordY)+e.pageY-distanceY+"px";
                }
            });
            node.addEventListener("mouseup",function(e){
                isClick=false;
                coordX=node.style.left;
                coordY=node.style.top;
            });
        }
    }
    function clickHandler(){//页面按钮点击事件
        var alertBtn=document.getElementById("alertBtn");
        alertBtn.addEventListener("click",function(){
            var alertLayer=getSingle(createAlertLayer);
            alertLayer("弹出层标题","这里是弹出层的文本，这里是弹出层的文本",300,300);
            alertLayer.style.display="block";
        });
    }
    function init(){
        clickHandler();
    }
    init();
})()