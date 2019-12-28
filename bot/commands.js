const main = require('../index.js');

const help = require('./help.js');
const embeds = require('./embeds.js');
const games = require('./games/gamemanager.js');
const jsonhandler = require('./json-handler.js');

const { RichEmbed } = require('discord.js');

const { fetchSubreddit, fetchRandomSubredditName } = require('fetch-subreddit');

module.exports.commands = {
  /**
  FUN
  **/
  "ping": {
    type:"Fun",
    usage:"ping",
    description:"Do you really need an explanation for this one?",
    onCall: function(msg) {
      msg.channel.send("Pong!")
    }
  },
  "howgay": {
    type:"Fun",
    usage:"howgay [name]",
    description: "Get a random percentage for how Gay the User is",
    onCall: function(msg, args) {
      var value = Math.floor(Math.random() * 101);
      var name = args[0];
      msg.channel.send(`${name} is ${value}% gay :gay_pride_flag:`);
    }
  },
  "ratewaifu": {
    type:"Fun",
    usage:"ratewaifu [name]",
    description:"Get a random rating for how much of a Waifu the User is",
    onCall: function(msg, args) {
      var value = Math.floor(Math.random() * 11);
      var name = args[0];
      msg.channel.send(`${name} is a ${value}/10 Waifu`)
    }
  },
  "catgirl": {
    type:"Fun",
    usage:"catgirl",
    description:"Fetch a random Catgirl Image from nekos.life",
    onCall: function(msg) {
      var embed = jsonhandler.getCatgirl();
      msg.channel.send(embed)
    }
  },
  "lewdcatgirl": {
    type:"Fun",
    usage:"lewdcatgirl",
    description:"Fetch a random LewdCatgirl Image from nekos.life (NSFW, obviously)",
    onCall: function(msg) {
      if (msg.channel.nsfw) {
        jsonhandler.getLewdCatgirl(channel);
      } else {
        msg.channel.send(":warning: Channel must be marked as NSFW");
      }
    }
  },
  "cat": {
    type:"Fun",
    usage:"cat",
    description:"Fetch a random Cat Image from aws.random.cat",
    onCall: function(msg) {
      var embed = jsonhandler.getCatgirl();
      msg.channel.send(embed)
    }
  },
  "lenny": {
    type:"Fun",
    usage:"lenny",
    description:"Send a Lenny Face back",
    onCall: function(msg) {
      msg.channel.send("( ͡° ͜ʖ ͡°)")
    }
  },
  "rlenny": {
    type:"Fun",
    usage:"rlenny",
    description:"Send a random Lenny Face back",
    onCall: function(msg) {
      var lennyarr = ["( ͡° ͜ʖ ͡°)","(づ ◔ ͜ʖ ◔ )づ","(╭☞ ・ ͜つ ・ )╭☞","( ◕ ᗜ ◕ )","⤜( ʘ _ ʘ )⤏","ಠ _ ಠ","( ⌐■ _ ■ )","ʢ ◉ ᴥ ◉ ʡ",
                      "(ᴗ ͜ʖ ᴗ)","(⟃ ͜ʖ ⟄)","( ‾ ʖ̫ ‾)","(͠≖ ͜ʖ͠≖)","( ͡° ʖ̯ ͡°)","ʕ ͡° ʖ̯ ͡°ʔ","( ͡° ل͜ ͡°)","( ͠° ͟ʖ ͡°)","( ͠° ͟ʖ ͠°)","( ͡~ ͜ʖ ͡°)",
                      "( ͡o ͜ʖ ͡o)","( ͡◉ ͜ʖ ͡◉)","( ͡☉ ͜ʖ ͡☉)","( ͡° ͜V ͡°)","ʕ ͡° ͜ʖ ͡°ʔ","( ͡ᵔ ͜ʖ ͡ᵔ )","( ͡° ͜ʖ ͡ °)","(☭ ͜ʖ ☭)","(=^-ω-^=)"];
      var value = Math.floor(Math.random() * (lennyarr.length + 1));
      msg.channel.send(lennyarr[value]);
    }
  },

  /**
  GAMES
  **/
  "rps": {
    type:"Games",
    usage:"rps [Rock/Paper/Scissors]",
    description:"Play Rock-Paper-Scissors against the bot",
    onCall: function(msg, args) {
      var answers = ["rock","paper","scissors"];
      var value = Math.floor(Math.random() * 3);
      var bchoice = answers[value].toLowerCase();
      var pchoice = args[0].toLowerCase();

      var result = `Your choice: ${args[0]}, my choice: ${answers[value]} \n`;

      if (bchoice === pchoice)
        result += "Draw!";

      if(bchoice == "rock") {
        if(pchoice == "paper")
          result += "You win!";
        if(pchoice == "scissors")
          result += "You lose!";
      } else if(bchoice == "paper") {
        if(pchoice == "scissors")
          result += "You win!";
        if(pchoice == "rock")
          result += "You lose!";
      } else {
        if(pchoice == "rock")
          result += "You win!";
        if(pchoice == "paper")
          result += "You lose!";
      }

      msg.channel.send(result)
    }
  },
  "gamestart":{
    type:"Games",
    usage:"startgame [Name of game] [Additional options]",
    description:"Starts an interactive game. Exit with the \"stop\" command. For a list of games use the \"gamelist\" command",
    onCall: function(msg, args) {
      games.init(args, msg.channel);
      main.gameRunning = true;
    }
  },

  /**
  REDDIT
  **/
  "sub":{
    type:"Social",
    usage:"sub [Name of subreddit] [Number of posts]",
    description:"Fetch the top posts of a specific subreddit",
    onCall: function(msg, args) {
      var content = "";
      fetchSubreddit(args[0].toLowerCase())
        .then(function (urls) {
          content = jsonhandler.RedditJSON(urls[0], args[1]); //We use "urls[0]" because fetchSubreddit returns the JSON object within an 1-element-array
          msg.channel.send(content);
        })
        .catch((err) => console.error(err));
    }
  },
  "rsub":{
    type:"Social",
    usage:"rsub [Number of posts]",
    description:"Fetch the top posts of a random subreddit",
    onCall: function(msg, args) {
      var subnamestr;
      var subname = "";
      var content = "";
      fetchRandomSubredditName(1)
        .then(function (subreddits) {
          subnamestr = JSON.stringify(subreddits, null, 2);;
          subnamestr = subnamestr.split('"name": "');
          subnamestr = subnamestr[1].split("/");
          subname = subnamestr[0];
        })
        .then(function() {
          fetchSubreddit(subname.toLowerCase())
            .then(function (urls) {
              content = jsonhandler.RedditJSON(urls[0], args[0]); //We use "urls[0]" because fetchSubreddit returns the JSON object within an 1-element-array
              msg.channel.send(embeds.RedditEmbed(subname, content, args[0]));
            })
          .catch((err) => console.error(err))
        .catch((err) => console.error(err));
      })
    }
  },

  /**
  HELP
  **/
  "help":{
    type:"Help",
    usage:"help / help [command]",
    description:"You literally just used this command... What more do you want?",
    onCall: function(msg, args) {
      help.help(msg, args); //Code cant be executed here because we need access to all commands
    }
  },

  /**
  INFORMATION
  **/
  "github":{
    type:"Botinfo",
    usage:"github",
    description:"Get a link to the GitHub repository of this bot",
    onCall: function(msg) {
      msg.channel.send("GitHub Repository: https://github.com/Fisch03/Hanako-Discord")
    }
  },
  "discord": {
    type:"Botinfo",
	usage:"discord",
	description:"Sends the invite link for the official Hanako Discord server.",
	onCall: function(msg) {
	  msg.channel.send("https://discord.gg/8fGVDAs");
	}
  },
}
