class A{
    constructor(){
        this.a="a";
    }
    getA(){
        console.log(this.a);
    }
}
class B extends A{
    constructor(){
        //只要是写了constructor 必须要写super(),子类B中没有this 他的this的是来自父类A的this,只有执行了super();才会有this
        //this.b="b"; 在super之前不可以使用this
        let a=1;
        super();//父类本身
        //A.prototype.constructor.call(this);
        this.b="b";
    }
    getB(){
        //在这super是一个对象,指向父类的原型
        super.getA()
    }
}

console.log(new B);