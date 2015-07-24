
/**
* This namespace provides functions for handling app configurations.
* Config versions conmpatibility:
* v0: v0
* v1: v1, v0
*/
vectors.config = {
	/**
	* Contains the current configuration version
	*/
	currentVersion: "v1",

	/**
	* Parses a configuration string and returns an array
	* containing the config objects for the vectors.
	*/
    parse: function(str){
    	var verSplt = str.split("_"),
    		ver = verSplt.length > 1 ? verSplt[0] : "v0";
    	if(typeof vectors.config.vectorValueParsers[ver] !== "function") throw "Invalid config version";

        var vs = verSplt[verSplt.length - 1].split(";"),
            res = [];
        if(!vs.length || !vs[0]) return res;

        for(var i = 0; i < vs.length; i++){
            res.push(vectors.config.vectorValueParsers[ver](vs[i]));
        }

        return res;
    },

    stringify: function (arr) {
        var res = "";
        for(var i = 0; i < arr.length; i++){
            var v = arr[i];
            res += v.l + "," + v.r + "," + v.c;
            if(i < arr.length - 1){
                res += ";";
            }
        }
        return vectors.config.currentVersion + "_" + res;
    },

    /*
    * Object containing a parser for every available config version.
    */
    vectorValueParsers: {
    	v0: function(vStr){
    		var ps = vStr.split(",");
    		if(ps.length !== 3) throw "Invalid config";
    		return {
                l: parseFloat(ps[0]),
                r: parseFloat(ps[1]) * 100,
                c: ps[2]
            };
    	},
    	v1: function(vStr){
    		var ps = vStr.split(",");
    		if(ps.length !== 3) throw "Invalid config";
    		return {
                l: parseFloat(ps[0]),
                r: parseFloat(ps[1]),
                c: ps[2]
            };
    	}
    }
};