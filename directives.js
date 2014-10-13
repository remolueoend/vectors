/**
 * Created by remo on 13/10/14.
 */

'use strict';

vectors.app.directive('appModal', function(){
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

});