var exec = require('child_process').exec;

var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('port', (process.env.PORT || 3000));

app.post('/ch1',function(req,res){
  var message=req.body.message;
  message = message.trim();
  var array = message.replace(/\n/g, ":");
  console.log("message = " + array);
  exec('node challenge1.js ' + "\"" + array + "\"" , function (error, stdout, stderr) {
      console.log("    Challenge1 output:");
      var challenge1 = stdout + stderr;
      console.log(challenge1);
      answer = challenge1.replace(/\n/g, "<br/>");
      res.end(answer);
  });
});
app.post('/ch2',function(req,res){
  var message=req.body.message;
  message = message.trim();
  var array = message.replace(/\n/g, ":");
  console.log("message = "+array);
  exec('node challenge2.js ' + "\"" + array + "\"" , function (error, stdout, stderr) {
      console.log("    Challenge2 output:");
      var challenge2 = stdout + stderr;
      console.log(challenge2);
      answer = challenge2.replace(/\n/g, "<br/>");
      res.end(answer);

  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
})
