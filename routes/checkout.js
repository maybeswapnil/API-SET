var express = require('express');
var checkout = express.Router();
const axios = require('axios');
const stripe = require('stripe')('sk_test_51Jvf6ISAiSWGvhs7pI6tU81T2QXVpnE79GjC4K5ay34ZDVWn7ZKu4GF454RluM1twn5rM2Oy9TYlxhdespSD4Z0000BtheGEiW');

axios.defaults.headers.common['content-type'] = 'application/json; charset=UTF-8'
 
checkout.post('*', async(req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode : 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1JvfFESAiSWGvhs7VYCfUlhK',
            }
        ],
        success_url: 'http://localhost:3000/getapikey?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/getapikey?session_id={CHECKOUT_SESSION_ID}'
    })
    res.send(session)
});


module.exports = checkout;
