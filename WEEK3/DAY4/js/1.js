window.onload=function () {
    //获取scrollTop的最大值:网页高-一屏的高
    let HH=$.win("scrollHeight")-$.win("clientHeight");
    let oDiv=document.getElementsByTagName("div");
    let list=document.getElementsByClassName("floor")[0].getElementsByTagName("li");
    let timer=null;
    //将每一块div距离body的上偏移量存在对应的li上,当点击li时,让页面的scrollTop变成对应的上偏移量
    // 给最后一个li加一个自定义属性_L值为0,因为想回到顶部
    list[list.length-1].setAttribute("_L","0");
    list[list.length-1].onclick=fn;
    for (let i=0;i<oDiv.length;i++){
        //获取每一个div距离body的上偏移量
        let L=$.offset(oDiv[i]).top;
        //加在对应的li的自定义属性上 _L
        list[i].setAttribute("_L",L);
        //最后一块旅游部分最大值是网页滑到最底部
        if(i==oDiv.length-1){
            list[i].setAttribute("_L",HH);
        }
        //给所有的li绑定点击事件
        list[i].onclick=fn;
    };
    function fn () {
        select(this);
        //每点击一次都先把上一个定时器清除掉
        clearInterval(timer);
        //先获取当前li的自定义属性_L的值,注意使用getAttribute获取出来的是字符串,使用parseFloat变成数字
        var _L=parseFloat(this.getAttribute("_L"));
        //获取当前scrollTop值,去跟目标_L比较,如果比他大就减小到_L,否则就加到_L;
        var H=$.win("scrollTop");
        if(H>_L){
            timer=setInterval(()=> {
                //想让这里面的this仍然是外面的this,必须使用箭头函数
                H-=50;
                $.win("scrollTop",H);
                if($.win("scrollTop")<=_L){
                    $.win("scrollTop",_L);
                    clearInterval(timer)
                }
            },20);
        }else {
            timer=setInterval(() =>{
                H+=50;
                $.win("scrollTop",H);
                if($.win("scrollTop")>=_L){
                    $.win("scrollTop",_L);
                    clearInterval(timer)
                }
            },20)
        }
    };
    function select(curEle) {
        //curEle 当前点击的元素
        for(let i=0;i<list.length;i++){
            list[i].className="";
        }
        curEle.className="select";
    }

    //当前div漏出屏幕超过一半,到下一个div露出屏幕超过一半这个之间就是当前这个盒子占的面积多,就算在这个div的范围
    //当前div上偏移量-屏幕高的一半到下一个div上偏移量-一屏高的一半
    //这里都是求的scrollTop值变化范围
    //当滚动条发生改变此时scrollTop值就发生变化
    //获取一屏的高
    let winH=$.win("clientHeight");
    window.onscroll=function () {
        //获取滚上去的距离
        let T=$.win("scrollTop");
        for (let i=0;i<list.length-1;i++){
            //当前div的上偏移量
            let _L=list[i].getAttribute("_L");
            //下一个div的上偏移量
            let L=list[i+1].getAttribute("_L");
            if(T>=_L-winH/2&&T<=L-winH/2){
                select(list[i]);
            }
            if(T>=$.offset(oDiv[8]).top-winH/2){
                select(list[8]);
            }
        }
    }
};


