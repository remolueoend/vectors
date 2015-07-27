/**
 * Created by remo on 12/10/14.
 */

var angular = require("angular");

(function(angular, window){
    'use strict';

    var vectors = {};
    var app = vectors.app = angular.module('vectors', []);

    app.factory('drawSrv', require("./services/draw-service"));
    app.factory('config', require("./services/config-parser"));
    app.factory('vConfigParser', require("./services/v-config-parser"));
    app.controller('appCtrl', require("./controllers/app-controller"));
    app.directive('appModal', require("./directives/app-modal"));

    window.vectors = vectors;

})(angular, window);