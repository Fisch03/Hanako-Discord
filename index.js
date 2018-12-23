const { Client, RichEmbed } = require('discord.js');
const self = new Client();

const commands = require('./bot/commands.js');
const gmanager = require('./bot/games/gamemanager.js');

var secrets;

try {
  secrets = require('./secrets.js');
} catch (ex) {
}

const prefix = "?";
module.exports.gameRunning = false;

self.on('ready', () => {
  console.log('Bot Online');
  self.user.setActivity('random Games', { type: 'PLAYING' })
});

self.on("message", message => {
  if(message.content === "Böser Bot" || message.content === "Böser bot" || message.content === "böser bot"){
     message.channel.send("Bad Human");
  };
  
  if(message.content.startsWith("Tschau") || message.content.startsWith("Tschüss") || message.content.startsWith("Bye") || message.content.startsWith("Bis später"){
     message.channel.send("Tschüss");
     }

  if(message.content.startsWith("Ich bin") || message.content.startsWith("ich bin") || message.content.startsWith("Ich Bin")) {
    var msg = message.content.toLowerCase();
    var name = msg.split("ich bin ");
    message.channel.send("Hallo " + name[1] + ", ich bin ein Bot");
  }

  var patt = new RegExp("nani");
  if (patt.test(message.content.toLowerCase)) {
    message.channel.send("Omae wa mou shindeiru");
  }

  if (message.content.startsWith(prefix) && message.author.username != self.user.username) {

    var msgarr = message.content.split(prefix);
    var msg = msgarr[1];
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
    if(user.username != self.user.username) {
      if(this.gameRunning) {
        gmanager.handlereact(reaction, user)
      }
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
