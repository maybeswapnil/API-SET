var express = require('express');
var workRouter = express.Router();
const axios = require('axios');
const { MongoClient } = require('mongodb');

var CircularJSON  =  require('circular-json')

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'

const url = "mongodb+srv://swapnil:swapnil@swapnil.wfwy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

workRouter.get('*', function(req, res, next) {

    axios.get('https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=QDFwiREVfR7S80sjLvWvujVbxfl2kGhR9cv8VRuY').then((r) => {
       // console.log(r)
        res.send(CircularJSON.stringify(r['data']))
    });

    
});  


module.exports = workRouter;
