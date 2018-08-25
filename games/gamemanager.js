const labyrinth = require('./labyrinth.js')

var gameID = 0;
const gamesTable = ["None", "labyrinth"]
/**
0 = No Game
1 = Labyrinth
**/

module.exports.init = function(args, channel) {
  var game = args[0];
  switch(game.toLowerCase()) {
    case "labyrinth":
      gameID = 1;
      labyrinth.init(channel);
    break;
  }
}

module.exports.kill = function() {
  gameID = 0;
  labyrinth.kill();
}

module.exports.handlereact = function(reaction) {
  if(gameID != 0) {
    eval(gamesTable[gameID] + ".react(reaction)");
  }
}
