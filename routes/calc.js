var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    if (req.query.func && req.query.a && req.query.b) {
        var func = req.query.func;
        var a = req.query.a;
        var b = req.query.b;
        console.log(func,a,b);
        res.send(200);
    }
    else{
        res.send(400);
    }
});

module.exports = router;
