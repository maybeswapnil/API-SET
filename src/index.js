var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({  title: 'my-api',
              author: 'swapnil',
              email:'swapnil.sharma1998@gmail.com',
              build: {
                "name": "my-apis",
                "version": "0.0.0",
                "private": true,
                "scripts": {
                  "start": "node app.js",
                  "build": "babel src --out-dir lib"
                },
                "dependencies": {
                  "axios": "^0.24.0",
                  "body-parser": "^1.19.0",
                  "cookie-parser": "~1.4.4",
                  "cors": "^2.8.5",
                  "crypto": "^1.0.1",
                  "debug": "~2.6.9",
                  "express": "~4.16.1",
                  "http-errors": "~1.6.3",
                  "jade": "~1.11.0",
                  "mongodb": "^4.1.4",
                  "morgan": "~1.9.1",
                  "stripe": "^8.188.0"
                },
                "devDependencies": {
                  "@babel/cli": "^7.16.0",
                  "@babel/core": "^7.16.0",
                  "babel-install": "2.1.0"
                }
              }
            
          });
});

module.exports = router;
