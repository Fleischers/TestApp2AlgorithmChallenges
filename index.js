var exec = require('child_process').exec;
exec('node challenge1.js', function (error, stdout, stderr) {
    console.log("    Challenge1 output:");
    console.log(stdout + stderr);
    exec('node challenge2.js', function (error, stdout, stderr) {
        console.log("    Challenge2 output:");
        console.log(stdout + stderr);

    });
});
