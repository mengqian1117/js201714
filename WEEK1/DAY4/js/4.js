/*
"use strict";
var  a=1;
console.log(a);
function fn() {
    console.log(this);
}
fn();
window.fn();
(function () {
    console.log(this);
})();
window.setTimeout(function () {
    console.log(this);
},1000);
[1,2].forEach(function () {
    console.log(this);
});

*/
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