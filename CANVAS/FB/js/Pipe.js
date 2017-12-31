(function () {
    let Pipe=function () {
        //上管子的高度,320-100随机的高度
        this.h1=Math.round(Math.random()*220+100);
        //空隙固定140
        this.space=140;
        //下管子的高度=canvas的高-land的高-上管子的高-空隙
        this.h2=game.canvas.height-112-this.h1-this.space;
        this.x=game.canvas.width;
        game.pipeArr.push(this);
    };
    Pipe.prototype.update=function () {
        this.x-=1;
        //一旦管子走出画布,直接从数组pipeArr中移除
        if(this.x<=-52){
            for(let i=0;i<game.pipeArr.length;i++){
                if(game.pipeArr[i]==this){
                    game.pipeArr.splice(i,1);
                    i--;
                }
            }
        }
    };
    Pipe.prototype.render=function () {
        game.draw.drawImage(game.allImg["pipe_down"],0,320-this.h1,52,this.h1,this.x,0,52,this.h1);
        game.draw.drawImage(game.allImg["pipe_up"],0,0,52,this.h2,this.x,game.canvas.height-112-this.h2,52,this.h2);
    };
    window.Pipe=Pipe;
})();