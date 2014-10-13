
vectors.config = {
    parse: function(str){
        var vs = str.split(";"),
            res = [];
        for(var i = 0; i < vs.length; i++){
            var ps = vs[i].split(",");
            if(ps.length !== 3){ throw "Invalid config"; }
            res.push({
                l: parseFloat(ps[0]),
                r: parseFloat(ps[1]),
                c: ps[2]
            });
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
        return res;
    }
};