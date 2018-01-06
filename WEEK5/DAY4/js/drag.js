function Callbacks() {};
Callbacks.prototype.has=function (type,fn) {
    return !!this[type]&&this[type].includes(fn);
};
Callbacks.prototype.add=function (type,...arg) {
    if(!this[type]){
        //如果没有这个类型先给实例增加一个这个类型的数组,过滤掉arg中的非函数,将arg直接赋值给这个类型
        this[type]=arg.filter(item=>typeof item=="function");
    }else {
        arg.forEach((item)=>{
            if(typeof item=="function"&&!this[type].includes(item)){
                this[type].push(item);
            }
        })
    }
    return this;
};
Callbacks.prototype.remove=function (type,...arg) {
    //先判断有没有这个类型的数组,然后再去判断arg中每一项
    if(this[type]){
        arg.forEach((item)=>{
            if(this.has(type,item)){
                this[type].splice(this[type].indexOf(item),1)
            }
        })
    };
    return this
};
Callbacks.prototype.fire=function (type,...arg) {
    if(this[type]){
        this[type].forEach((item)=>{
            item.apply(this,arg)
        })
    }
    return this
};
Object.assign(Drag.prototype,Callbacks.prototype);
function Drag(ele) {
    this.ele=ele;
    let down=(e)=>{
        this.x=e.clientX-this.ele.offsetLeft;
        this.y=e.clientY-this.ele.offsetTop;
        document.addEventListener("mousemove",move);
        document.addEventListener("mouseup",up);
        this.fire("down",e);
    };
    let move=(e)=>{
        this.ele.style.left=e.clientX-this.x+"px";
        this.ele.style.top=e.clientY-this.y+"px";
        e.preventDefault();
        this.fire("move",e);
    };
    let up=(e)=>{
        document.removeEventListener("mousemove",move);
        document.removeEventListener("mouseup",up);
        this.fire("up",e);
    };
    this.ele.addEventListener("mousedown",down);
}


//第一次扩展 zIndex
//鼠标按下层级关系变大,抬起变小
Drag.prototype.zIndex=function () {
    this.z=getComputedStyle(this.ele).zIndex;
    this.add("down",this.addZIndex).add("up",this.reduceZIndex);
    return this;
};
Drag.prototype.addZIndex=function () {
    this.ele.style.zIndex=999;
};
Drag.prototype.reduceZIndex=function () {
    this.ele.style.zIndex=this.z;
};

//第二次扩展 border
//鼠标按下,加上border 里面的图片消失,鼠标抬起移除border 显示图片
Drag.prototype.border=function () {
    this.add("down",this.addBorder).add("up",this.removeBorder);
    return this;
};
Drag.prototype.addBorder=function () {
    this.ele.style.border="2px dashed red";
    this.ele.children[0].style.display="none";
};
Drag.prototype.removeBorder=function () {
    this.ele.style.border="none";
    this.ele.children[0].style.display="block";
};

//第三次扩展 range范围
//{minT:top的最小值,minL:left最小值,maxT:top的最大值,maxL:left最大值}
Drag.prototype.range=function (rangeObj) {
    this.add("move",this.setRange);
    this.rangeObj=rangeObj;
};
Drag.prototype.setRange=function (e) {
    let L=e.clientX-this.x;
    let T=e.clientY-this.y;
    if(this.rangeObj.minL!=undefined&&L<this.rangeObj.minL){
        L=this.rangeObj.minL;
    }
    if(this.rangeObj.minT!=undefined&&T<this.rangeObj.minT){
        T=this.rangeObj.minT;
    }
    if(this.rangeObj.maxL&&L>this.rangeObj.maxL){
        L=this.rangeObj.maxL;
    }
    if(this.rangeObj.maxT&&T>this.rangeObj.maxT){
        T=this.rangeObj.maxT
    }
    this.ele.style.left=L+"px";
    this.ele.style.top=T+"px";
    e.preventDefault();
};

//第四次扩展 jump 弹跳+抛物线
Drag.prototype.jump=function () {
    this.add("up",this.drop,this.fly).add("move",this.getSpeedX);
    this.speedY=1;
    this.maxT=document.documentElement.clientHeight-this.ele.offsetHeight;
    this.timer=null;
    this.timerFly=null;
    this.maxL=document.documentElement.clientWidth-this.ele.offsetWidth;
};
Drag.prototype.drop=function () {
    clearTimeout(this.timer);
    this.speedY+=9.8;
    this.speedY*=0.93;
    let T=this.ele.offsetTop+this.speedY;
    if(T>=this.maxT){
        T=this.maxT;
        this.speedY*=-1;
        this.flg++;
    }else {this.flg=0;}
    this.ele.style.top=T+"px";
    if(this.flg<2){this.timer=setTimeout(()=>{this.drop()},20);}
};
Drag.prototype.getSpeedX=function (e) {
    //获取水平初速度,根据每一次move执行的时间差内移动的距离
    //现在的e.clientX-之前的clientX,第一次没有差值,所以把第一次的e.clientX当做初始值
    if(!this.prevSpeedX){
        this.prevSpeedX=e.clientX;
    }else {
        this.speedX=e.clientX-this.prevSpeedX;
        this.prevSpeedX=e.clientX;
    }
};
Drag.prototype.fly=function () {
    clearTimeout(this.timerFly);
    this.speedX*=0.93;
    let left=this.ele.offsetLeft+this.speedX;
    //临界值判断
    if(left<=0){
        left=0;
        this.speedX*=-1;
    }else if(left>=this.maxL){
        left=this.maxL;
        this.speedX*=-1;
    }
    this.ele.style.left=left+"px";
    if (Math.abs(this.speedX)>=0.5){
       this.timerFly=setTimeout(()=>{this.fly();},20)
    }
};





