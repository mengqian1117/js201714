
/*for(var i=0;i<10;i++){
    if (i===3){
        window.setTimeout(function () {
            console.log("我是",i);
        },2000)
    }
    console.log(i);
}


h1.onclick=function () {
    console.log(1);
};

console.log("你好");
*/
console.log(window.setTimeout(function () {
    console.log("我是第一个定时器");
}, 1000));
console.log(window.setTimeout(function () {
    console.log("我是第二个定时器");
}, 5000));
console.log(window.setTimeout(function () {
    console.log("我是第三个定时器");
}, 2000));

window.clearTimeout(1);
window.clearTimeout(2);