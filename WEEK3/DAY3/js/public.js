var $ = (function () {
    //toArray:将类数组转数组
    //参数likeArray:类数组
    //返回值return:数组
    function toArray(likeArray) {
        return [].slice.call(likeArray);
    };

    //win:求浏览器的盒子模型
    //参数(attr):获取      有返回值
    //参数(attr,val):设置   没有返回值
    function win(attr,value) {
        if(arguments.length==1){
            return document.documentElement[attr]||document.body[attr];
        }else if(arguments.length==2) {
            document.documentElement[attr]=value;
            document.body[attr]=value;
        }
    }

    //offset:获取元素距离body的偏移量
    //参数curEle:当前元素
    //返回值return:{left:值,top:值,}
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

    //getRandom:获取随机数v
    //参数(n,m)
    //      n>m:获取m到n的随机数
    //      n,m:其中有一个不是一个数,返回0
    function getRandom(n,m) {
        n = Number(n);
        m = Number(m);
        if (!isNaN(n) && !isNaN(m)) {
            if (n > m) {//如果n>m交换位置
                [n, m] = [m, n];
            }
            return Math.round(Math.random() * (m - n) + n)
        } else {
            return 0
        }
    }
    //getCss:获取样式属性值
    //参数(curEle,attr):curEle当前元素,attr样式属性
    //返回值:样式属性值
    function getCss(curEle,attr) {
        var val=window.getComputedStyle(curEle)[attr];
        if(/^[+-]?([1-9]\d+|\d)(\.\d+)?(px|pt|pp|em|rem|deg)?$/.test(val)){
            val=parseFloat(val);
        }
        return val;
    }

    //setCss:设置样式属性值
    //参数(curEle,attr,val):curEle当前元素,attr样式属性,val属性值
    //返回值:无
    function setCss(curEle,attr,value) {
        var reg=/^(width|height|left|right|top|bottom|(margin|padding)(Left|Right|Top|Bottom)?)$/;
        if(reg.test(attr)&&!isNaN(value)){
            curEle.style[attr]=value+'px';
        }else {
            curEle.style[attr]=value
        }
    }

    //setGroupCss:批量设置CSS样式
    //参数(curEle,cssObj)
    //返回值:无
    function setGroupCss(curEle,objCss) {
        objCss=objCss||[];
        if(objCss.toString()=="[object Object]"){
            for(var key in objCss){
                this.setCss(curEle,key,objCss[key]);
            }
        }
    }

    //css:获取/设置css属性
    //三个参数:设置
    //俩个参数: 第二个参数是个对象   --> 批量设置
    //         第二个参数不是个对象 --> 获取 有返回值
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
    return {
        toArray,
        win,
        offset,
        getRandom,
        getCss,
        setCss,
        setGroupCss,
        css
    }
})();