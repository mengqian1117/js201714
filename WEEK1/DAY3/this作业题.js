//1.
console.log(getA);//undefined
//全:a,getA
if("a" in window){
    var a="";//w.a=""
    function getA(a) {//私:a=""
        a=a||this.a;//a=window.a="";
        console.log(this.a);//window.a="";
    }
    getA(a);//getA("")
}



//2.
var a=2;//window.a=2
var obj1={
    a:1,//obj1.a=1
    fn1:(function (a) {//自执行函数的私有变量a=2
        this.a=a;//window.a=2
        a++;//私有变量a=3
        return function () {//xxxfff000
            this.a=a++;//obj1.a=3,私有a=4  ; window.a=4,a=5
            console.log(a);//4 ;5
        }
    })(a)//(window.a=2)
    //obj1.fn1:xxxfff000
};
obj1.fn1();//this->obj1
var fn1=obj1.fn1;//fn1=xxxfff000
fn1();//this->window

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
    getB:function (b) {//this->obj2
        //b="是"
        this.b=b+this.b;//obj2.b="是"+"B"="是B"
        return this.b
    }
};
console.log(obj2.getB("是"));//"是B"

//5.
var aa=20;
function bind() {
    var aa=12;
    function fn() {
        console.log(this.aa);//window.a=20
    }
    box.onclick=function () {
        //this->box
        fn();//this->window
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
function g1() {//xxxfff000
    this.g="gg"
}
var obj4={
    g1:g1,//obj4.g1:xxxfff000
    gg:function () {//xxxfff111
        g1()//window.g="gg"
    }
    //g:"gg"
};
obj4.g1();//obj4.g="gg"
obj4.gg();
console.log(obj4);
console.log("g" in window);//true











