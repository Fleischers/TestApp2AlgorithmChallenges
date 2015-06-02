var exec = require('child_process').exec;

var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('port', (process.env.PORT || 3000));

app.get('/ch1', function(request, response) {
    response.writeHead(200, {"Content-Type":"text/html"});

    exec('node challenge1.js', function (error, stdout, stderr) {
        console.log("    Challenge1 output:");
        var challenge1 = stdout + stderr;
        console.log(challenge1);
        answer = challenge1.replace(/\n/g, "<br/>");
        response.end(answer);
    });
});
app.get('/ch2', function(request, response) {
    response.writeHead(200, {"Content-Type":"text/html"});

    exec('node challenge2.js', function (error, stdout, stderr) {
        console.log("    Challenge2 output:");
        var challenge2 = stdout + stderr;
        console.log(challenge2);
        answer = challenge2.replace(/\n/g, "<br/>");
        response.end(answer);

    });
});


app.post('/ch1',function(req,res){
  var message=req.body.message;
  console.log("message = "+message);
  res.end("200");
});
app.post('/ch2',function(req,res){
  var message=req.body.message;
  console.log("message = "+message);
  res.end("200");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
})
