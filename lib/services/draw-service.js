

module.exports = (function(){

    'use strict';

    return [function(){

        var requestAnimFrame = (function(){
            return  window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        /**
         *
         * @param scope
         * @param {Canvas} canvas
         * @constructor
         */
        function DrawService(scope, canvas){
            if(!(this instanceof DrawService)){
                return new DrawService(scope, canvas);
            }
            this.scope = scope;
            this.canvas = canvas;
            this.context = canvas.getContext();
            this.context.lineWidth = 0.5;
            this.points = [];
            this.events = {};
        }
        DrawService.prototype = (function(){
            function draw(){
                animate.call(this);
            }

            function clear(){
                this.points = [];
            }

            function on(event, handler){
                this.events[event] = this.events[event] || [];
                this.events[event].push(handler);
            }

            function trigger(event){
                var handlers = this.events[event];
                if(handlers instanceof Array){
                    var data = Array.prototype.slice.call(arguments, 1);
                    for(var i = 0; i < handlers.length; i++){
                        handlers[i].apply(this, data);
                    }
                }
            }

            function animate(){
                var self = this;
                requestAnimFrame(function(){
                    animate.call(self);
                });
                render.call(self);
            }

            function render(){
                var vs = this.scope.vectors,
                    _this = this;
                if(vs.length)
                {
                    this.canvas.clear();
                    var startPoint = this.canvas.getCenter(),
                        i;
                    for (i = 0; i < vs.length; i++) {
                        var v = vs[i];
                        if(typeof v === "undefined"){ continue; }
                        var end = v.getEndPoint(startPoint, this.canvas);
                        drawVector.call(this, startPoint, end, v.c);
                        v.rotate();
                        startPoint = end;
                    }
                    this.points.splice(0, 0, end);
                    drawPoints.call(this, vs[i - 1].c);

                    //trigger.call(this, "drewPoints", this.points.length);
                }
            }

            function drawVector(start, end, color){
                var ctx = this.context;
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = color;
                ctx.stroke();
            }

            function drawPoints(color){
                var ps = this.points;
                if(ps.length > 1){
                    var ctx = this.context;
                    ctx.beginPath();
                    ctx.moveTo(ps[0].x, ps[0].y);
                    for(var i = 1; i < ps.length; i++){
                        ctx.lineTo(ps[i].x, ps[i].y);
                    }
                    ctx.strokeStyle = color;
                    ctx.stroke();
                }
            }

            return {
                draw: draw,
                clear: clear,
                on: on
            }
        })();

        return DrawService;
    }];
})();