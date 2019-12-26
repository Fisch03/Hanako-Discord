const { Client, RichEmbed } = require('discord.js');
const self = new Client();

const commands = require('./bot/commands.js');
const gmanager = require('./bot/games/gamemanager.js');

const express = require('express');
const app = express();

var secrets;

try {
  secrets = require('./secrets.js');
} catch (ex) {
  console.log("secrets.js wurde nicht gefunden, nutze process.env")
}

const prefix = "?";
module.exports.gameRunning = false;

self.on('ready', () => {
  console.log('Bot Online');
  self.user.setActivity('random Games', { type: 'PLAYING' })
});

self.on("message", message => {

  if(message.author.bot)
    return;

  if(message.content.startsWith("Ich bin") || message.content.startsWith("ich bin") || message.content.startsWith("Ich Bin")) {
    var msg = message.content.toLowerCase();
    var name = msg.split("ich bin ");
    message.channel.send("Hallo " + name[1] + ", ich bin Hanako ><"); 
  }

  if (message.content.startsWith(prefix)) {
    var msg = msg.content.substring(1);
    var args = msg.split(" ");
    var cmd = args.shift();

    if(!this.gameRunning) {
      commands.getActionByCommand(cmd, args, message.channel);
    } else if(cmd === "stop") {
      this.gameRunning = false;
      gmanager.kill();
      message.channel.send("Spiel gestoppt.");
    }
  }
});

self.on('messageReactionAdd', (reaction, user) => {
  if(message.author.bot)
    return;

  if(this.gameRunning) {
    gmanager.handlereact(reaction, user)
  }
});

module.exports.sendMsg = function(content, channel) {
  channel.send(content);
}

if (process.env.TOKEN != null) {
  self.login(process.env.TOKEN);
} else {
  self.login(secrets.getToken());
}

//Actually show the Webpage
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
