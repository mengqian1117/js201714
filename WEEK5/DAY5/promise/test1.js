let Promise=require("./MyPromise");
let pro1=new Promise((resolve,reject)=>{
    resolve("zf");
    reject("mq");
    //reject("sorry");
   //throw new TypeError("XX");
});
pro1.then((data)=>{
    console.log(data);
},(e)=>{
    console.log("rejected",e);
});