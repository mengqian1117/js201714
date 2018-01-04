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

};
Callbacks.prototype.remove=function (type,...arg) {
    //先判断有没有这个类型的数组,然后再去判断arg中每一项
    if(this[type]){
        arg.forEach((item)=>{
            if(this.has(type,item)){
                this[type].splice(this[type].indexOf(item),1)
            }
        })
    }
};
Callbacks.prototype.fire=function (type,...arg) {
    if(this[type]){
        this[type].forEach((item)=>{
            item.apply(this,arg)
        })
    }
};
//把Callbacks类的原型合并到了Drag的原型上,此时Drag的实例就可以使用Callbacks原型上的方法了
Object.assign(Drag.prototype,Callbacks.prototype);
function Drag(ele) {
    this.ele=ele;
    let down=(e) =>{
        this.ele.style.zIndex="999";
        this.x=e.clientX-this.ele.offsetLeft;
        this.y=e.clientY-this.ele.offsetTop;
        document.addEventListener("mousemove",move);
        //把down类型下的函数依次执行,将事件对象e传给每一个函数,函数用不用随你了
        this.fire("down",e);
    };
    let move=(e)=>{
        this.ele.style.left=e.clientX-this.x+"px";
        this.ele.style.top=e.clientY-this.y+"px";
        e.preventDefault();
        this.fire("move");
    };
    let up=(e)=>{
        this.ele.style.zIndex="0";
        document.removeEventListener("mousemove",move);
        this.fire("up");
    };
    this.ele.addEventListener("mousedown",down);
    this.ele.addEventListener("mouseup",up);
}
//Drag第一次扩展 关于border
Drag.prototype.border=function () {
    this.add("down",this.addBorder);
    this.add("up",this.removeBorder);
    return this;
};
Drag.prototype.addBorder=function () {
    this.ele.className="ab";
    this.ele.children[0].style.display="none";
};
Drag.prototype.removeBorder=function () {
    this.ele.className="";
    this.ele.children[0].style.display="block";
};

//Drag第二次扩展 加上弹跳
Drag.prototype.jump=function () {
    this.add("up",this.drop);
    //给他一个初速度
    this.speedY=1;
    return this;
};
Drag.prototype.drop=function () {
    //让速度加一个值9.8
    this.speedY+=9.8;
    //加上空气阻力系数
    this.speedY*=0.93;
    var T=this.ele.offsetTop+this.speedY;
    //临界值判断
    var maxT=document.documentElement.clientHeight-this.ele.offsetHeight;
    if(T>=maxT){
        T=maxT;
        this.speedY*=-1;
        this.f++;
    }else {
        this.f=0;
    }
    this.ele.style.top=T+"px";
    if(this.f<2){
        window.setTimeout(()=>{this.drop();},20)
    }
};
