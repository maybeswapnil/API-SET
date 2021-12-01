var express = require('express');
var registerRouter = express.Router();
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


registerRouter.post('*', function(req, res, next) {
    var request = req.params;
    request = request["0"].split('/')[1];
    console.log(req.body)
    var responsesuc = {
        "success": "email and message added to db",
        "message": {
            "string": "added to mongo kongo"
        }
    }

    
    response = {
        "error": "bad request-server failure",
        "message": {
            "string": "error"
        }
    }

        try {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Reset");
                
                try {
                    dbo.collection("register").insertOne(req.body, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                      });
                } catch(e) {
                    res.header(500)
                    res.send(response)
                }
              }); 
            } catch(e) {
                res.header(500)
                res.send(response)
            }

    res.send(responsesuc)
    
});  


module.exports = registerRouter;
