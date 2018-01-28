// let xhr=new XMLHttpRequest();
// xhr.open("get","data/data.json",false);
// xhr.send(null);
// xhr.onreadystatechange=function () {
//     console.log(xhr.readyState);
// };


let xhr=new XMLHttpRequest();
xhr.open("get","data/data.json");//1
xhr.send(null);
xhr.onreadystatechange=function () {
    console.log(xhr.readyState);
    //放在open之后可以监听2,3,4
};







