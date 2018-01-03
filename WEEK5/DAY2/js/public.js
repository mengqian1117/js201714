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
    function hasClass(curEle,className) {
        return new RegExp("(^| )"+className+"( |$)","g").test(curEle.className)
    }
    function addClass(curEle,...arg) {
        for(var i=0;i<arg.length;i++){
            if(!this.hasClass(curEle,arg[i])){
                curEle.className+=" "+arg[i];
            }
        }
        curEle.className=curEle.className.replace(/^ /,"");
    }
    function removeClass(curEle,...arg) {
        for(var i=0;i<arg.length;i++){
            var reg=new RegExp("(^| )"+arg[i]+"( |$)","g");
            curEle.className=curEle.className.replace(reg," ");
        }
        curEle.className=curEle.className.replace(/^ | $/g,"");
    }
    function toggleClass(curEle,className) {
        if(this.hasClass(curEle,className)){
            this.removeClass(curEle,className);
        }else {
            this.addClass(curEle,className);
        }
    }
    //10.prev获取上一个哥哥元素节点
    function prev(curEle){
        if("getComputedStyle" in window){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre&&pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre
    }

    //11.next获取下一个弟弟元素节点
    function next(curEle){
        if("getComputedStyle" in window){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex&&nex.nodeType!==1){
            nex=nex.nextSibling;
        }
        return nex;
    }

    //12 prevAll获取所有的哥哥元素,返回一个数组
    function prevAll(curEle){
        var prevAry=[];
        var pre=this.prev(curEle);
        while(pre){
            prevAry.unshift(pre);
            pre=this.prev(pre);
        }
        return prevAry
    }

    //13  nextAll 获取所有的弟弟元素,返回一个数组
    function nextAll(curEle){
        var nextAry=[];
        var nex=this.next(curEle);
        while(nex){
            nextAry.push(nex);
            nex=this.next(nex);
        }
        return nextAry
    }

    //14 sibling 获取当前元素相邻的俩个兄弟 返回一个数组
    function sibling(curEle){
        var sibAry=[];
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        pre?sibAry.push(pre):void 0;
        nex?sibAry.push(nex):void 0;
        return sibAry;
    }
    //15 siblings 获取当前元素的所有兄弟 返回一个数组
    function siblings(curEle){
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }
    //16 index 获取当前元素的索引
    function index(curEle){
        return this.prevAll(curEle).length;
    }
    //17
    function children(curEle,tagName){
        var kids=curEle.childNodes;
        //所有的孩子节点
        var kidsAry=[];
        for(var i=0;i<kids.length;i++){
            if(kids[i].nodeType===1){
                if(typeof tagName!=="undefined"){
                    if(kids[i].nodeName==tagName.toUpperCase()){
                        kidsAry.push(kids[i]);
                        //continue;
                    }
                }else{
                    kidsAry.push(kids[i]);
                }
            }
        }
        return kidsAry
    }

    //18 获取第一个孩子元素节点
    function firstChild(curEle){
        if("getComputedStyle" in window){
            return curEle.firstElementChild;
        }
        var firstKids=curEle.firstChild;
        while(firstKids&&firstKids.nodeType!==1){
            firstKids=firstKids.nextSibling;
        }
        return firstKids;
    }

    //19
    function lastChild(curEle){
        if("getComputedStyle" in window){
            return curEle.lastElementChild;
        }
        var lastKids=curEle.lastChild;
        while(lastKids&&lastKids.nodeType!==1){
            lastKids=lastKids.previousSibling;
        }
        return lastKids;
    }
    return {
        toArray,
        win,
        offset,
        getRandom,
        getCss,
        setCss,
        setGroupCss,
        css,
        hasClass,
        addClass,
        removeClass,
        toggleClass,
        prev,
        next,
        prevAll,
        nextAll,
        index,
        sibling,
        siblings,
        firstChild,
        lastChild,
    }
})();