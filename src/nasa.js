

var express = require('express');
var nasaRouter = express.Router();
const axios = require('axios');

var config = {
    method: 'get',
    url: 'https://api.n2yo.com/rest/v1/satellite/above/10/-400/0/90/18/&apiKey=FUPTMU-T7GSDK-X5LJB6-4UYR',
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
    axios(config)
    .then(function (response) {
        res.json(response.data)

    })
    .catch(function (error) {
      console.log(error);
    });

    
    
});  


nasaRouter.get('*', function(req, res, next) {
    var data;
    console.log('asdasdas')
    axios(config)
    .then(function (response) {
        res.json(main(response.data))

    })
    .catch(function (error) {
      console.log(error);
    });

    
    
});  

const llarToWorld = (satlat, satlng, satalt, rad, name) => {
    x = Math.sin(satlng) * Math.cos(satlat)
    z = Math.sin(satlng) * Math.sin(satlat)
    y = Math.cos(satlng)
    return [x , y , z, name]
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