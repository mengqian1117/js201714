/*
function A() {
    this.a=1;
};
A.prototype.getA=function () {
    return this.a+1;
};
A();//this -->window
new A();//this-->实例
*/
class A{
    //constructor代表当前类本身,如果你不写也会帮你加上一个空的constructor(){}
    constructor(){
        //this 当前实例,默认返回当前实例
        //如果你返回一个引用数据类型会改变实例的结果,如果是基本数据类型不会影响结果
        //return {name:"珠峰"};
    }
}
let a=new A();
//console.log(A.name);
console.log(a);


