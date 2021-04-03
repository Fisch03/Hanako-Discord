const gamelib = require('./gamelib.js');
const main = require('../../index.js');
const webhandler = require('../web-handler.js');

const skin = [":white_large_square:", ":black_large_square:", ":red_circle:", ":blue_circle:", ":cat:", ":large_blue_diamond:"];
const levels = [
  //LEVEL 0
  [
    [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0]
    ],  [0,0, 4,4]
  ],
  //LEVEL 1
  [
    [
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0]
    ],  [0,2, 4,2]
  ],
  //LEVEL 2
  [
    [
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0]
    ],  [4,4, 0,0]
  ],
  //LEVEL 3
  [
    [
      [1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 0]
    ],  [0,3, 1,4]
  ],
  //LEVEL 4
  [
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0]
    ],  [2,2, 0,4]
  ],
  //LEVEL 5
  [
    [
      [0, 0, 0, 0, 0],
      [1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ],  [4,0, 0,4]
  ]
];
let level;
let excludedlvls = [];

let running = false;
let gMatrix;
let gType = 0;

let pX = 2;
let pY = 2;

let cX = 2;
let cY = 2;

module.exports.init = function(channel, type, excluded) {

  excludedlvls = [];

  gMatrix = new gamelib.Matrix(channel, skin);
  if(type == "cat") {
    gType = 1;
  } else if(type == "cont" || type == 2) {
    gType = 2;
  } else {
    gType = 0;
  }

  running = true;

  level = Math.floor(Math.random() * levels.length);

  pX = levels[level][1][0];
  pY = levels[level][1][1];
  cX = levels[level][1][2];
  cY = levels[level][1][3];

  gMatrix.init(start);
}

function reinit() {
  running = true;

  let found = false;

  while (!found) {
    level = Math.floor(Math.random() * levels.length);
    if (!excludedlvls.includes(level)) {
      found = true;
    }
  }

  pX = levels[level][1][0];
  pY = levels[level][1][1];
  cX = levels[level][1][2];
  cY = levels[level][1][3];

  loop();
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
  if(reaction.emoji.name == "⏫" && pY > 0 && levels[level][0][pY-1][pX] != 1) {
    pY--;
  }

  if(reaction.emoji.name == "⏬" && pY < 4 && levels[level][0][pY+1][pX] != 1) {
    pY++;
  }

  if(reaction.emoji.name == "⏩" && pX < 4 && levels[level][0][pY][pX+1] != 1) {
    pX++;
  }

  if(reaction.emoji.name == "⏪" && pX > 0 && levels[level][0][pY][pX-1] != 1) {
    pX--;
  }
}

function loop() {
  for (row in levels[level][0]) {
    for (pixel in levels[level][0][row]) {
      gMatrix.setPixel(row, pixel, levels[level][0][pixel][row]);
    }
  }

  if(pX == cX && pY == cY) {
    running = false;
    main.gameRunning = false;
    if(gType == 0) {
      gMatrix.channel.send("You Won!");
    } else if(gType == 1) {
      webhandler.getRequest("https://nekos.life/api/neko")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xff00e5)
            .setDescription("Random catgirl from [nekos.life](https://nekos.life/)");
          embed.setImage(json.neko);
          gMatrix.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
    } else {
      excludedlvls.push(level);
      if(excludedlvls.length >= levels.length) {
        gMatrix.channel.send("You Won!");
      } else {
        main.gameRunning = true;
        reinit();
      }
    }
  }
  gMatrix.setPixel(pX, pY, 2);
  gMatrix.setPixel(cX, cY, gType + 3);
  gMatrix.update();
  if(running)
    setTimeout(loop, 2000);
}

module.exports.kill = function() {
  if(running) {
    running = false;
  }
}
