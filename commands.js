const main = require('./index.js');
const embeds = require('./embeds.js');
const jsonhandler = require('./json-handler.js');

const { RichEmbed } = require('discord.js');

const PastebinAPI = require('pastebin-js');
var pastebin = new PastebinAPI();
var pastebin = new PastebinAPI(process.env.PASTEBINKEY);

const { fetchSubreddit, fetchRandomSubredditName } = require('fetch-subreddit');

module.exports = {
  sendMsgByCommand:function(cmd, args, channel) {  
    
    /**
    FUN
    **/
    switch(cmd) {
      case "ping":
        channel.send("Pong!");
    break;
        
    case "howgay":
      var value = Math.floor(Math.random() * 101);
      var name = args[0];
      channel.send(name + " ist " + value + "% gay :gay_pride_flag: ");
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
        const embed = new RichEmbed()
          .setTitle("__Hilfe__")
          .setColor(0x7289DA)
          .setDescription("**Eine Auflistung aller Befehle des Bots**")
          .addField("Fun", "howgay [name], ratewaifu [name], ping, catgirl")
          .addField("Reddit", "sub [Name] [Anzahl der Posts], rsub [Anzahl der Posts]")
          .addField("Hilfe", "help")
          .addField("Botinfo", "code [dateiname], github")
          .addField("Dev", "restart")
          .setFooter("Text in eckigen Klammern kann durch Parameter ersetzt werden");
        channel.send(embed);
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
            const embed = new RichEmbed()
              .setTitle("Code")
              .setColor(0x00F6FF)
              .setDescription("Hier ist der aktuelle Code des Bots: " + data)
              .setTimestamp()
              .setFooter("Dieser Link läuft nach 1 Stunde ab");
            channel.send(embed);
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
        setTimeout(function() {process.exit(1);}, 1000);
      break;             
    }
  }
}