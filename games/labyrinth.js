const gamelib = require('./gamelib.js');
const main = require('../index.js');
const jsonhandler = require('../json-handler.js');

var running = false;
var gMatrix;

var pX = 2;
var pY = 2;

var cX = 2;
var cY = 2;

module.exports.init = function(channel) {
  gMatrix = new gamelib.Matrix(channel);
  running = true;
  pX = Math.floor(Math.random() * 5);
  pY = Math.floor(Math.random() * 5);
  console.log(pX, pY);

  var found = false;

  while (!found) {
    cX = Math.floor(Math.random() * 5);
    cY = Math.floor(Math.random() * 5);
    console.log(cX, cY);

    if(cX != pX && cY != pY) {
      found = true;
    }
  }

  gMatrix.init(start);
}

function start() {
  gMatrix.msg.react("⏫")
    .then(function() {
      gMatrix.msg.react("⏬")
        .then(function() {
          gMatrix.msg.react("⏩")
            .then(function() {
                gMatrix.msg.react("⏪")
                  .then(function() {
                    setTimeout(loop, 1000);
                  });
            });
        });
    });
}

module.exports.react = function(reaction) {
  if(reaction.emoji.name == "⏫" && pY > 0) {
    pY--;
  }

  if(reaction.emoji.name == "⏬" && pY < 5) {
    pY++;
  }

  if(reaction.emoji.name == "⏩" && pX < 5) {
    pX++;
  }

  if(reaction.emoji.name == "⏪" && pX > 0) {
    pX--;
  }
}

function loop() {
  gMatrix.fill(0);
  if(pX == cX && pY == cY) {
    running = false;
    main.gameRunning = false;
    jsonhandler.getCatgirl(gMatrix.channel);
  }
  gMatrix.setPixel(pX, pY, 2);
  gMatrix.setPixel(cX, cY, 3);
  gMatrix.update();
  if(running)
    setTimeout(loop, 1500);
}

module.exports.kill = function() {
  if(running) {
    running = false;
  }
}
