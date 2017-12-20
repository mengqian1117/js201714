let $=(function () {
    function win(attr,value) {
        if(arguments.length==1){
            return document.documentElement[attr]||document.body[attr];
        }else if(arguments.length==2) {
            document.documentElement[attr]=value;
            document.body[attr]=value;
        }
    }
    function offset(curEle) {
        var L=curEle.offsetLeft;
        var T=curEle.offsetTop;
        var P=curEle.offsetParent;
        while (P){
            if(!/MSIE 8/.test(window.navigator.userAgent)){
                L+=P.clientLeft;
                T+=P.clientTop;
            }
            L+=P.offsetLeft;
            T+=P.offsetTop;
            P=P.offsetParent;
        }
    }
    return{
        win:win,
        offset:offset
    }
})();