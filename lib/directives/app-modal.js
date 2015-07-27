/**
 * Created by remo on 13/10/14.
 */

module.exports = (function(){
    'use strict';

    return function(){
        var _link = function(scope, element, attrs){
            scope.$watch(attrs.appModal, function(v){
                if(v){
                    element.css("display", "block");
                }else{
                    element.css("display", "none");
                }
            });
        };

        return {
            link: _link
        }
    };
})();