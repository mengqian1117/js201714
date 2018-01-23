##JS免费课内容
###1.页面的组成部分和JS的组成部分
- 页面组成部分
  - html  H5
  - css   css3
  - js   
- JS的组成部分
  - 宿主环境  ->html(浏览器,app),->node环境
  - ECMAScript 核心:语法规范,变量的定义,数据类型,.....
- JS引用方式
  - 行内(标签上 )
  ```
  <div id="box" onclick="fn(event)">111111111111</div>
  fn(event)必须fn()执行不可以只写定义,传的是实参
  注意事件对象event
  ```
  - script标签中
  - 外链式script 的src上
  ```
  <script src="" defer></script>
  <script src="" async></script>
  ```
- JS的输出方式
  - alert() 返回值:undefined
  - confirm(); true/false
  - prompt();  "输入框的内容"/null
  - console
    - console.log(); "占位符 %s"
    - console.table();
    - console.time()+console.timeEnd();
    
##js定义变量
- 变量/常量
  - 变量 var a=1; a=3 √
  - 常量 const b=1; b=2 ×
- 定义变量
  - var 
      - 全局下var的个变量是给window增加一个属性,window.属性
      - 在私有作用域下 直接给变量赋值 也是给window增加的属性
        ```
        function fn(){
           var a=2;
           b=1;//window.b=1;
        }
        console.log(b); 1
        console.log(a); ×       
        ```
      - 可以重复声明
      - 有变量提升
  - let
      - 不会给window增加属性
      - 不可以重复声明
      - 没有变量提升
  - const
      - 不会给window增加属性
      - 不可以重复声明
      - 没有变量提升
      - 定义的是常量,声明必须赋值,不可以修改
  - function
      - 函数定义
      - 有变量提升(不是块作用域下可以提前赋值)
  - class  
      - 类定义 
      - 没有变量提升 
  - 区别
      - es5和es6 的区别
- 命名规范
  - 严格区分大小写
  - 可以使用数组,字母,_,$
  - 数字不可以作为首字符
  - 不可以使用关键字和保留字
  - 尽量使用驼峰命名法
  - ....
##js数据类型
- 基本数据类型
  - number
  - string
  - boolean
  - null
  - undefined
  - Symbol
- 引用数据类型
  - 对象object
     - 对象object {}
     - 数组 array
     - 正则
     - 时间
     - Set
     - Map
  - function
- 区别 基本数据类型是操作值的引用数据类型是操作地址的
- 检测数据类型
  - typeof     两个及两个以上是"string"
  - instanceof 检测是不是某个类的实例
  - constructor.name
  - Object.prototype.toString.call() '\[object 类型]'
###number
- 普通数字 NaN
- Number()
  - 返回值:数字/NaN
  - null->0
  - true->1,false->0
  - ""," " ->0
  - 时间 ->毫秒数
  - [] ->0
- isNaN()
  - true/false
- parseInt()/parseFloat()
  - 返回值:数字/NaN
  - null->NaN
  - true->NaN,false->NaN
  - ""," " ->NaN
  - 时间 ->NaN
  - [] ->NaN
- 构造函数创建方式和字面量创建方式 
  - var a=new Number(1)
  - var a=1  
- 点(数字后面的第一个点.表示有效数字小数点的意思)
```
var a=1;
a.toString();
1.toString();   ×
(1).toString(); √
1..toString();  √
```  
###boolean
- 值:true/ false
- Boolean(只有0,'',null,undefined,NaN是false其他都是true)
- !  转布尔取反
- !! 转布尔

###null和undefined
- 下面什么方法都没有
- null==undefined √

###string
- length,索引 (注意length是 不可以修改的,所以说字符串中的方法都不会改变原字符串)
- split()
- slice()
- subStr()
- subString()
- replace()
- indexOf/lastIndexOf()
- includes()
- search()
- match()
- toUpperCase()
- toLowerCase()
- repeat()
- startsWith()
- endsWith()
- padStart()
- padEnd()

