class A{
    constructor(){
        this.a=1;
    }
}
//Class constructor A cannot be invoked without 'new'
//A();
//不可以直接当做函数执行,只可以使用new执行

//var fn=function f () {};
//function fn() {};

let ClassA=class AA{
    getA(){
        //AA来代表当前类本身,但是只能在类里面使用,在外面是获取不到的
        console.log(AA.name);
    }
};
console.log(ClassA.name);//AA
//AA is not defined
//console.log(AA);
let aa=new ClassA;
aa.getA();//"AA"

let D=class {};
console.log(D.name);
