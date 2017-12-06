//1.
if("a" in window){
    var a="";
    function getA(a) {
        a=a||this.a;
        console.log(this.a);
    }
    getA(a);
}
//2.
var a=2;
var obj1={
    a:1,
    fn1:(function (a) {
        this.a=a;
        a++;
        return function () {
            this.a=a++;
            console.log(a);
        }
    })(a)
};
obj1.fn1();
var fn1=obj1.fn1;
fn1();

//3.

var ary=[1,2,3,4];
ary.forEach(function(item,index){
    ary[index]=this;
});
console.log(ary);

//4.
var b="b";
var obj2={
    b:"B",
    getB:function (b) {
        this.b=b+this.b;
        return this.b
    }
};
console.log(obj2.getB("是"));

//5.
var aa=20;
function bind() {
    var aa=12;
    function fn() {
        console.log(this.aa);
    }
    box.onclick=function () {
        fn()
    }
}

//6.
var c=3;
function getC() {
    this.c++;
    return function (c) {
        c=this.c*2;
        console.log(c);
    }
}
var obj3={
    c:2,
    getC:(function () {
        this.c-=1;
        return this.getC
    })()
};
getC();
obj3.getC();
var f3=obj3.getC;
f3();
console.log(window.c);
console.log(obj3.c);

//7.
function g1() {
    this.g="gg"
}
var obj4={
    g1:g1,
    gg:function () {
        g1()
    }
};
obj4.g1();
obj4.gg();
console.log(obj4);
console.log("g" in window);











