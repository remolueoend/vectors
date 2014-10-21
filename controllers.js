/**
 * Created by remo on 12/10/14.
 */

'use strict';

vectors.app.controller('appCtrl', ['$scope', 'drawSrv', function($scope, drawSrv){

    var startAngle = -1 * (90 * (Math.PI / 180)),
        img = document.getElementById("image");

    function resizeCanvas(canv){
        canv.elem.setAttribute("width", window.innerWidth);
        canv.elem.setAttribute("height", window.innerHeight - 60);
    }

    function updateImage(){
        img.src = canv.elem.toDataURL();
    }

    function Vector(length, rotation, color){
        this.l = length;
        this.r = rotation;
        this.c = color;
        this.a = startAngle;

    }
    Vector.prototype = {
        getEndPoint: function(startPoint, canvas){
            var base = canvas.getHeight() / 100;
            var dy = Math.sin(this.a) * base * this.l;
            var dx = Math.cos(this.a) * base * this.l;

            return {
                x: startPoint.x + dx,
                y: startPoint.y + dy
            }
        },

        rotate: function(){
            this.a += this.r / 100;
        },

        compare: function(v){
            return this.l === v.l &&
                this.r === v.r &&
                this.c === v.c;
        }
    };

    function Canvas(canvas){
        this.elem = canvas;
    }
    Canvas.prototype = {

        clear: function(){
            var s = this.getSize();
            this.getContext().clearRect(0, 0, s.w, s.h);
        },

        getSize: function(){
            return {
                w: this.elem.offsetWidth,
                h: this.elem.offsetHeight
            };
        },

        getCenter: function(){
            var s = this.getSize();
            return {
                x: s.w / 2,
                y: s.h / 2
            };
        },

        getContext: function(){
            return this.elem.getContext("2d");
        },

        getHeight: function(){
            return this.elem.height;
        }
    };

    $scope.vectors = [];
    $scope.points = [];
    $scope.config = "";

    $scope.addVector = function(){
        $scope.vectors.push(new Vector(20, 1, "blue"));
    };

    $scope.deleteVector = function(index){
        $scope.vectors.splice(index, 1);
    };

    $scope.clearPoints = function(){
        $scope.points = [];
        for(var i = 0; i < $scope.vectors.length; i++){
            $scope.vectors[i].a = startAngle
        }
    };

    $scope.toggleConfig = function(){
        $scope.showSettings = ($scope.showSettings == null || $scope.showSettings === false);
        if($scope.showImage){ $scope.showImage = false; }
    };

    $scope.toggleImage = function(){
        $scope.showImage = ($scope.showImage == null || $scope.showImage === false);
        if($scope.showSettings){ $scope.showSettings = false; }
        if($scope.showImage){
            updateImage();
        }
    };

    $scope.loadConfig = function(){
        var c;
        try{
            c = vectors.config.parse($scope.config);
        }catch(e){
            alert("invalid config!");
            return;
        }
        $scope.vectors = [];
        $scope.clearPoints();
        for(var i = 0; i < c.length; i++){
            var cv = c[i];
            var v = new Vector(cv.l, cv.r, cv.c);
            v.a = startAngle;
            $scope.vectors.push(v);
        }
    };

    $scope.$watch("vectors", function(n, o){
        if(n.length !== o.length || !n.every(function(v, i){
            return v.compare(o[i]); }
        )){
            $scope.config = vectors.config.stringify($scope.vectors);
        }
    }, true);

    var canv = new Canvas(document.getElementById("canvas"));

    window.addEventListener("resize", function(){
        resizeCanvas(canv);
    });
    resizeCanvas(canv);

    new drawSrv($scope, canv).draw();

}]);