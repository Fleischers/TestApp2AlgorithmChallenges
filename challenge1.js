// var IntervalTree = require('interval-tree');
var rbush = require('rbush');

// Let us assume we have array as input
var input = [
    "6 4, 2 1",
    "0 0",
    "0 2",
    "1 2",
    "3 0",
    "4 3",
];

//parsing input
var firstLine = input[0].split(", ");
var area = firstLine[0].split(" ");
var rect = firstLine[1].split(" ");

var areaX = Number(area[0]), areaY = Number(area[1]);
var rectX = Number(rect[0]), rectY = Number(rect[1]);
console.log(areaX + " " + areaY + ", " + rectX + " " + rectY);
if (areaX < rectX || areaY < rectY || areaX <= 0 || areaY <=0 ) {
    console.log("Please check input area and rectangle settings, it should be more then zero and rectangle cannot be greater then area size");
}

var pointArray = new Array();
for (var i=1; i<input.length; i++) {
    var line = input[i].split(" ");
    pointArray.push(new Point(line[0], line[1], i-1));
}

// console.log(pointArray);

var maxX = null, minX = null;
var maxY = null, minY = null;
for (var i=0, len=pointArray.length; i<len; i++) {
    if (maxX === null || maxX < pointArray[i].x) {
        maxX = pointArray[i].x;
    }
    if (minX === null || minX > pointArray[i].x) {
        minX = pointArray[i].x;
    }
    if (maxY === null || maxY < pointArray[i].y) {
        maxY = pointArray[i].y;
    }
    if (minY === null || minY > pointArray[i].y) {
        minY = pointArray[i].y;
    }
}

// add interval data
var tree = rbush(pointArray.length);
var maxResult = null;

for (var i = 0, len = pointArray.length; i < len; i++) {
    var x = pointArray[i].x;
    var y = pointArray[i].y;
    var bx, by;
    if (x+rectX > areaX) {
        bx = areaX -1;
    } else {
        bx = x+rectX -1;
    }
    if (y+rectY > areaY) {
        by = areaY -1;
    } else {
        by = y+rectY -1;
    }

    var item = [x, y, bx, by];
    tree.id = i;
    tree.insert(item);

    var result = tree.search([x,y,x,y]);
    if (maxResult === null || result.length > maxResult.length) {
        maxResult = result;
    }
}
// console.log(tree.all());
// console.log(maxResult);
console.log(maxResult[0][0] + " " + maxResult[0][1] + ", " + maxResult.length);


function Point(x,y,id) {
    this.x = +x;
    this.y = +y;
    this.id = id;
    // toString = function () {
    //     return "{" + this.x + "," + this.y + "}";
    // }
}
