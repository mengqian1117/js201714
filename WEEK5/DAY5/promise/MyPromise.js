function Promise(executer) {
    //给实例增加一个属性status存储他的状态
    this.status="pending";
    //this.value 存储的是成功时候的参数
    this.value=undefined;
    //this.reason存储的是失败时候的参数
    this.reason=undefined;
    let resolve=(value)=>{
        if(this.status=="pending"){
            this.status="resolved";
            this.value=value;
        }
    };
    let reject=(reason)=>{
        if(this.status=="pending"){
            this.status="rejected";
            this.reason=reason;
        }
    };
    try {
        //代码没有错误执行
        executer(resolve,reject);
    }catch (e){
        //代码错了就会执行catch里面的,会把错误信息传给e
       reject(e)
    }
}

Promise.prototype.then=function (onFulfilled,onRejected) {
    //根据实例目前的状态选择要执行的函数,顺便把对应的参数传给函数
    if(this.status=="resolved"){
        onFulfilled(this.value);
    }
    if(this.status=="rejected"){
        onRejected(this.reason);
    }
};

module.exports=Promise;