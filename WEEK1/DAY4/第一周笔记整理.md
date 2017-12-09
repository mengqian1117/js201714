###1.定时器
- 定时器是异步的
- 定时器是有返回值的,是一个数字,代表他是第几个定时器(注意:第几个跟执行顺序没有关系,你写的他是第几个就是第几个)
- 清除定时器参数是一个数字,表示第几个定时器(清除定时器原理是将定时器中的函数阻止了,这个定时器本身还是在的,他的序号还在)
- 清除定时器的时候,如果你知道这个是第几个定时器那么直接可以写一个数字,但是开发中可能好多个,就容易乱套.此时一般都是用一个变量来接收这个定时器的序号,清除的时候就准确了
- 定时器容易造成累加,没有用的一定要清除掉

###2.引用数据类型
- 存储引用数据类型的过程中拿不到obj 的值,存完了才可以拿到obj的值
```
var obj={
    name:'js',
    can:(function () {
        console.log(obj);
        return obj.name;
    })(),
    do:function () {}  
};
```
- 函数可以增加自定义属性
```
function fn(){};
fn.index="哈哈";
```
- 函数的name属性
```
1.构造暗函数方式创建的函数name都是 'anonymous'
var f=new Function("var a=1");
console.log(f.name);//'anonymous'

2.使用bind方法得到一个新的函数
function ff(){};
var f=ff.bind();
f.name 是 bound ff

```
- 函数的length
```
形参没有默认值时候,函数的length就表示形参的长度

有默认值时候会影响
function fn(x,y=1,z){}
fn.length ==1
```
###3.变量提声
- 什么是变量提声
`在作用域形参之后代码执行之前,先把所有带var和function关键字的提前的声明或者定义`
- var和function区别
`var 只声明不定义,function既声明又定义`
- ES6中的let和const不进行变量提声
```
1.没有变量提声
2.不可以重复声明
3.全局下声明的变量不会给window增加属性
4.const一旦声明必须赋值
5.const赋值不可以修改
```
- 变量提声的特殊情况
```
1.等号右边不进行变量提声
2.自执行函数不进行变量提声
3.函数当做参数的时候不进行变量提声
4.if(){}不管条件是否成立都进行变量提声,但是var和function只声明不定义,当条件成立先给函数赋值
console.log(a);
console.log(A);
if(1){
   console.log(a);
   console.log(A);
   var a=1;
   function A(){}
}
5.return出的内容执行但是不进行变量提声,return后面的内容不执行但是需要变量提声
function fn(){
  var a=1;
  A();
  return ++a;
  a++;
  function A(){
     a++;
  }
}
console.log(fn());
```
###4.私有作用
- 一个函数执行就会形成一个私有作用域
- 私有变量
```
1.形参是私有变量
2.私有作用域下声明的变量是私有变量
```
- 闭包
```
一个函数执行如果形成一个不销毁作用域,保护里面的私有变量或者是存储私有变量,但是闭包容易引起内存泄漏
造成内存泄漏的情况:
1)全局变量
2)不销毁作用域
function fn(){
   var a=1;
   return function(){
       a++;
   }   
}
var f=fn();
f();
```
- 作用域销毁
```
全局:关闭浏览器的时候销毁
私有:看是否返回地址并且被占用了,决定是否销毁

for(var i=0;i<oLis.length;i++){
   oLis[i].onclick=(function(i){
       return function(){
           console.log(i)
        }
   })(i);
}
for(var i=0;i<oLis.length;i++){
  (function(i){
      oLis[i].onclick= function(){
                console.log(i)
      }
  })(i)
}
```
- 作用域链
```
是一个查找过程:在一个私有作用域下遇到变量了,先看是不是自己私有的如果不是往上一级找,没有继续找一直找到window下为止,没有就报错了
```
- 上一级作用域
```
看当前这个作用域对应的地址是在哪一个作用域下定义的,那个作用域就是当前这个作用域的上一级
var a=10;
function fn(){ console.log(a)};
function F(){
   var a=100;
   fn();
   return function(){console.log(a)}
}
var f=F();
f();
```
###5块级作用域
`{},if(){},for(){},while(){}`
- var 和function 定义变量仍然是属于当前作用域
`在块作用域之前获取变量,var和function声明的变量都是undefined(只声明不定义),块作用域执行的时候,先给函数赋值`
```
{
  var a=1;
  function fn(){}
}
console.log(a);
console.log(fn);
```
- let和const定义的变量属于一个私有作用域,变量是私有变量
```
{
  let a=1;
  const b=1;
}
console.log(a);
console.log(b);
```

###6this问题
- 函数执行的时候前面有点,点前面是谁this就是谁,没有点就是window
- 注意严格模式函数执行前面没有点this就是undefined,但是定时器时候函数中的this是window
- 给一个元素绑定事件,给谁绑的this就是谁
- 自执行函数this是window
- 函数当做参数的时候执行函数中的this是window
```
var number=2;
var obj={
    number:4,
    fn1:(function () {
        this.number*=2;
        number=number*3;
        var number=3;
        return function () {
            this.number*=2;
            number*=3;
            alert(number);
        }
    })()
};
var fn1=obj.fn1;
alert(number);
fn1();
obj.fn1();
alert(window.number);
alert(obj.number);
```
```
box.fn=function(){};box增加一个自定义属性
box.fn();
box.onclick=function(){
    this==box
    //box.fn();this.fn()
}

window.setTimeout(box.fn,2000);//this:window
```

###7面向对象
- 单利模式
```
var obj=(function(){
    function fn(){
       this.ff();
       return this;
    }
    function ff(){
       window.setTimeout(()=>{
          this.fn();
       },2000);
    }
    return{
       fn:fn,
       ff:ff
    }
})();
obj.fn().ff()
1.单例模式中的函数之间相互调用,采用this.函数()
2.链式写法的原理:return this;
3.单例模式中的函数中的箭头函数的this还是当前对象(例如上面案例中的定时器中的箭头函数);
4.场景应用的案例
```
- 构造函数
```
1.自定义类,是一个函数通过new方式执行
2.构造函数中的this是当前实例
3.通过this.属性=值的形式给当前实例增加私有属性,
4.默认返回this,手动的return一个基本数据类型不会影响实例this,但是return一个引用数据类型会影响实例this
5.实例是一个对象
```
- 字面量创建方式和构造函数创建方式的区别
```
1.对于基本数据类型
字面量创建方式和构造函数创建方式不一样
字面量创建方式得到一个值,使用instanceof判断是false
构造函数创建方式得到一个实例对象,使用instanceof判断是true

2.对于引用数据类型
字面量创建方式和构造函数创建方式是一样的
```
###8.原型
- 所有的类都是函数
- 所有的实例都是对象
- 只要是函数都天生自带一个prototype(原型)属性,这个原型是用来存储公有的属性和方法用的;而且prototype属性是一个对象,浏览器默认开辟一个堆内存来存储这个属性,默认开辟的这个内存中有个属性是constructor,这属性指向当前函数本身
- 只要是对象都天生自带一个__proto__;(注意:prototype是对象)这个属性指向所属类的原型

###9.原型链
一个对象遇到属性了先看是不是自己的私有属性,没有这个私有属性,就通过__proto__找到所属类的原型,没有继续找一直找到Object基类的原型上为止,还没有找到就是undefined

###10.私有属性和公有属性
- in:公有属性和私有属性都可以判断
- hasOwnProperty:判断是不是自己的私有属性