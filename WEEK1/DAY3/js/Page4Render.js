var Page4Render=(function () {
    var page4=document.getElementById("page4");
    var h2=page4.getElementsByTagName("h2")[0];
    var timer=null;
    return{
        init(){
            page4.style.display="block";
        },
        change(){
            h2.style.fontSize="14px";
            timer=setInterval(function () {
                h2.style.fontSize=parseFloat(h2.style.fontSize)+1+"px";
                if(parseFloat(h2.style.fontSize)>100){
                    clearInterval(timer);
                    page4.style.display="none";
                    Page5Render.init();
                    Page5Render.change();
                }
            },100)
        },
    }
})();