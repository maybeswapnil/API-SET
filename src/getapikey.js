var express = require('express');
var getapikey = express.Router();
const axios = require('axios');
const stripe = require('stripe')('sk_test_51Jvf6ISAiSWGvhs7pI6tU81T2QXVpnE79GjC4K5ay34ZDVWn7ZKu4GF454RluM1twn5rM2Oy9TYlxhdespSD4Z0000BtheGEiW');
const { MongoClient } = require('mongodb');

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'
const url = "mongodb+srv://swapnil:swapnil@swapnil.wfwy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 
getapikey.get('*', async(req, res) => {
    var ses = req.url.split('session_id=')[1];
    // console.log(req.url)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("google-top");
        var obj = {}
        console.log(obj)
        var a = dbo.collection("customers").findOne(obj, function(err, result) {
            if(err) throw err;
            console.log(result)
            res.send(result)
            db.close();
        });
        // var ary = []
        // res.send(a)
      });
});

module.exports = getapikey;