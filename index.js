const { Client, RichEmbed } = require('discord.js');
const self = new Client();

var PastebinAPI = require('pastebin-js');
var pastebin = new PastebinAPI();
var pastebin = new PastebinAPI(process.env.PASTEBINKEY);

const { fetchSubreddit, fetchRandomSubredditName } = require('fetch-subreddit');

var prefix = "?";
var debugmode = false;

self.on('ready', () => {
  console.log('Bot Online');
  self.user.setActivity('random Games', { type: 'PLAYING' })
});

self.on("message", message => {
  if(message.content === "Bad Bot"){
     message.channel.send("Bad Human");
  };

  if(message.content.startsWith("Ich bin")) {
    var name = message.content.split("Ich bin");
    message.channel.send("Hallo " + name[1] + ", ich bin ein Bot");
  }

  if (message.content.startsWith(prefix) && message.author.username != self.user.username) {
    
    if(debugmode) {
      message.channel.send("Nachricht mit Prefix erkannt");
    }
    
    var msgarr = message.content.split(prefix);
    var msg = msgarr[1];
    var args = msg.split(" ");
    var cmd = args.shift();
    
    if(debugmode) {
      if (args.length > 0) {
        message.channel.send("Befehl ist '" + cmd + "' und folgende Argumente sind gegeben:");
        for (var arg in args) {
          message.channel.send(args[arg]);
        }
      } else {
        message.channel.send("Befehl ist '" + cmd + "' und es sind keine Argumente gegeben.");
      }
      message.channel.send("Programm wird fortgeführt...");
    }

    switch(cmd) {
      case "ping":
        message.channel.send("Pong!");
      break;
        
      case "prefix":
        prefix = args[0];
        message.channel.send("Prefix wurde zu " + prefix + " gewechselt")
      break;
        
      case "debug":
        debugmode = !debugmode;
        message.channel.send("Debugging wurde umgeschaltet");
      break;
        
      case "restart":
        message.channel.send("Bot wird neugestartet...");
        console.log("Bot restarting");
        setTimeout(function() {process.exit(1);}, 1000);
      break;
        
      case "howgay":
        var value = Math.floor(Math.random() * 101);
        var name = args[0];
        message.channel.send(name + " ist " + value + "% gay :gay_pride_flag: ");
      break;
        
      case "ratewaifu":
        var value = Math.floor(Math.random() * 11);
        var name = args[0];
        message.channel.send(name + " ist ein " + value + "/10 waifu");
      break;
        
      case "help":
        const embed = new RichEmbed()
          .setTitle("__Hilfe__")
          .setColor(0x7289DA)
          .setDescription("**Eine Auflistung aller Befehle des Bots**")
          .addField("Fun", "howgay [name], ratewaifu [name],\n ping")
          .addField("Reddit", "sub [Name] [Anzahl der Posts],\n rsub [Anzahl der Posts]")
          .addField("Einstellungen", "prefix [Neuer Prefix]")
          .addField("Hilfe", "help")
          .addField("Botinfo", "code")
          .addField("Dev", "debug, restart")
          .setFooter("Text in eckigen Klammern kann durch Parameter ersetzt werden");
        message.channel.send(embed);
      break;
        
      case "code":
      pastebin
      .createPasteFromFile({
        filename: "index.js",
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
          message.channel.send(embed);
      })
      .fail(function (err) {
          console.log(err);
        })
      break;
        
      case "sub":
        var content = ""; 
        fetchSubreddit(args[0])
          .then(function (urls) {
            content = RedditJSON(urls, args[1]);
            message.channel.send(RedditEmbed(args[0], content, args[1]));
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
              content = RedditJSON(urls, args[0]);
              message.channel.send(RedditEmbed(subname, content, args[0]));
            })
            .catch((err) => console.error(err))
          .catch((err) => console.error(err));
          })
        
      break;
        
      case "github":
        message.channel.send("GitHub Link: https://github.com/Fisch03/FischisDiscordBot");
      break;
    }
  }
});

function RedditJSON(obj, len) {
  var cstring;
  var content = ""; 
  cstring = JSON.stringify(obj, null, 2);
  console.log(obj);
  console.log(cstring);
  cstring = cstring.split("[");
  cstring = cstring[2].split("]");
  cstring = cstring[0].split('"');
  for (var i = 1; i <= len; i++) {
    content += cstring[i*2+1];
    content += "\n";
  }
  return content;
}

function RedditEmbed(subname, content, number) {
  var rawcontent = content.split("\n");
  var newcontent = "";
  var postnmbr = 0;
  for (var post in rawcontent) {
    if (post == rawcontent.length - 1)
      break;
    postnmbr++;
    newcontent += postnmbr + ". " 
    if(rawcontent[post].length >= 35) {
      newcontent += "[" + rawcontent[post].substring(0, 36) + "...](" + rawcontent[post] + ")";
    } else {
      newcontent += rawcontent[post];
    }
    newcontent += "\n";
  }
  
  const embed = new RichEmbed()
    .setTitle("r/" + subname)
    .setThumbnail("https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png")
    .setColor(0xFF4500)
    .setDescription("Hier sind die heißesten " + number + " Posts von r/" + subname + ": \n" + newcontent)
    .addField("Mehr Info:", "[Subreddit Homepage](https://www.reddit.com/r/" + subname + ")")
    .setTimestamp()
    .setFooter("Daten empfangen:");
  return embed;
}

self.login(process.env.TOKEN);