const main = require("../index.js");

const help = require("./help.js");
const embeds = require("./embeds.js");
const games = require("./games/gamemanager.js");
const jsonhandler = require("./json-handler.js");
const owo = require("./commands.js");
const ytdl = require("ytdl-core");

const { RichEmbed } = require("discord.js");

const { fetchSubreddit, fetchRandomSubredditName } = require("fetch-subreddit");

const request = require("request");

var customHeaderRequest = request.defaults({});

var playing = false;

module.exports.commands = {
  /**
  FUN
  **/
  ping: {
    type: "Fun",
    usage: "ping",
    description: "Do you really need an explanation for this one?",
    onCall: function(msg) {
      msg.channel.send("Pong!");
    }
  },
  howgay: {
    type: "Fun",
    usage: "howgay [name]",
    description: "Get a random percentage for how Gay the User is",
    onCall: function(msg, args) {
      var value = Math.floor(Math.random() * 101);
      var name = args[0];
      msg.channel.send(`${name} is ${value}% gay :gay_pride_flag:`);
    }
  },
  ratewaifu: {
    type:"Fun",
    usage:"ratewaifu [name]",
    description:"Get a random rating for how much of a Waifu the User is",
    onCall: function(msg, args) {
      var value = Math.floor(Math.random() * 11);
      var name = args[0];
      msg.channel.send(`${name} is a ${value}/10 Waifu`);
    }
  },
  catgirl: {
    type: "Fun",
    usage: "catgirl",
    description: "Fetch a random Catgirl Image from nekos.life",
    onCall: function(msg) {
      jsonhandler.getCatgirl(msg.channel, main.sendMsg);
    }
  },
  lewdcatgirl: {
    type: "Fun",
    usage: "lewdcatgirl",
    description:
      "Fetch a random LewdCatgirl Image from nekos.life (NSFW, obviously)",
    onCall: function(msg) {
      if (msg.channel.nsfw) {
        jsonhandler.getLewdCatgirl(msg.channel, main.sendMsg);
      } else {
        msg.channel.send(":warning: Channel must be marked as NSFW");
      }
    }
  },
  playsong: {
    type: "Music",
    usage: "playsong [youtube url]",
    description:
      "Play a song in the voice channel you are currently in. (HIGHLY EXPERIMENTAL!)",
    onCall: function(msg, args) {
      /*const streamOptions = { seek: 0, volume: 1 };
      var voiceChannel = msg.member.voiceChannel;
      voiceChannel
        .join()
        .then(connection => {
          msg.channel.send("OK");
          const stream = ytdl("https://www.youtube.com/watch?v=dwDns8x3Jb4", {
            filter: "audioonly"
          });
          const dispatcher = connection.playStream(stream, streamOptions);
          dispatcher.on("end", end => {
            msg.channel.send("Song ended");
            voiceChannel.leave();
          });
        })
        .catch(err => msg.channel.send(err));*/
              var chan = msg.channel;

      if (!playing) {
        playing = true;

        msg.member.voice.channel.join().then(connection => {
          chan.send("Playing song now! *happy uwu*");

          connection
            .play(ytdl(args[0], { quality: "highestaudio", volume: 600 }))
            // When no packets left to send, leave the channel.
            .on("end", () => {
              playing = false;
              chan.send("song ended *sad uwu*");
              connection.channel.leave();
              owo.commands["sral"].onChannel(msg);
            });
          // Handle error without crashing the app.
          //.catch(console.error);
        });
        //.catch(console.error);
      } else {
        chan.send("Samyo-senpai says no");
        chan.send(embeds.SralEmbed());
        //msg.delete();
      }
    }
  },
  sral: {
    type: "Music",
    usage: "sral",
    description: "Song ended sad uwu",
    onCall: function(msg) {
      owo.commands["playsong"].onCall(msg, [
        "https://www.youtube.com/watch?v=P8kVauBznTI"
      ]);
      //this.commands.playsong.onCall(msg, ["https://www.youtube.com/watch?v=P8kVauBznTI"]);
    }
  },
  leavechannel: {
    type: "Music",
    usage: "leavechannel",
    description: "LEAVE THE FUCKING VOICE CHANNEL HANAKO",
    onCall: function(msg) {
      msg.member.voice.channel.leave();
      playing = false;
    }
  },
  cat: {
    type: "Fun",
    usage: "cat",
    description: "Fetch a random Cat Image from random.cat",
    onCall: function(msg) {
      jsonhandler.getCat(msg.channel, main.sendMsg);
    }
  },
  lenny: {
    type: "Fun",
    usage: "lenny",
    description: "Send a Lenny Face back",
    onCall: function(msg) {
      msg.channel.send("( ͡° ͜ʖ ͡°)");
    }
  },
  samyoproxy: {
    type: "Fun",
    usage: "samyoproxy [URL]",
    description: "hide a link",
    onCall: function(msg, args) {
      var url = args[0];
      customHeaderRequest.post(
        "https://proxy.samyo.wtf/expanddong",
        { json: { longurl: url } },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            msg.channel.send(body);
          } else {
            msg.channel.send(
              "I'm sorry, but an error occured. Please try again!"
            );
            console.log(
              "Error: " + error + "\nResponse: " + response + "\nBody: " + body
            );
            msg.channel.send(
              "Error: " + error + "\nResponse: " + response + "\nBody: " + body
            );
          }
        }
      );
    }
  },
  hello: {
    type: "Fun",
    usage: "hello",
    description: "Hello",
    onCall: function(msg) {
      msg.channel.send("Hello! How are you?");
    }
  },
  rlenny: {
    type: "Fun",
    usage: "rlenny",
    description: "Send a random Lenny Face back",
    onCall: function(msg) {
      var lennyarr = [
        "( ͡° ͜ʖ ͡°)",
        "(づ ◔ ͜ʖ ◔ )づ",
        "(╭☞ ・ ͜つ ・ )╭☞",
        "( ◕ ᗜ ◕ )",
        "⤜( ʘ _ ʘ )⤏",
        "ಠ _ ಠ",
        "( ⌐■ _ ■ )",
        "ʢ ◉ ᴥ ◉ ʡ",
        "(ᴗ ͜ʖ ᴗ)",
        "(⟃ ͜ʖ ⟄)",
        "( ‾ ʖ̫ ‾)",
        "(͠≖ ͜ʖ͠≖)",
        "( ͡° ʖ̯ ͡°)",
        "ʕ ͡° ʖ̯ ͡°ʔ",
        "( ͡° ل͜ ͡°)",
        "( ͠° ͟ʖ ͡°)",
        "( ͠° ͟ʖ ͠°)",
        "( ͡~ ͜ʖ ͡°)",
        "( ͡o ͜ʖ ͡o)",
        "( ͡◉ ͜ʖ ͡◉)",
        "( ͡☉ ͜ʖ ͡☉)",
        "( ͡° ͜V ͡°)",
        "ʕ ͡° ͜ʖ ͡°ʔ",
        "( ͡ᵔ ͜ʖ ͡ᵔ )",
        "( ͡° ͜ʖ ͡ °)",
        "(☭ ͜ʖ ☭)",
        "(=^-ω-^=)"
      ];
      var value = Math.floor(Math.random() * (lennyarr.length + 1));
      msg.channel.send(lennyarr[value]);
    }
  },
  ask: {
    type: "Fun",
    usage: "ask [yes/no question]",
    description: "Get an answer to your question",
    onCall: function(msg, args) {
      if (!args[0] || args[0] == "") {
        msg.channel.send("You have to ask something!");
      } else {
        var responses = [
          "Yes",
          "No",
          "Why?",
          "Not sure",
          "Ask me later",
          "Shutting down",
          "You are funny",
          "Shut up!"
        ];
        var value = Math.floor(Math.random() * responses.length);
        if (args[0] == "ban" && args[1] == "fisch03") {
          msg.channel.send("Yes");
        } else if (args[0] == "ban" && args[1] == "@everyone") {
          msg.channel.send("Yes");
        } else {
          msg.channel.send(responses[value]);
        }
      }
    }
  },
  quote: {
    type: "Fun",
    usage: "quote",
    description: "Generate an inspirational quote. Powered by InspiroBot",
    onCall: function(msg, args) {
      jsonhandler.getQuote(msg.channel, main.sendMsg);
    }
  },

  /**
  GAMES
  **/
  rps: {
    type: "Games",
    usage: "rps [Rock/Paper/Scissors]",
    description: "Play Rock-Paper-Scissors against the bot",
    onCall: function(msg, args) {
      var answers = ["rock", "paper", "scissors"];
      var value = Math.floor(Math.random() * 3);
      var bchoice = answers[value].toLowerCase();
      var pchoice = args[0].toLowerCase();

      var result = `Your choice: ${args[0]}, my choice: ${answers[value]} \n`;

      if (bchoice === pchoice) result += "Draw!";

      if (bchoice == "rock") {
        if (pchoice == "paper") result += "You win!";
        if (pchoice == "scissors") result += "You lose!";
      } else if (bchoice == "paper") {
        if (pchoice == "scissors") result += "You win!";
        if (pchoice == "rock") result += "You lose!";
      } else {
        if (pchoice == "rock") result += "You win!";
        if (pchoice == "paper") result += "You lose!";
      }

      msg.channel.send(result);
    }
  },
  gamestart: {
    type: "Games",
    usage: "startgame [Name of game] [Additional options]",
    description:
      'Starts an interactive game. Exit with the "stop" command. For a list of games use the "gamelist" command',
    onCall: function(msg, args) {
      games.init(args, msg.channel);
      main.gameRunning = true;
    }
  },

  /**
  SOCIAL
  **/
  sub: {
    type: "Social",
    usage: "sub [Name of subreddit] [Number of posts]",
    description: "Fetch the top posts of a specific subreddit",
    onCall: function(msg, args) {
      var content = "";
      fetchSubreddit(args[0].toLowerCase())
        .then(function(urls) {
          content = jsonhandler.RedditJSON(urls[0], args[1]); //We use "urls[0]" because fetchSubreddit returns the JSON object within an 1-element-array
          msg.channel.send(content);
        })
        .catch(err => console.error(err));
    }
  },
  rsub: {
    type: "Social",
    usage: "rsub [Number of posts]",
    description: "Fetch the top posts of a random subreddit",
    onCall: function(msg, args) {
      var subnamestr;
      var subname = "";
      var content = "";
      fetchRandomSubredditName(1)
        .then(function(subreddits) {
          subnamestr = JSON.stringify(subreddits, null, 2);
          subnamestr = subnamestr.split('"name": "');
          subnamestr = subnamestr[1].split("/");
          subname = subnamestr[0];
        })
        .then(function() {
          fetchSubreddit(subname.toLowerCase())
            .then(function(urls) {
              content = jsonhandler.RedditJSON(urls[0], args[0]); //We use "urls[0]" because fetchSubreddit returns the JSON object within an 1-element-array
              msg.channel.send(embeds.RedditEmbed(subname, content, args[0]));
            })
            .catch(err => console.error(err))
            .catch(err => console.error(err));
        });
    }
  },
  githubrepos: {
    type: "Social",
    usage: "githubrepos [username]",
    description: "List all GitHub Repos a user has",
    onCall: function(msg, args) {
      jsonhandler.getGitHubRepos(msg.channel, main.sendMsg, args[0]);
    }
  },

  /**
  HELP
  **/
  help: {
    type: "Help",
    usage: "help / help [command]",
    description:
      "You literally just used this command... What more do you want?",
    onCall: function(msg, args) {
      help.help(msg, args); //Code cant be executed here because we need access to all commands
    }
  },

  /**
  INFORMATION
  **/
  github: {
    type: "Botinfo",
    usage: "github",
    description: "Get a link to the GitHub repository of this bot",
    onCall: function(msg) {
      msg.channel.send(
        "GitHub Repository: https://github.com/Fisch03/Hanako-Discord"
      );
    }
  },
  discord: {
    type: "Botinfo",
    usage: "discord",
    description:
      "Sends the invite link for the official Hanako Discord server.",
    onCall: function(msg) {
      msg.channel.send("https://discord.gg/8fGVDAs");
    }
  }
};