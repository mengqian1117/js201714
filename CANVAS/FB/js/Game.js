(function () {
    let Game=window.Game=function () {
        this.canvas=document.getElementById("canvas");
        this.draw=this.canvas.getContext("2d");
        let W=document.documentElement.clientWidth;
        let H=document.documentElement.clientHeight;
        this.canvas.width=W>420?420:W;
        this.canvas.height=H>750?750:H;
        this.allImg={
            "bg_day":"images/bg_day.png",
            "land":"images/land.png",
            "pipe_down" : "images/pipe_down.png",
            "pipe_up" : "images/pipe_up.png"
        };
        var count=0,total=Object.keys(this.allImg).length;
        for (let key in this.allImg){
            ((src)=>{
                this.allImg[key]=new Image();
                this.allImg[key].src=src;
                this.allImg[key].onload=()=>{
                    count++;
                    if(count==total){
                        this.start() ;
                    }
                }
            })(this.allImg[key])
        }
    };
    Game.prototype.clear=function () {
        this.draw.clearRect(0,0,this.canvas.width,this.canvas.height);
    };

    Game.prototype.start=function () {
        this.bg=new Background();
        this.land=new Land();
        this.bg.update();
        this.bg.render();
        this.pipeArr=[];//放管子的
        this.f=0;
        setInterval(()=>{
            this.f++;
            this.clear();
            this.bg.update();
            this.bg.render();
            this.land.update();
            this.land.render();
            //将pipeArr 中存放的每一组管子更新渲染
            this.pipeArr.forEach((item)=>{
                item.update();
                item.render();
            });
            //每200帧new 一个管子
            this.f%200===0&&new Pipe();
        },20);

    }
})();