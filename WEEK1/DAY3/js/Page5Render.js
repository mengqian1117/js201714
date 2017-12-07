var Page5Render=(function () {
    var page5=document.getElementById("page5");
    var h2=page5.getElementsByTagName("h2")[0];
    return{
        init(){
            page5.style.display="block";
        },
        change(){
            h2.innerHTML="谢谢观看";
        }
    }
})();