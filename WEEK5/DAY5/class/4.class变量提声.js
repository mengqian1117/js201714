//function 会有变量提声
FF();
new FF();
function FF() {
    this.f="ff";
}

//ES6 中的class跟了let 和const一样没有变量提升
//new GG;// GG is not defined
class GG{
    constructor(){
        this.gg="gg"
    }
}