Element.prototype.animation=function (target,...arg) {
    //this :当前执行动画的元素
    target=target||{};
    let begin={},
        duration=2000,
        interval=13,
        effect=0,
        time=0,
        timer=null,
        numAry=[],
        fnAry=[],
        EffectAry=[];
    arg.forEach((item)=>{
        if(typeof item=="number"){
            numAry.push(item);
        }else if(typeof item=="function"){
            fnAry.push(item);
        }
    });
    for (let i=0;i<numAry.length;i++){
        if(numAry[i]>100){
            duration=numAry[i];
            numAry.splice(i,1);
            break;
        }
    };
    interval=numAry[0]?numAry[0]:interval;
    effect=numAry[1]?numAry[1]:effect;
    for(let key in target){
        begin[key]=$.css(this,key);
    };
    let Effect = {
        //匀速
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },

        //指数衰减的反弹缓动
        BounceEaseIn: function (t, b, c, d) {
            return c - Effect.BounceEaseOut(d - t, 0, c, d) + b;
        },
        BounceEaseOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceEaseInOut: function (t, b, c, d) {
            if (t < d / 2) {
                return Effect.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
            }
            return Effect.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        },

        //二次方的缓动
        QuadEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },

        //三次方的缓动
        CubicEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },

        //四次方的缓动
        QuartEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartEaseOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },

        //五次方的缓动
        QuintEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuintEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuintEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },

        //正弦曲线的缓动
        SineEaseIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineEaseOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineEaseInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },

        //指数曲线的缓动
        ExpoEaseIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoEaseOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoEaseInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },

        //圆形曲线的缓动
        CircEaseIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircEaseOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },

        //超过范围的三次方缓动
        BackEaseIn: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        BackEaseOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        BackEaseInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },

        //指数衰减的正弦曲线缓动
        ElasticEaseIn: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            var s;
            !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        ElasticEaseOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            var s;
            !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        ElasticEaseInOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            var s;
            !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    };
    for(let key in Effect){
        EffectAry.push(Effect[key])
    };
    effect=EffectAry[effect=effect>=EffectAry.length?0:effect];
    timer=setInterval(()=>{
        time+=interval;
        if(time>=duration){
            clearInterval(timer);
            for (let key in target){
                $.css(this,key,target[key]);
            }
            fnAry.forEach((item)=>{
                item.call(this);
            });
            return;
        }
        for(let key in target){
            $.css(this,key,effect(time,begin[key],target[key]-begin[key],duration));
        }
    },interval);
    return this;
};