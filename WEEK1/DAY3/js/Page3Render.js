var Page3Render=(function () {
    var page3=document.getElementById("page3");
    var h2=page3.getElementsByTagName("h2")[0];
    var timer=null;
    return{
        init(){
            page3.style.display="block";
        },
        change(){
            h2.style.backgroundColor="red";
            h2.style.opacity=0;
            timer=setInterval(function () {
                h2.style.opacity=parseFloat(h2.style.opacity)+0.01;
                if (parseFloat(h2.style.opacity)>=1){
                    clearInterval(timer);
                    page3.style.display="none";
                    Page4Render.init();
                    Page4Render.change();
                }
            },50)
        },
    }
})();