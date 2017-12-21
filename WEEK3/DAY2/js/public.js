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
        return{
            top:T,
            left:L
        }
    }
    function getCss(curEle,attr) {
        var val=window.getComputedStyle(curEle)[attr];
        if(/^[+-]?([1-9]\d+|\d)(\.\d+)?(px|pt|pp|em|rem|deg)?$/.test(val)){
            val=parseFloat(val);
        }
        return val;
    }
    function setCss(curEle,attr,value) {
        var reg=/^(width|height|left|right|top|bottom|(margin|padding)(Left|Right|Top|Bottom)?)$/;
        if(reg.test(attr)&&!isNaN(value)){
            curEle.style[attr]=value+'px';
        }else {
            curEle.style[attr]=value
        }
    }
    return{
        win:win,
        offset:offset,
        getCss:getCss,
        setCss:setCss
    }
})();