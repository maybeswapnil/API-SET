

var express = require('express');
var nasaRouter = express.Router();
const axios = require('axios');

var config1 = {
    method: 'get',
    url: 'https://api.n2yo.com/rest/v1/satellite/above/0/0/0/90/18/&apiKey=B92G3G-C7LYLX-CZKD3U-4V6E',
    headers: { }
};
var config2 = {
    method: 'get',
    url: 'https://api.n2yo.com/rest/v1/satellite/above/10/-400/0/90/18/&apiKey=B92G3G-C7LYLX-CZKD3U-4V6E',
    headers: { }
};
var config3 = {
    method: 'get',
    url: 'https://api.n2yo.com/rest/v1/satellite/above/10/72/0/90/18/&apiKey=B92G3G-C7LYLX-CZKD3U-4V6E',
    headers: { }
};

var response = {
    "error": "internal server failure",
    "message": {
        "string": "error"
    }
}

nasaRouter.get('/raw', function(req, res, next) {
    var data;
    console.log('asdasdas')
    var a1 = axios(config1)
    var a2 = axios(config2)
    var a3 = axios(config3)
    
    Promise.all([a1, a2, a3]).then(function (response) {
        var k = {
            0: response[0].data,
            1: response[1].data,
            2: response[2].data
        }
        res.json(k)
        console.log(k)

    })
    .catch(function (error) {
      console.log(error);
    });
});  


nasaRouter.get('*', function(req, res, next) {
    var data;
    console.log('asdasdas')
    var a1 = axios(config1)
    var a2 = axios(config2)
    var a3 = axios(config3)
    
    Promise.all([a1, a2, a3]).then(function (response) {
        var k = [...main(response[0].data), ...main(response[1].data), ...main(response[2].data)]
        res.json(k)
        console.log(k)

    })
    .catch(function (error) {
      console.log(error);
    });
  
});  

const llarToWorld = (satlat, satlng, satalt, rad, name) => {
    x = Math.sin(satlng) * Math.cos(satlat)
    z = Math.sin(satlng) * Math.sin(satlat)
    y = Math.cos(satlng)
    return [x , y , satalt, name]
}

var main = (data) => {
    console.log(data)
    var data2 = data['above']
    var p = []
    data2.map((r) => {
        p.push(llarToWorld(r['satlat'],r['satlng'],r['satalt'],1,r['satname'] ))
    })

    return p;
}


module.exports = nasaRouter;
