//1.因为我们要实现拖拽每一个li必须实现定位,left和top值才会起作用,但是写css样式如果定位还要计算位置比较麻烦,所以一般使用浮动,这里我们需要将浮动变成定位,此时li的位置已经有了,也就有了offsetLeft和offsetTop值,恰好offsetLeft和offsetTop和left,top一致
//注意:absolute会脱离文档流,我们倒序定位
let oLis=document.getElementById("list").getElementsByTagName("li");
for(let i=oLis.length-1;i>=0;i--){
    oLis[i].style.left=(oLis[i].l=oLis[i].offsetLeft)+"px";
    oLis[i].style.top=(oLis[i].t=oLis[i].offsetTop)+"px";
    oLis[i].style.position="absolute";
    oLis[i].style.margin="0";
    //让每一个li实现拖拽
    new Drag(oLis[i]).zIndex().add("move",touchChange).add("up",changePosition)
}
function isTouch(curEle,ele) {
    // curEle当前被拖拽的元素
    // ele:其他元素
    if(curEle.offsetLeft>ele.offsetLeft-curEle.offsetWidth&&curEle.offsetLeft<ele.offsetLeft+ele.offsetWidth&&curEle.offsetTop>ele.offsetTop-curEle.offsetHeight&&curEle.offsetTop<ele.offsetTop+ele.offsetHeight){
        return true
    }else {
        return false
    }
};
function touchChange() {
    //创建一个数组把碰撞的元素存起来,方便后面选择出距离最近的
    this.touchAry=[];
    //循环所有的li以一个一个检测看看有没有发生碰撞
    for(let i=0;i<oLis.length;i++){
        //又因为oLis中也包含当前被拖拽的元素this.ele,不需要跟自己判断
        if(oLis[i]==this.ele)continue;
        //检测如果发生碰撞就放在数组中,顺便把背景颜色变了
        if(isTouch(this.ele,oLis[i])){
            this.touchAry.push(oLis[i]);
            oLis[i].style.backgroundColor="orange";
        }else {
            oLis[i].style.backgroundColor=null;
        }
    }
};
function changePosition() {
    //获取存发生碰撞元素那个数组
    let ary=this.touchAry;
    console.log(ary);
    //循环数组,分别求出数组每一个元素距离当前被拖拽元素this.ele的距离,并且存到每一个元素的自定义属性distance上
    if(ary.length){
        ary.forEach((item)=>{
            item.distance=Math.sqrt(Math.pow(this.ele.offsetLeft-item.offsetLeft,2)+Math.pow(this.ele.offsetTop-item.offsetTop,2));
            //让这些元素的背景颜色变回去
            item.style.backgroundColor=null;
        });
        //根据每一个li的distance属性排序
        ary.sort((a,b)=>{return a.distance-b.distance});
        //ary[0]就是距离最近的
        this.ele.style.backgroundColor="yellow";
        ary[0].style.backgroundColor="yellow";
        //让这俩元素交换位置
        ary[0].animation({left:this.ele.l,top:this.ele.t},700,17,2,function () {
            this.l=this.offsetLeft;
            this.t=this.offsetTop;
        });
        this.ele.animation({left:ary[0].l,top:ary[0].t},700,17,2,function () {
            this.l=this.offsetLeft;
            this.t=this.offsetTop;
        })
    }else {
        //没有发生碰撞的回到自己的原来的位置
        this.ele.animation({left:this.ele.l,top:this.ele.t},700,17,2)
    }
}