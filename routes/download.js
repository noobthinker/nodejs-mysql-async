var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET users listing. */
router.get('/', function(req, res, next) {
    var file=fs.createReadStream('./public/doc.doc');
    res.writeHead(200, {
        'Content-Type': 'application/msword',
        'Content-Length': file.size
    });
    file.pipe(res);
});

module.exports = router;
