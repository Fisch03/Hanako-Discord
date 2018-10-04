const main = require('../index.js');

const embeds = require('./embeds.js');
const games = require('./games/gamemanager.js');
const jsonhandler = require('./json-handler.js');

const { RichEmbed } = require('discord.js');

const PastebinAPI = require('pastebin-js');
var pastebin = new PastebinAPI();
var pastebin = new PastebinAPI(process.env.PASTEBINKEY);

const { fetchSubreddit, fetchRandomSubredditName } = require('fetch-subreddit');

const randomAnimeWallpapers = require('random-anime-wallpapers');

module.exports = {
  getActionByCommand:function(cmd, args, channel) {

    /**
    FUN
    **/
    switch(cmd) {
      case "ping":
        channel.send("Pong!");
        console.log("Ping received");
        break;
        
      case "Marco":
        channel.send("Polo");
        break;
     
      case "Polo":
        channel.send("Marco");
        break;

    case "howgay":
      var value = Math.floor(Math.random() * 101);
      var name = args[0];
      channel.send(name + " ist " + value + "% gay :gay_pride_flag: ");
    break;
    
    case "weeblvl":
      var value = Math.floor(Math.random() * 101);
      randomAnimeWallpapers()
        .then(images => {
        var image = jsonhandler.getAnimeWallpaper(Math.floor(Math.random() * 6), images);
        console.log(image);
        channel.send(embeds.lvlEmbed(args[0], value, images));
      })
    break;
        
    case "ratewaifu":
      var value = Math.floor(Math.random() * 11);
      var name = args[0];
      channel.send(name + " ist ein " + value + "/10 waifu");
    break;

    case "catgirl":
      jsonhandler.getCatgirl(channel);
    break;

    case "lenny":
      channel.send("( ͡° ͜ʖ ͡°)");
    break;

    case "rlenny":
      var lennyarr = ["( ͡° ͜ʖ ͡°)","(づ ◔ ͜ʖ ◔ )づ","(╭☞ ・ ͜つ ・ )╭☞","( ◕ ᗜ ◕ )","⤜( ʘ _ ʘ )⤏","ಠ _ ಠ","( ⌐■ _ ■ )","ʢ ◉ ᴥ ◉ ʡ",
                      "(ᴗ ͜ʖ ᴗ)","(⟃ ͜ʖ ⟄)","( ‾ ʖ̫ ‾)","(͠≖ ͜ʖ͠≖)","( ͡° ʖ̯ ͡°)","ʕ ͡° ʖ̯ ͡°ʔ","( ͡° ل͜ ͡°)","( ͠° ͟ʖ ͡°)","( ͠° ͟ʖ ͠°)","( ͡~ ͜ʖ ͡°)",
                      "( ͡o ͜ʖ ͡o)","( ͡◉ ͜ʖ ͡◉)","( ͡☉ ͜ʖ ͡☉)","( ͡° ͜V ͡°)","ʕ ͡° ͜ʖ ͡°ʔ","( ͡ᵔ ͜ʖ ͡ᵔ )","( ͡° ͜ʖ ͡ °)","(☭ ͜ʖ ☭)","(=^-ω-^=)"];
      var value = Math.floor(Math.random() * (lennyarr.length + 1));
      channel.send(lennyarr[value]);
    break;

    /**
    GAMES
    **/
    case "rps":
      var steinarr = ["Stein","Papier","Schere"];
      var value = Math.floor(Math.random() * 3);
      var bchoice = steinarr[value].toLowerCase();
      var pchoice = args[0].toLowerCase();

      var msg = "Deine Form: " + args[0] + "\nMeine Form: " + steinarr[value] +  "\n";

      console.log(bchoice, pchoice);

      if (bchoice === pchoice)
        msg += "Unentschieden!";
      if(bchoice == "stein") {
        if(pchoice == "papier")
          msg += "Du gewinnst!";
        if(pchoice == "schere")
          msg += "Du verlierst!";
      } else if(bchoice == "papier") {
        if(pchoice == "schere")
          msg += "Du gewinnst!";
        if(pchoice == "stein")
          msg += "Du verlierst!";
      } else {
        if(pchoice == "stein")
          msg += "Du gewinnst!";
        if(pchoice == "papier")
          msg += "Du verlierst!";
      }

      channel.send(msg);
    break;

      case "start":
      games.init(args, channel);
      main.gameRunning = true;
    break;

    /**
    REDDIT
    **/
    case "sub":
      var content = "";
      fetchSubreddit(args[0].toLowerCase())
        .then(function (urls) {
          content = jsonhandler.RedditJSON(urls, args[1]);
          channel.send(embeds.RedditEmbed(args[0], content, args[1]));
        })
        .catch((err) => console.error(err));
    break;

    case "rsub":
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
            content = jsonhandler.RedditJSON(urls, args[0]);
            channel.send(embeds.RedditEmbed(subname, content, args[0]));
          })
          .catch((err) => console.error(err))
        .catch((err) => console.error(err));
        })
      break;

      /**
      HELP
      **/
      case "help":
        channel.send(embeds.HelpEmbed());
      break;

      case "gamehelp":
        channel.send(embeds.GamehelpEmbed());
      break;
      /**
      INFORMATION
      **/
      case "code":
        pastebin
          .createPasteFromFile({
            filename: "./" + args[0] + ".js",
            title: "fischisdiscordbot",
            format: "javascript",
            privacy: 1,
            expiration: '1H'
          })
          .then(function (data) {
            channel.send(embeds.PastebinEmbed(data));
          })
          .fail(function (err) {
            console.log(err);
          })
      break;

      case "github":
        channel.send("GitHub Link: https://github.com/Fisch03/FischisDiscordBot");
      break;

       /**
      DEV
      **/
      case "restart":
        channel.send("Bot wird neugestartet...");
        console.log("Bot restarting");
        setTimeout(function() {process.exit(1).catch((err) => console.error(err));}, 1000);
      break;
    }
  }
}
