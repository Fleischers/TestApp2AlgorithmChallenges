var consoleInput = process.argv[2];
var input = null;
if (consoleInput != null) {
    var input = consoleInput.split(":");
}
// Assume that on Input we have data with initial game info
// first line - firing range
// on each next line is bot name, start distance, speed
if (input == null) {
    input = [
        "50m",
        "BotA 100m 10m",
        "BotB 50m 20m",
        "BotC 30m 20m",
        // "BotD 120m 5m",
        // "BotE 150m 10m"
    ];
}


// parsing input to get set of Bot objects with its characteristics
var towerFiringRange = cutMeter(input[0]);
var botArray = new Array();
for (var i=1; i<input.length; i++) {
    botArray.push(parseInput(input[i]));
}

// start the game loop
console.log("Firing range is " + towerFiringRange + "m");

for (var turn = 1; botArray.length > 0; turn++) {
    //firing stage. find closest enemy to shoot
    var closest = null;
    var minIndex = 0;
    for (var j=0; j < botArray.length; j++) {
        if (closest === null || closest > botArray[j].distance ) {
            closest = botArray[j].distance;
            minIndex = j;
        }
    }
    if (towerFiringRange >= closest) {
        var dyingBot = botArray[minIndex];
        console.log("Turn " + turn + ": Kill "
            + dyingBot.name + " at " + dyingBot.distance + "m");
        // TODO: make data structure to delete array element more efficiently then .splice(), similar to LinkedList
        botArray.splice(minIndex, 1);
    }

    // move bots
    for (var i=0; i<botArray.length; i++) {
        botArray[i].distance -= botArray[i].speed;
        if (botArray[i].distance <= 0) {
            console.log("You lose when bots made their move!");
            return;
        }
    }

    if (botArray.length === 0) {
        console.log("You win in " + turn + " turns");
        return;
    }

}


// ===

function parseInput(i) {
    var lineArray = i.split(" ");
    return new Bot(lineArray[0], cutMeter(lineArray[1]), cutMeter(lineArray[2]));
}

function Bot(name, distance, speed, index) {
    if (distance <= 0) {
        throw new Error("Bot initial distance must be more then 0");
    }
    this.name = name;
    this.distance = distance;
    this.speed = speed;
    // this.alive = true;
}

function cutMeter(m) {
    return +m.slice(0, m.indexOf('m'));
}
