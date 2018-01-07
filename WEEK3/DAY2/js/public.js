let $=(function () {
    function toArray(likeArray) {
        return [].slice.call(likeArray)
    }
    function getRandom(n,m) {
        n=Number(n);
        m=Number(m);
        if(!isNaN(n)&&!isNaN(m)){
            if(n>m){//如果n>m交换位置
                [n,m]=[m,n];
            }
            return Math.round(Math.random()*(m-n)+n)
        }else {
            return 0
        }
    }
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
    function setGroupCss(curEle,objCss) {
        objCss=objCss||[];
        if(objCss.toString()=="[object Object]"){
            for(var key in objCss){
                this.setCss(curEle,key,objCss[key]);
            }
        }
    }
    function css() {
        if(arguments.length==3){
            setCss.apply(this,arguments)
        }else if(arguments.length==2){
            if(arguments[1].toString()=="[object Object]"){
                setGroupCss.apply(this,arguments)
            }else {
                return getCss.apply(this,arguments)
            }
        }
    }
    return{
        toArray:toArray,
        win:win,
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        getRandom:getRandom,
    }
})();