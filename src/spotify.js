var express = require('express');
var spotifyRouter = express.Router();
const axios = require('axios');
require('dotenv').config({ path: './credentials.env' })

//Local variable from Spotify
var SPOTIFY_CLIENT_ID=process.env.SPOTIFY_CLIENT_ID
var SPOTIFY_SECRET_ID= process.env.SPOTIFY_SECRET_ID
var SPOTIFY_REFRESH_TOKEN= process.env.SPOTIFY_REFRESH_TOKEN
var SPOTIFY_URL_REFRESH_TOKEN= process.env.SPOTIFY_URL_REFRESH_TOKEN
var SPOTIFY_URL_NOW_PLAYING= process.env.SPOTIFY_URL_NOW_PLAYING

//Function to fetch the Spotify refresh token
const fetchRefreshToken = async () => {
    let form = {
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
    }
    let config = {
        method: 'post',
        url: SPOTIFY_URL_REFRESH_TOKEN + `?grant_type=refresh_token&refresh_token=${SPOTIFY_REFRESH_TOKEN}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_SECRET_ID).toString('base64'))
        },
        body : form,
        json: true
    };
    return await axios(config)
}
//Convert content into more readable format
const beautifyContent = (response) => {
    response.album.available_markets = {}
    response.available_markets = {}
    return response;
}
//GET Request: Fetched now playing
spotifyRouter.get('/', function(req, res, next) {
    let response;
    try {
       fetchRefreshToken().then((result) => {
            let ACCESS_TOKEN = result.data.access_token
            let config = {
                method: 'get',
                url: SPOTIFY_URL_NOW_PLAYING,
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            };
            axios(config).then(async(response) => {
                console.log(response.data)
                var responseError = {
                    "error": "User Away",
                    "message": {
                        "string": "error"
                    }
                }                
                if(response.data.length===0) return res.status(404).json(responseError)
                res.status(200).json(beautifyContent(await response.data.item))
            }).catch((e) => {
                console.log(e)
                var responseError = {
                    "error": "User Away",
                    "message": {
                        "string": e
                    }
                }                
                if(response.data.length===0) return res.status(500).json(responseError)
            })
            
       }).catch((err) => {console.log(err)})
    }catch(e) {
        response = {
            "error": "server failure",
            "message": {
                "string": "error"
            }
        }
        res.send(response)
    }   
});  


module.exports = spotifyRouter;