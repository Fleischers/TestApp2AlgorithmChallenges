var IntervalTree = require('interval-tree');

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
if (areaX < rectX || areaY < rectY || areaX <= 0 || areaY <=0 ) {
    console.log("Please check input area and rectangle settings, it should be more then zero and rectangle cannot be greater then area size");
}

var pointArray = new Array();
for (var i=1; i<input.length; i++) {
    var line = input[i].split(" ");
    pointArray.push(new Point(line[0], line[1], i-1));
}

console.log(pointArray);

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
var itree = new IntervalTree(((maxX+minX)/2)+1);
var itreeH= new IntervalTree(((maxY+minY)/2)+1);
// itree.add([0, rectX]);
var previousX = null;
for (var i = 0, len = pointArray.length; i < len; i++) {
    var x = pointArray[i].x;
    var y = pointArray[i].y
    // if ((x - rectX) >= 0) {
        var up = y;
        var down = y+rectY;
    // } else {
    //     var left = 0;
    //     var right = x+1;
    // }
    itree.add([up,down,pointArray[i]], i);
    if (previousX !== null) {
        var search = itree.search(pointArray[i].x);
        search.forEach(function(result) {
            itreeH.add(result.data);
        });
    } else {
        previousX = x;
    }

}
console.log(itreeH);




function Point(x,y,id) {
    this.x = +x;
    this.y = +y;
    this.id = id;
    // toString = function () {
    //     return "{" + this.x + "," + this.y + "}";
    // }
}
