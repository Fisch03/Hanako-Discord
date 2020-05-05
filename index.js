const { Client, RichEmbed } = require("discord.js");
const self = new Client();

const commands = require("./bot/commands.js");
const gmanager = require("./bot/games/gamemanager.js");

const express = require("express");
const request = require('request');

var customHeaderRequest = request.defaults({
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0'}
})
const app = express();

var secrets;

try {
  secrets = require("./secrets.js");
} catch (ex) {
  console.log("secrets.js could not be found, using process.env");
}

const prefix = "?";
module.exports.gameRunning = false;

self.on("ready", () => {
  console.log("Bot is now online");
  self.user.setActivity("my Reddit feed", { type: "WATCHING" });
   //console.log(self.emojis);
  //701169359099265095 - message id / 453989193106849807 - channel id / 453989193106849805 - server id / 454608856631345155 - emoji id
  /*customHeaderRequest.post(
        'https://verylegit.link/sketchify',
        { json: { long_url: 'https://www.duckduckgo.com' } },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
              //msg.channel.send(body);
              console.log(body);
          } else {
              //msg.channel.send("I'm sorry, but an error occured. Please try again!");
              console.log("Error: " + error + "\nResponse: " + response + "\nBody: " + body);
          }
        }
      );*/
});

self.on("message", message => {
  //message.react("487661051513667585");
  //message.channel.send("<:sral:690281826090090546>");


    
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    var msg = message.content.substring(1);
    var args = msg.split(" ");
    var cmd = args.shift();

    if (!this.gameRunning) {
      if (commands.commands[cmd]) {
        commands.commands[cmd].onCall(message, args);
      }
    } else if (cmd === "stop") {
      this.gameRunning = false;
      gmanager.kill();
      message.channel.send("Game stopped.");
    }
  }
});

self.on("messageReactionAdd", (reaction, user) => {
  if (this.gameRunning) {
    gmanager.handlereact(reaction, user);
  }
});

module.exports.sendMsg = function(content, channel) {
  channel.send(content);
};

if (process.env.TOKEN) {
  self.login(process.env.TOKEN);
} else {
  self.login(secrets.getToken());
}

//Actually show the Webpage
app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
