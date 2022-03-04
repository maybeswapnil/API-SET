var express = require('express');
var infoRouter = express.Router();
const axios = require('axios');
const { MongoClient } = require('mongodb');

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'

const url = "mongodb+srv://swapnil:swapnil@swapnil.wfwy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var response = {
    "error": "internal server failure",
    "message": {
        "string": "error"
    }
}


infoRouter.get('*', function(req, res, next) {
    var request = req.params;
    request = request["0"].split('/')[1];
    console.log(req.body)
    var responsesuc = {
        "author": "swapnil sharma",
        "version": "1.2",
        "message": {
            "string": "hey! greate seeing you here"
        }
    }

    
    res.send(responsesuc)
    
});  


module.exports = infoRouter;
