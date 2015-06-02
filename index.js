var exec = require('child_process').exec;
exec('node challenge1.js', function (error, stdout, stderr) {
    console.log("    Challenge1 output:");
    var challenge1 = stdout + stderr;
    console.log(challenge1);
    exec('node challenge2.js', function (error, stdout, stderr) {
        console.log("    Challenge2 output:");
        console.log(stdout + stderr);

    });
});

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
  response.send("Output:" + challenge1);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
})
