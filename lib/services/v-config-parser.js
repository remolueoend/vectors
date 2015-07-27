
module.exports = (function(){
    'use strict';

    return [function(){

        return {
            v0: v0,
            v1: v1
        };

        /**
         * Parses a single v0 vector config.
         *
         * @param {string} vStr Vector config string
         * @retruns {object}
         */
        function v0(vStr){
            var cfg = this.v1(vStr);
            cfg.r *= 100;
            return cfg;
        }

        /**
         * Parses a single v1 vector config.
         *
         * @param {string} vStr Vector config string
         * @retruns {object}
         */
        function v1(vStr){
            var ps = vStr.split(",");
    		if(ps.length !== 3) throw "Invalid config";
    		return {
                l: parseFloat(ps[0]),
                r: parseFloat(ps[1]),
                c: ps[2]
            };
        }
    }];

})();