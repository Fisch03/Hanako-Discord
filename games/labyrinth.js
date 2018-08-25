const gamelib = require('./gamelib.js');

var running = false;
var gMatrix;

var pX = 2;
var pY = 2;

module.exports.init = function(channel) {
  gMatrix = new gamelib.Matrix(channel);
  gMatrix.init(start);
  running = true;
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
  gMatrix.setPixel(pX, pY, 2);
  gMatrix.update();
  if(running)
    setTimeout(loop, 1500);
}

module.exports.kill = function() {
  if(running) {
    running = false;
  }
}
