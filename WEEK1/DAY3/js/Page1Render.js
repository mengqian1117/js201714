var Page1Render=(function () {
    //获取当前模块
    var page1=document.getElementById("page1");
    var timer=null;
    return {
        //init:让当前模块显示
        init(){
            page1.style.display="block";
        },
        //改变h1内容
        change(){
            timer=window.setInterval(function () {
                //在原来的基础上加一,++会强制转数字
                page1.children[0].innerHTML++;
                //当加到10的时候清除定时器
                if(parseInt(page1.children[0].innerHTML)>2){
                    window.clearInterval(timer);
                    //自己消失
                    page1.style.display="none";
                    //让模块2显示
                    Page2Render.init();
                    Page2Render.change();
                }
            },1000)
        }
    }
})();