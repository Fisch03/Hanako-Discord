const main = require("../index.js");

const help = require("./help.js");
const { embeds } = require("./embeds.js");
const games = require("./games/gamemanager.js");
const { getRequest, getJSON } = require("./web-handler.js");

const ytdl = require("ytdl-core");

let playing = false;

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
      let value = Math.floor(Math.random() * 101);
      let name = args[0];
      msg.channel.send(`${name} is ${value}% gay :gay_pride_flag:`);
    }
  },
  ratewaifu: {
    type:"Fun",
    usage:"ratewaifu [name]",
    description:"Get a random rating for how much of a Waifu the User is",
    onCall: function(msg, args) {
      let value = Math.floor(Math.random() * 11);
      let name = args[0];
      msg.channel.send(`${name} is a ${value}/10 Waifu`);
    }
  },
  catgirl: {
    type: "Fun",
    usage: "catgirl",
    description: "Fetch a random Catgirl Image from nekos.life",
    onCall: function(msg) {
      getRequest("https://nekos.life/api/neko")
        .then((json) => {
          let embed = embeds.catgirlEmbed;
          embed.setImage(json.neko);
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
    }
  },
  lewdcatgirl: {
    type: "Fun",
    usage: "lewdcatgirl",
    description:
      "Fetch a random LewdCatgirl Image from nekos.life (NSFW, obviously)",
    onCall: function(msg) {
      if (msg.channel.nsfw) {
        getRequest("https://nekos.life/api/lewd/neko")
        .then((json) => {
          let embed = embeds.catgirlEmbed;
          embed.setImage(json.neko);
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
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
      let voiceChannel = msg.member.voiceChannel;
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
              let chan = msg.channel;

      if (!playing) {
        playing = true;

        msg.member.voice.channel.join().then(connection => {
          chan.send("Playing song now! *UwU*");

          connection
            .play(ytdl(args[0], { quality: "highestaudio", volume: 600 }))
            // When no packets left to send, leave the channel.
            .on("end", () => {
              playing = false;
              chan.send("song ended *sad UwU*");
              connection.channel.leave();
            });
          // Handle error without crashing the app.
          //.catch(console.error);
        });
        //.catch(console.error);
      } else {
        chan.send("Sorry, I can only play in one channel at a time!");
      }
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
      getRequest("http://aws.random.cat/meow")
        .then((json) => {
          let embed = embeds.catEmbed;
          embed.setImage(json.file.replace(/\\/g, ""));
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
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
    description: "Send a random Lenny Face / Kaomoji back",
    onCall: function(msg) {
      let lennyarr = [
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
      let value = Math.floor(Math.random() * (lennyarr.length + 1));
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
        let responses = [
          "Yes",
          "No",
          "Why?",
          "Not sure",
          "Ask me later",
          "Shutting down",
          "You are funny",
          "Shut up!"
        ];
        let value = Math.floor(Math.random() * responses.length);
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
      getRequest("https://inspirobot.me/api?generate=true")
        .then((body) => {
          let embed = embeds.quoteEmbed;
          embed.setImage(body);
          msg.channel.send(embed);
        })
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
      let answers = ["rock", "paper", "scissors"];
      let value = Math.floor(Math.random() * 3);
      let bchoice = answers[value].toLowerCase();
      let pchoice = args[0].toLowerCase();

      let result = `Your choice: ${args[0]}, my choice: ${answers[value]} \n`;

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
  startgame: {
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
      msg.channel.send("Reddit commands are currently being reworked and will be back soon.");
    }
  },
  rsub: {
    type: "Social",
    usage: "rsub [Number of posts]",
    description: "Fetch the top posts of a random subreddit",
    onCall: function(msg, args) {
      msg.channel.send("Reddit commands are currently being reworked and will be back soon.");
    }
  },
  githubrepos: {
    type: "Social",
    usage: "githubrepos [username]",
    description: "List all GitHub Repos a user has",
    onCall: function(msg, args) {
      getRequest(`https://api.github.com/users/${args[0]}/repos`)
        .then((json) => {
          console.log(json)
          repolist = ""
          for (let i = 0; i < json.length; i++) {
            repolist = repolist + json[i].full_name + "\n";
          }

          let embed = embeds.githubEmbed;
          embed.setAuthor(args[0], json[0].owner.avatar_url)
          embed.setDescription(repolist)
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
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
  },
  version: {
    type: "Botinfo",
    usage: "version",
    description:
      "Get the current Hanako version",
    onCall: function(msg) {
      msg.channel.send(`Hanako is running version ${process.env.npm_package_version}.`);
    }
  }
};