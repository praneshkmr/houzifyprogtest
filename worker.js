var redisjobs = require('redis-jobs');
var queue = new redisjobs.Queue();

var worker = new redisjobs.Worker();

worker.on('job', function(job){
    var func = job.data.func ;
    var a = parseFloat(job.data.a) ;
    var b = parseFloat(job.data.b) ;
    var ret = {};
    setTimeout(function(){ //To simulate worst case processing time
        if (func == "add") {
            ret.status = "success";
            ret.result = a + b;
        }
        else if (func == "sub") {
            ret.status = "success";
            ret.result = a - b;
        }
        else if (func == "mul") {
            ret.status = "success";
            ret.result = a * b;
        }
        else if (func == "div") {
            if (b == 0) {
                ret.status = "error";
                ret.message  = "Cannot divide by Zero";
            }
            else{
                ret.status = "success";
                ret.result = a / b;
            }
        }
        else{
            ret.status = "error";
            ret.message  = "Unknown Function"
        }
        console.log(ret);
        job.reply(ret);
    },1000);
});

worker.listen();