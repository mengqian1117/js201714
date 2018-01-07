function BB(name) {
    this.name=name;
}
let bb=new BB("珠峰");

class AA{
    constructor(name){
        this.name=name;
    }
}
let aa=new AA("珠峰培训");
console.log(aa);

//采用class表达式让类直接执行
let a1=new class{
    constructor(name){
        console.log(name);
    }
}("阳家昆");