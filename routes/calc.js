var express = require('express');
var router = express.Router();

var redisjobs = require('redis-jobs');
var queue = new redisjobs.Queue();

router.get('/', function(req, res) {
    if (req.query.func && req.query.a && req.query.b) {
        var func = req.query.func;
        var a = req.query.a;
        var b = req.query.b;
        var job = queue.createJob({ func : func , a : a , b : b });
        job.on('timeout', function(){
            res.send({ status : "error" , message : "Request Timed Out"});
        });
        job.on('reply', function(result){
            res.send(result);
        });
        job.start();
    }
    else{
        res.send(400);
    }
});

module.exports = router;
