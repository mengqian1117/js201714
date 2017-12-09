// var obj={
//     name:'js',
//     can:(function () {
//         console.log(obj);
//         return obj.name;
//     })(),
//     do:function () {}
//
// };
//
// console.log(obj.do);

new Number(1);
var f=new Function("var a=1");
console.log(f.name);//'anonymous'
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