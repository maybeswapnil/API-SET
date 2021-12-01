var express = require('express');
var mainRouter = express.Router();
const axios = require('axios');

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'

var url1 = "https://www.google.com/complete/search?q="
var url2 = "&cp=3&client=gws-wiz&xssi=t&hl=en-IN&authuser=0&psi=EneOYbTyINyp1sQP2OCf8AE.1636726548091&dpr=1"

mainRouter.get('*', function(req, res, next) {
    var request = req.params;
    request = request["0"].split('/')[1];
    console.log(req.get('X-API-Key'))
    var apiKey = req.get('X-API-Key');
    try {
        var c = apiKey.length;
    } catch(e) {
        var val = {
            "message" : "API KEY NOT VALID/FOUND",
            "data" : "failue"
        }
        res.status(403)
        res.send(val)
    }
    if(apiKey.length==0) {
        var val = {
            "message" : "API KEY NOT VALID/FOUND",
            "data" : "failue"
        }
        res.status(403)

        res.send(val)
    } else {
        axios.get(url1 + request + url2).then((r) => {
            try {
                var son = JSON.stringify(r.data);
                son = son.split("[")
                var ash = [];
                for(var i = 0;i<son.length;i++) {
                    if(son[i].normalize().length>10 ) {    
                            son[i] = son[i].normalize();
                            son[i] = son[i].split(`"`)[1].split(`\\`)[0]
                            if(son[i].includes(request) && !ash.includes(son[i]))
                            ash.push(son[i]);
                    }
                }
                if(ash.length==0) {
                    
                    var val = {
                        "message" : "nothing found"
                    }
                    res.send(val)
                } else {
                    
                    var val = {
                        "message" : "found",
                        "data" : ash
                    }
                    res.send(val)
                }
            } catch(e) {
               

                var val = {
                    "message" : "nothing found"
                }
                res.send(val)
            }
    
    
        }).catch((e) => {
            res.send(e)
        })
    
    }
    
});

String.prototype.cleanup = function() {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}

 String.prototype.toUnicode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("\\u00"+hex).slice(-7);
    }

    return result;
}

module.exports = mainRouter;
