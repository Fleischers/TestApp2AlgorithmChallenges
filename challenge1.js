
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
var firstLine = input[0].split(",");
var area = firstLine[0].split(" ");
var rect = firstLine[1].split(" ");

var areaX = Number(area[0]), areaY = Number(area[1]);
var rectX = Number(rect[0]), rectY = Number(rect[1]);

var pointArray = new Array();
for (var i=1; i<input.length; i++) {
    var line = input[i].split(" ");
    pointArray.push(new Point(line[0], line[1]));
}

console.log(pointArray);

var maxX = null, minX = null;
var maxY = null, minY = null;
for (var i=0; i<pointArray.length; i++) {
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

console.log(minX + " " + maxX);
console.log(minY + " " + maxY);

var Structure = [];

function Point(x,y) {
    this.x = +x;
    this.y = +y;
}

function Interval(data, id, s, e) {
  this.id     = id;
  this.start  = data[s];
  this.end    = data[e];
  this.data   = data;


}

function addInterval(i) {
    Structure.push(new Point (i.start, i.end));
}
