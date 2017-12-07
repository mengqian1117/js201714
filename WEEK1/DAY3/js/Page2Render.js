var Page2Render=(function () {
    var page2=document.getElementById("page2");
    var h2=page2.getElementsByTagName("h2")[0];
    var timer=null;
    return {
        //init:让当前模块显示
        init(){
            page2.style.display="block";
            this.change();
        },
        change(){
            var str="大家好我是新来的同事";
            var index=0;
            timer=setInterval(function () {
                h2.innerHTML+=str[index++];
                if(index>str.length){
                    clearInterval(timer);
                    //自己消失
                    page2.style.display="none";
                    //让page3显示
                    Page3Render.init();
                }
            },500)
        },
    }
})();