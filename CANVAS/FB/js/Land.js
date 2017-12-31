(function () {
    let Land=window.Land=function () {
        this.x=0;
        this.w=336;
        this.h=112;
        this.steep=1;
    };
    Land.prototype.update=function () {
        this.x-=this.steep;
        if(this.x<=-this.w){
            this.x=0
        }
    };
    Land.prototype.render=function () {
        game.draw.drawImage(game.allImg["land"],this.x,game.canvas.height-this.h);
        game.draw.drawImage(game.allImg["land"],this.x+this.w,game.canvas.height-this.h);
        game.draw.drawImage(game.allImg["land"],this.x+this.w*2,game.canvas.height-this.h);
    }
    
})();