### 运算符
- = 赋值 变量=值 
```
  var a=0;
  var b=a;
  var arr=[1,2];
  var ary=arr;
```
- == 比较 涉及数据类型的转换
  - 数字==字符串  字符串->数字 (Number)
  - 数字==布尔    布尔->数字(Number)
  - 字符串==布尔  都转为数字
  - null 和 undefined  跟其他的都是false
  - 数字==引用数据类型   引用数据类型-->数字 (Number) 
  - 字符串==引用数据类型 引用数据类型-->字符串(toString)
  - 布尔==引用数据类型   都转为数字
  - 引用数据类型==引用数据类型 比较的是地址
- === 绝对相等(不会进行数据类型的转换)
- ||  前面是true返回前面的值反之返回后面的值 
- &&  前面是false返回前面的值反之返回后面的值  ""&&1->""
- i++ var i=1; i++ ->(1); i->2
- ++i var i=1; ++i ->(2); i->2
- () 
   - 保证语法
     ```
     {a:1}   此时是一个块作用域
     ({a:1}) 此时是一个对象
     fn()
     ```
   - 运算优先级
   - 正则中的分组
   - 表达式也有值
   ```
   let a=(1,2,3,4,5); 
   console.log(a);//5
   (function(n){console.log(n)},function(n,m){console.log(n+m)})(1)
   ```
- for循环
- while循环
- if判断
- switch判断 (使用的是===判断)
- + - * / (除了字符串+之外其他都是数字运算,如果不是数字使用Number方法变成数字再运算);

###对象
- 无序的键值对组合
- 属性名是字符串
- 获取数值
  - 对象.属性名
  - 对象["属性名"]
- ES6 支持简写方式
```
let a=1,b=2,c="name";
let obj={a,b};//{a:1,b:2}
let onj1={
  fn(){},//fn:function(){}
  [c+1]:"zhufeng",//name1:"zhufeng"
}

```  
- 获取对象的属性值的个数
```
Object.keys(obj).length
```
- toString()
- Object.assign()
- Object.getOwnPropertyDescriptor()
- 实例.hasOwnProperty()
- Object.create
- Object.is()
- 解构赋值
```
let obj={a:1,b:2}
let {a,b}=obj;
let {a:x}=obj;
```
- 遍历对象 for in
###数组
- length,索引(length可以修改,方法可以改变原数组)
- 原型上的方法
  - join()
  - slice(n,m)
  - splice(n,m,x1,x2..)
  - pop
  - shift()
  - unshift()
  - push()
  - concat
  - indexOf/lastIndexOf
  - includes
  - copyWithIn()
  - fill()
  - sort()
  - find
  - filter
  - map
  - forEach()
  - findIndex()
  - reduce() 
  - reduceRight()
  - every()
  - some()
- 数组去重
```
 var ary1 = [1, 2, 1, 2, 1, 23, 4, 1, 23, 24, 4, 5, 2, 3, 6, 7];
    var arr=[];
    //第一种方案
    //for循环,includes,push
    for(var i=0;i<ary1.length;i++){
        if(!arr.includes(ary1[i])){
            //也可以使用:arr.indexOf(ary1[i]))==-1来判断
            //判断arr中有没有ary[i],没有的时候才往里面放
            arr.push(ary1[i]);
        }
    }
    console.log(arr);

    //第二种
    var ary1 = [1, 2, 1, 2, 1, 23, 4, 1, 23, 24, 4, 5, 2, 3, 6, 7];
    //查看数组的每一项,看他的indexOf和lastIndexOf是否相等,如果不相等说明至少出现两次,我们删除第一个....
    for (var i=0;i<ary1.length;i++){
        if(ary1.indexOf(ary1[i])!=ary1.lastIndexOf(ary1[i])){
            //删除数组的某一项  splice(i,1)
            ary1.splice(i,1);
            //一定要注意,循环遍历数组的每一项的时候,如果删除数组的当前项,为了防止数组塌陷,一定要记住让i--,
            i--;
        }
    }
    console.log(ary1);

    //第三种:使用filter实现数组去重
    var ary1 = [1, 2, 1, 2, 1, 23, 4, 1, 23, 24, 4, 5, 2, 3, 6, 7];
    var arr=ary1.filter(function (item,index) {
        //每拿到一项,然后去看之前组成的数组中有没有这一项,如果有不留下,没有的话留下
        return !(ary1.slice(0,index).includes(item));
    });
    console.log(arr);

    //第四种,对象的特点,属性名不可以重复,后面会覆盖前面的
    //实现了去重排序
    var obj={};
    var arr=[];
    for (var  key in ary1){
        obj[ary1[key]]=ary1[key]
    }
    for(var key in obj){
        arr.push(obj[key])
    }
    console.log(arr);
    
    //五
    var ary1 = [1, 2, 1, 2, 1, 23, 4, 1, 23, 24, 4, 5, 2, 3, 6, 7];
    [...new Set(ary1)];
    Array.from(new Set(ary1));
    
```  
- Array类上的方法
  - Array()
  ```
  参数是一个,并且是一个数字就会当做新数组的length
  let arr=Array(1,2);
  let arr=Array(7);//[,,,,,,,]
  let arr=Array("7");//["7"]
  ```
  - Array.of
  ```
  let arr=Array.of(7);//[7]
  ```
  - Array.from()
  ```
   参数可以是数组/类数组
   返回值:新的数组
  ```
