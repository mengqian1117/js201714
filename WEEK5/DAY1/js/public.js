/**
 * Created by 银鹏 on 2017/5/11.
 */

var  public=(function(){
    var standardBrowser="getComputedStyle" in window;
    //1.将类数组转为数组
    function toArray(likeArray){
        try{
            return [].slice.call(likeArray);
        }catch(e){
            var ary=[];
            for(var i=0;i<likeArray.length;i++){
                ary.push(likeArray[i])
            }
            return ary;
        }
    }
    //2.将JSON字符串转为JSON对象
    function toJsonObj(jsonStr){
        return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
    }

    //3.获取随机数
    function getRandom(n,m){
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n>m){
            n=n+m;
            m=n-m;
            n=n-m;
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    //4.获取浏览器的盒子模型(浏览器一屏幕的宽/高,浏览器滚上去的距离scrollTop,scrollLef,整个网页的高度scrollHeight,整个浏览器的宽scrollWidth)

    function win(attr,val){
        if(typeof val=="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }else{
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    }
    //5.获取当前元素距离body的偏移量
    function offset(curEle){
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var p=curEle.offsetParent;
        while(p){
            if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        }
        return{
            left:l,
            top:t
        }
    }

    //6.获取指定元素的样式值
    function getCss(curEle,attr){
        var val=null;
        if(standardBrowser){
            val=window.getComputedStyle(curEle)[attr];
        }else{
            if(attr=="opacity"){
                val=curEle.currentStyle["filter"];
                //"alpha(opacity=30.3)"
                var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val=reg.test(val)?RegExp.$1/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        //"20px solid red" "13px"
        var reg1=/^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/;
        return reg1.test(val)?parseFloat(val):val;
    }

    //7.设置样式
    function setCss(curEle,attr,val){
        if(attr=="opacity"){
            curEle.style["opacity"]=val;
            curEle.style["filter"]="alpha(opacity="+val*100+")";
            return;
        }
        if(attr=="float"){
            curEle.style.cssFloat=val;
            curEle.style.styleFloat=val;
            return;
        }
        var reg=/^(width|height|left|right|top|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/;
        if(reg.test(attr)&&!isNaN(val)){
            val+="px";
        }
        curEle.style[attr]=val;
    }

    //8.批量设置样式
    function setGroupCss(curEle,objStyle){
        objStyle=objStyle||[];
        if(objStyle.toString()=="[object Object]"){
            for(var key in objStyle){
                if(objStyle.hasOwnProperty(key)){
                    this.setCss(curEle,key,objStyle[key])
                }
            }
        }
    }
    //9 css 根据参数的不同选择不同的方法
    function css(){
        if(arguments.length===3){
            //setCss(arguments[0],arguments[1],arguments[2])
            //css 中this=public,setCss中的this=public
            setCss.apply(this,arguments);
            return;
        }
        if(arguments.length===2){
            if(arguments[1].toString()=="[object Object]"){
                setGroupCss.apply(this,arguments);
                return;
            }else{
                return getCss.apply(this,arguments);
            }
        }
    }

    //10.prev获取上一个哥哥元素节点
    function prev(curEle){
        if(standardBrowser){
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
        if(standardBrowser){
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
        if(standardBrowser){
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
        if(standardBrowser){
            return curEle.lastElementChild;
        }
        var lastKids=curEle.lastChild;
        while(lastKids&&lastKids.nodeType!==1){
            lastKids=lastKids.previousSibling;
        }
        return lastKids;
    }
    //20 hasClass判断当前元素curEle中有没有指定class名
    function hasClass(curEle,classStr){
        var reg=new RegExp("(^| +)"+classStr+"( +|$)");
        return reg.test(curEle.className);
    }

    //21 addClass(curEle,classStr)给当前元素curEle增加一个或多个class名
    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
        curEle.className=curEle.className.replace(/^ +| +$/g,'');
    }

    //22 removeClass(),删除当前元素的指定class名
    function removeClass(curEle,classStr){
        classStr=classStr.replace(/^ +| +$/g,'').split(/ +/g);
        for(var i=0;i<classStr.length;i++){
            var reg=new RegExp("(^| +)"+classStr[i]+"( +|$)");
            curEle.className=curEle.className.replace(reg," ");
        }
        curEle.className=curEle.className.replace(/^ +| +$/g,'');
    }


    //23.toggleClass(curEle,classStr),有的话是删除,没有就是增加

    function toggleClass(curEle,classStr){
        classStr=classStr.replace(/^ +| +$/g,"").split(/ +/g);
        for(var i=0;i<classStr.length;i++){
            this.hasClass(curEle,classStr[i])?this.removeClass(curEle,classStr[i]):this.addClass(curEle,classStr[i])
        }
    }
    return{
        toArray:toArray,
        toJsonObj:toJsonObj,
        getRandom:getRandom,
        win:win,
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        children:children,
        prev:prev,
        next:next,
        prevAll:prevAll,
        nextAll:nextAll,
        index:index,
        sibling:sibling,
        siblings:siblings,
        firstChild:firstChild,
        lastChild:lastChild,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        toggleClass:toggleClass
    }
})();