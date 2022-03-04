const express = require('express');
var csvtojsonRouter = express.Router();

csvtojsonRouter.post('*', (req, res) => {
    const data = req.body.data;
    var lines  = data.split('\n')
    var headers = lines[0].split('\t')
    var j = {};
    var obj = {};
    var count = 0;
    console.log(new Date() + ' ' + headers + ' found')

    lines.map((item, index) => {
        if(index!==0) {
            const values = item.split('\t');
            var obj = {};
            for(var i = 0;i<headers.length;i++) {
                obj[headers[i]] = values[i];
            }
            j[count] = obj
            count++;
        }
    })

    res.send(j)
})


module.exports = csvtojsonRouter;