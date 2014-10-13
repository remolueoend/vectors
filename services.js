/**
 * Created by remo on 12/10/14.
 */

'use strict';

vectors.app.factory('drawSrv', [function(){

    window.requestAnimFrame = (function(){
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
        this.scope = scope;
        this.canvas = canvas;
        this.context = canvas.getContext();
        this.context.lineWidth = 0.5;
    }
    DrawService.prototype = (function(){
        function draw(){
            animate.call(this);
        }

        function animate(){
            var self = this;
            requestAnimFrame(function(){
                animate.call(self);
            });
            render.call(self);
        }

        function render(){
            var vs = this.scope.vectors;
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
                this.scope.points.splice(0, 0, end);
                drawPoints.call(this, this.scope.points, vs[i - 1].c);
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

        function drawPoints(points, color){
            if(points.length > 1){
                var ctx = this.context;
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for(var i = 1; i < points.length; i++){
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        }

        return {
            draw: draw
        }
    })();

    return DrawService;

}]);