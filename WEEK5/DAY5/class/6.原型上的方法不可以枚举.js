function F() {
    this.f="ff";
}
F.prototype.getF=function () {};
let f=new F;
for (let key in f){
    //console.log(key);
}

class FF{
    constructor(){
        this.ff="ff";
    }
    getF(){};
}
let ff=new FF;
for (let key in ff){
    console.log(key);
};
console.log(Object.getOwnPropertyDescriptor(FF.prototype,"getF"));