- 解构赋值
  - 普通用法
  ```
   let [a,b,c]=[1,2]
  ```
  - 省略赋值
  ```
  let [,,c]=[1,2,3]
  ```
  - 不定参数
  ```
  let [a,b,...c]=[1,1,2,2,3,4,5]
  ```
  - 默认值
  ```
    let [a=(function(){console.log(1);return 10;})(),b]=[1,1];
    let [a=(function(){console.log(1);return 10;})(),b]=[undefined,1];   
    ```
- in 检测索引位置是不是空位
  ```
  var a=1;
  "a" in window; true
  let arr=[,1,,,2];
  1 in arr; true
  0 in arr; false
  ```
- for of
```
for(let item of arr){
   item:当前项
}
for(let index of arr.keys()){
   index:索引
}
for(let [index,item] of arr.entries()){
   index:索引,item:当前项
}
```
- 数组的空位
```
//Es5对空位的处理不太相同,一般都是直接跳过,但是ES6中的方法都是将空位处理为undefined
    var arr1=[1,,,2,3];
    arr1.forEach(function (item) {
        console.log(item);
    });
    arr1.find(function (item) {
        console.log(item);
    });

```
###时间
- new Date;获取本机时间
- new Date("2018-2-09 20:37:00");2018-2-09 20:37:00变成标准时间格式
- new Date("2018-2-09 20:37:00")-new Date();获取时间差(毫秒)
- getTime()
- getFullYear()
- getMonth() 0-11
- getDate()
- getDay() 0-6 星期天-星期6
- getHours()
- getMinutes()
- getSeconds()
###正则
###函数
- 定义+执行
- name 
  - new Function()  "anonymous"
  - fn.bind()       "bond fn"
- length(形参的个数,默认值会影响)
- 构造函数方式创建函数
```
let fn=new Function("形参","函数体")
let fn=new Function("函数体")

var ary="[1,2,3]";
(new Function("return"+ ary))();
```
- 自执行函数
- arguments
- return
- caller 
- arguments.callee 
- 箭头函数
  - 没有this
  - 没有arguments
  - 实参集合
  ```
  let f=(...rest)=>{
     rest是个数组[1,2,3]
  }
  f(1,2,3)

  ```
###Math
- Math.abs() 绝对值
- Math.pow() 几次幂
- Math.sqrt() 算数平方根
- Math.ceil()向上取整
- Math.floor() 向下取整
- Math.round() 四舍五入
- Math.random() 0-1随机小数
- Math.round(Math.random*(m-n)+n) n-m的随机整数
- Math.ceil(Math.random*(m-n)+n)  n-m的随机整数
- Math.PI π
- Math.max
- Math.min
```
数组求最值
eval("Math.max("+ary+")");
Math.max.apply(null,ary);

```
##免费课案例
- 选项卡
- 验证码
- 课下题目
- 面试题
