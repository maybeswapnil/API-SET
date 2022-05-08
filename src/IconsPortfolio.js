var express = require('express');
var iconsRouter = express.Router();


iconsRouter.get('*', function(req, res) {
    var data = [
        {
          url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg',
          name: 'Express'
        },
        {
          url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
          name: 'NodeJS'
        },
        {
          url: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
          name: 'Postman'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
          name: 'Dart'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          name: 'HTML'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg',
          name: 'CSS'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg',
          name: 'Bootstrap'
        },
        {
          url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
          name: 'Redux'
        },
        {
          url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
          name: 'Sass'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
          name: 'Javascript'
        },
        {
          url: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
          name: 'Tailwind CSS'
        },
        {
          url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
          name: 'React'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg',
          name: 'MySQl'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg',
          name: 'Mongo DB'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg',
          name: 'Heroku'
        },
        {
          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg',
          name: 'Git'
        }
      ];
    res.send(data)
});  

module.exports = iconsRouter;