var express = require('express');
var checkout = express.Router();
const axios = require('axios');
const stripe = require('stripe')('sk_test_51Jvf6ISAiSWGvhs7pI6tU81T2QXVpnE79GjC4K5ay34ZDVWn7ZKu4GF454RluM1twn5rM2Oy9TYlxhdespSD4Z0000BtheGEiW');

const { randomBytes, createHash } = require('crypto')
const { MongoClient } = require('mongodb');
const { NotAcceptable } = require('http-errors');
const url = "mongodb+srv://swapnil:swapnil@swapnil.wfwy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'
 
checkout.post('*', async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = 'whsec_haDXLvt6iseDJ5CLqVGivf0cpzItOn8T';
  
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.get('Stripe-Signature');
        
      try {
        // console.log(signature)
        // console.log(req['rawBody'])
        // console.log(webhookSecret)
        event = stripe.webhooks.constructEvent(
          req['rawBody'],
          signature,
          webhookSecret
        );
        
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
      //console.log(data)

    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    //   console.log(data)
    }
  
    switch (eventType) {
      case 'checkout.session.completed':
          const customerId = data.object.customer;
        //   console.log("hello from mongo: " + customerId)
        const subscriptionId = data.object.subscription; 
        
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("google-top");
            const apiKey = randomBytes(16).toString('hex');
            const hashedKey =  createHash('sha256').update(apiKey).digest('hex');
            var myobj = { customerId: customerId, subscriptionId: subscriptionId, apiKey:hashedKey ,data: data};
      
            dbo.collection("customers").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
            
          }); 
        break;
      case 'invoice.paid':
        break;
      case 'invoice.payment_failed':
        break;
      default:
      // Unhandled event type
    }
  
    res.sendStatus(200);
  });

  module.exports = checkout;