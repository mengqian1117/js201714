//类就相当原型,写在原型上的方法都被实例继承了,假如想给当前类本身加一些方法我们可以在方法前面加上一个关键字 static,不会被实例继承,只有类本身可以使用,例如 Array.of
class AA{
    constructor(){
        this.a="aa";
    }
    getA(){
        console.log("哈哈");
    }
    static getB(){
        console.log("我是AA的静态方法");
    }
}

let aa=new AA;
aa.getA();
console.log(aa.getB);
AA.getB();

//静态方法可以被子类继承
class F{
    static getF(){
        console.log("我是F的getF");
    }
};
class G extends F{
    static getF(){
        super.getF();
    }
}
G.getF();
