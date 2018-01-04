function Callbacks() {};
Callbacks.prototype.has=function (type,fn) {
    return !!this[type]&&this[type].includes(fn);
};
Callbacks.prototype.add=function (type,...arg) {
    if(!this[type]){
        //如果没有这个类型先给实例增加一个这个类型的数组,过滤掉arg中的非函数,将arg直接赋值给这个类型
        this[type]=arg.filter(item=> typeof item=="function");
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