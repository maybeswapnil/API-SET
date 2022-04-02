const express = require('express');
var gamification_user = express.Router()

var users = [{
    name: 'abc',
    points: 2
},
{
    name: 'abc',
    points: 2
}]

gamification_user.get('*', (req, res) => {
    res.json(users)
})


module.exports = gamification_user;