
/**
* This service provides functions for handling app configurations.
* Config versions conmpatibility:
* v0: v0
* v1: v1, v0
*/

module.exports = (function(){
    'use strict';

    /**
	* Contains the current configuration version.
	* @type {string}
	*/
	var currentVersion = "v1";

    /**
     * Offers a parsing and stringifying of configuration versions.
     */
    return ['vConfigParser', function(vConfigParser){

        return {
            parse: parse,
            stringify: stringify,
        };

        /**
    	* Parses a configuration string and returns an array
    	* containing the config objects for the vectors.
    	*
    	* @param {string} str String to parse.
    	* @returns {Array}
    	*/
        function parse(str){
        	var verSplt = str.split("_"),
        		ver = verSplt.length > 1 ? verSplt[0] : "v0";
        	if(typeof vConfigParser[ver] !== "function") throw "Invalid config version";

            var vs = verSplt[verSplt.length - 1].split(";"),
                res = [];
            if(!vs.length || !vs[0]) return res;

            for(var i = 0; i < vs.length; i++){
                res.push(vConfigParser[ver](vs[i]));
            }

            return res;
        }

        /**
         * Creates a string out of a version array.
         *
         * @param {Array} arr The version array to stringify.
         * @returns {string}
         */
        function stringify(arr) {
            var res = "";
            for(var i = 0; i < arr.length; i++){
                var v = arr[i];
                res += v.l + "," + v.r + "," + v.c;
                if(i < arr.length - 1){
                    res += ";";
                }
            }
            return currentVersion + "_" + res;
        }
    }];

})();