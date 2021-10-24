const main = require("../index.js");

const help = require("./help.js");
const music  = require("./music.js");
const games = require("./games/gamemanager.js");
const { getRequest, getJSON } = require("./web-handler.js");

const ikea = require("ikea-name-generator");

const { Uwuifier } = require("uwuifier");
const uwuifier = new Uwuifier();

const { MessageEmbed } = require("discord.js");

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
      msg.channel.send(`${args[0]} is ${value}% gay :gay_pride_flag:`);
    }
  },
  ratewaifu: {
    type:"Fun",
    usage:"ratewaifu [name]",
    description:"Get a random rating for how much of a Waifu the User is",
    onCall: function(msg, args) {
      let value = Math.floor(Math.random() * 11);
      msg.channel.send(`${args[0]} is a ${value}/10 Waifu`);
    }
  },
  kiss: {
    type:"Fun",
    usage:"kiss [name]",
    description:"Kiss somebody",
    onCall: function(msg, args) {
      let value = Math.floor(Math.random() * 11);
      msg.channel.send(`${msg.author} kisses ${args[0]}. Chu~`);
    }
  },
  uwu: {
    type: "Fun",
    usage: "uwu [Text]",
    description: "uwuifies text",
    onCall: function(msg, args){
      if (args.length == 0){
        msg.channel.messages.fetch({limit: 2})
          .then(messageMappings => {
            let messages = Array.from(messageMappings.values());
            let previousMessage = messages[1];
            msg.channel.send(uwuifier.uwuifySentence(previousMessage.content));
          })
          .catch(error => console.log(error))
      } else {
        msg.channel.send(uwuifier.uwuifySentence(args.join(" ")));
      }
    }
  },
  poggers: {
    type:"Fun",
    usage:"poggers",
    description:"unfunny feature",
    onCall: function(msg) {
      gifs = [
        "https://tenor.com/view/poggers-anime-anime-poggers-poggers-anime-touhou-project-gif-18386346",
        "https://tenor.com/view/anime-poggers-anime-anime-poggers-kiss-gif-18304456",
        "https://tenor.com/view/poggers-kissing-anime-gif-18302048",
        "https://tenor.com/view/poggers-anime-gif-18290438",
        "https://tenor.com/view/poggers-pogger-anime-poggers-gif-18420590",
        "https://tenor.com/view/poggers-gif-18334779",
        "https://tenor.com/view/anime-poggers-anime-poggers-anime-gif-18290513",
        "https://tenor.com/view/poggers-anime-girls-mako-anime-girls-kiss-kiss-gif-17206802",
        "https://tenor.com/view/sound-of-poggers-poggers-anime-anime-poggers-charr-gif-18348699",
        "https://tenor.com/view/poggers-anime-girls-kissing-pog-gif-18050577",
        "https://tenor.com/view/poggers-kiss-anime-kiss-honey-gif-18097318",
        "https://tenor.com/view/anime-poggers-anime-poggers-anime-gif-18290518",
        "https://tenor.com/view/poggers-gif-18334778",
        "https://tenor.com/view/anime-poggers-sound-of-poggers-poggers-anime-yuru-yuri-gif-18409324",
        "https://tenor.com/view/anime-poggers-anime-poggers-anime-gif-18290521"
      ]
      msg.channel.send(`${gifs[Math.floor(Math.random() * gifs.length)]}`);
    }
  },
  waifu: {
    type: "Fun",
    usage: "waifu [optional category]",
    description: "Fetch a random waifu image, optionally you can specify a category ([full list here](https://waifu.pics/more))",
    onCall: function(msg, args) {
      getRequest(`https://waifu.pics/api/sfw/${args[0]?args[0]:"waifu"}`)
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xff00e5)
            .setDescription("Random waifu from [waifu.pics](https://waifu.pics/)");
          embed.setImage(json.url);
          msg.channel.send(embed);
        })
        .catch(() => {msg.channel.send("Oops! Something went wrong. Make sure the category you specified exists.");})
    }
  },
  lewdwaifu: {
    type: "NSFW",
    usage: "lewdwaifu [optional category]",
    description: "Fetch a random lewd waifu image, optionally you can specify a category ([full list here](https://waifu.pics/more))",
    onCall: function(msg, args) {
      if (msg.channel.nsfw) {
        getRequest(`https://waifu.pics/api/nsfw/${args[0]?args[0]:"waifu"}`)
          .then((json) => {
            let embed = new MessageEmbed()
              .setColor(0xff00e5)
              .setDescription("Random waifu from [waifu.pics](https://waifu.pics/)");
            embed.setImage(json.url);
            msg.channel.send(embed);
          })
          .catch(() => {msg.channel.send("Oops! Something went wrong. Make sure the category you specified exists.");})
      } else {
        msg.channel.send(":warning: Channel must be marked as NSFW");
      }
    }
  },
  rule34: {
    type: "NSFW",
    usage: "rule34 [tags]",
    description: "Fetch the first post with these tags from rule34",
    onCall: function(msg, args){
      if (msg.channel.nsfw) {
        getRequest('https://r34-json-api.herokuapp.com/posts?tags=' + args.join('+'))
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xff00e5)
            .setDescription("rule34 image from rule34");
          embed.setImage(json[0].file_url);
          msg.channel.send(embed);
        });
      } else {
        msg.channel.send(":warning: Channel must be marked as NSFW");
      }
    }
  },
  e621: {
    type: "NSFW",
    usage: "e621 [tags]",
    description: "Fetch the first post with these tags from e621",
    onCall: function(msg, args){
      if (msg.channel.nsfw) {
        getRequest('https://e621.net/posts.json?tags=' + args.join('+'))
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0x2f64b4)
            .setDescription("Image from e621.net");
          embed.setImage(json.posts[0].file.url);
          msg.channel.send(embed);
        });
      } else {
        msg.channel.send(":warning: Channel must be marked as NSFW");
      }
    }
  },
  catgirl: {
    type: "Fun",
    usage: "catgirl",
    description: "Fetch a random Catgirl Image from nekos.life",
    onCall: function(msg) {
      getRequest("https://nekos.life/api/neko")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xff00e5)
            .setDescription("Random catgirl from [nekos.life](https://nekos.life/)");
          embed.setImage(json.neko);
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
    }
  },
  lewdcatgirl: {
    type: "NSFW",
    usage: "lewdcatgirl",
    description:
      "Fetch a random Lewd Catgirl Image from nekos.life (NSFW, obviously)",
    onCall: function(msg) {
      if (msg.channel.nsfw) {
        getRequest("https://nekos.life/api/lewd/neko")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xff00e5)
            .setDescription("Random catgirl from [nekos.life](https://nekos.life/)");
          embed.setImage(json.neko);
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
      } else {
        msg.channel.send(":warning: Channel must be marked as NSFW");
      }
    }
  },
  play: {
    type: "Music",
    usage: "play [youtube url]",
    description:
      "Play a song in the voice channel you are currently in. HIGHLY EXPERIMENTAL! Music sometimes stops whilst playing back for example",
    onCall: function(msg, args) {
      const serverQueue = music.queue.get(msg.guild.id);
      music.execute(msg, serverQueue);
    }
  },
  stop: {
    type: "Music",
    usage: "stop",
    description: "Stops the currently playing song and leaves the voice channel.",
    onCall: function(msg) {
      const serverQueue = music.queue.get(msg.guild.id);
      music.stop(msg, serverQueue);
    }
  },
  skip: {
    type: "Music",
    usage: "skip",
    description: "Skips the currently playing song",
    onCall: function(msg) {
      const serverQueue = music.queue.get(msg.guild.id);
      music.skip(msg, serverQueue);
    }
  },
  queue: {
    type: "Music",
    usage: "queue",
    description: "Outputs the current queue (max. 10 songs)",
    onCall: function(msg) {
      const serverQueue = music.queue.get(msg.guild.id);
      let embed = new MessageEmbed()
        .setColor(0x000000);
      if (serverQueue == null || serverQueue.songs.length == 0){
        embed.setDescription("Your queue is currently empty.");
      } else {
        let queueMsg = "This is your current server queue! (Note: This only shows 10 songs max.)\n";
        for (var i=0;i<10;i++){
          if (serverQueue.songs[i] == null){
            break;
          }
          queueMsg += "[" + serverQueue.songs[i].title + "](" + serverQueue.songs[i].url + ")\n";
        }
        embed.setDescription(queueMsg);
      }
      msg.channel.send(embed);
    }
  },
  cat: {
    type: "Fun",
    usage: "cat",
    description: "Fetch a random Cat Image from random.cat",
    onCall: function(msg) {
      getRequest("http://aws.random.cat/meow")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0x4c4cad)
            .setDescription("Random cat from [random.cat](https://random.cat)");
          embed.setImage(json.file.replace(/\\/g, ""));
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
    }
  },
  dog: {
    type: "Fun",
    usage: "dog",
    description: "Fetch a random Dog Image from dog.ceo",
    onCall: function(msg) {
      getRequest("https://dog.ceo/api/breeds/image/random")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xa3480f)
            .setDescription("Random dog from [dog.ceo](https://dog.ceo)");
          embed.setImage(json.message);
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
    }
  },
  xkcd: {
    type: "Fun",
    usage: "xkcd [Number]",
    description: "Shows the specified XKCD comic",
    onCall: function (msg, args){
      if (args.length == 0){
        msg.channel.send("Please specify a XKCD.");
      } else {
        getRequest("https://xkcd.com/" + args[0] + "/info.0.json")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xFFFFFF)
            .setTitle(json.title)
            .setDescription(json.alt)
            .setImage(json.img)
          msg.channel.send(embed);
        }).catch((error) => {msg.channel.send("This XKCD does not exist.")})
      }
    }
  },
  shibainu: {
    type: "Fun",
    usage: "shibainu",
    description: "Fetch a random Shiba Inu image from shibe.online",
    onCall: function(msg) {
      getRequest("https://shibe.online/api/shibes?count=1")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0xbd9c5a)
            .setDescription("Random Shiba Inu image from [shibe.online](https://shibe.online)")
          embed.setImage(json[0])
          msg.channel.send(embed);
        })
        .catch((error) => {console.error(error)})
    }
  },
  trace: {
    type: "Fun",
    usage: "trace [optional image url]",
    description: "Traces back the anime episode from the last image sent or from an image URL specified",
    onCall: function(msg, args){
      if (args.length == 0){
        msg.channel.messages.fetch({limit: 100})
        .then(messageMappings => {
          let messages = Array.from(messageMappings.values());
          for(let message of messages){
            if (message.attachments.array().length > 0){
              getRequest("https://trace.moe/api/search?url=" + message.attachments.first().url)
              .then((json) => {
                let embed = new MessageEmbed()
                  .setColor(0x000000)
                  .setTitle("Found it!")
                  .addField("Anime name", json.docs[0].title_english)
                  .addField("Anime episode", json.docs[0].episode)
                  .addField("Hentai", json.docs[0].is_adult)
                  .addField("Timestamp", (Math.floor(json.docs[0].at / 60) + ":" + (parseInt(json.docs[0].at)%60)))
                  .setFooter("Keep in mind that this data is not always accurate!");
                msg.channel.send(embed);
              })
              .catch((error) => {msg.channel.send("Could not find anime from given screenshot.")})
              break;
            }

          }
          })
      } else {
        getRequest("https://trace.moe/api/search?url=" + args[0])
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0x000000)
            .setTitle("Found it!")
            .addField("Anime name", json.docs[0].title_english)
            .addField("Anime episode", json.docs[0].episode)
            .addField("Hentai", json.docs[0].is_adult)
            .addField("Timestamp", (Math.floor(json.docs[0].at / 60) + ":" + (parseInt(json.docs[0].at)%60)))
            .setFooter("Keep in mind that this data is not always accurate!");
          msg.channel.send(embed);
        })
        .catch((error) => {msg.channel.send("Could not find anime from given screenshot.")})
      }
    }
  },
  dogecoin: {
    type: "Fun",
    usage: "dogecoin",
    description: "Get the current dogecoin price",
    onCall: function(msg){
      getRequest("https://api.cryptonator.com/api/ticker/doge-eur")
      .then((json) => {
        let embed = new MessageEmbed()
          .setColor(0xbd9c5a)
          .setDescription("1 Doge is currently worth " + json.ticker.price + "€")
          .setFooter("Data fetched")
          .setTimestamp(Date.now())
        msg.channel.send(embed);
      })
    }
  },
  joke: {
    type: "Fun",
    usage: "joke",
    description: "Fetch a random joke from sv443.net/jokeapi",
    onCall: function(msg) {
      getRequest("https://sv443.net/jokeapi/v2/joke/Any")
        .then((json) => {
          let embed = new MessageEmbed()
            .setColor(0x000000)
            .setFooter("Random joke from sv443.net");
          if (json.type == "twopart"){
          embed.setDescription(json.setup + "\n" + json.delivery);
          msg.channel.send(embed);
          } else {
          embed.setDescription(json.joke);
          msg.channel.send(embed);
          }
        })
        .catch((error) => {console.error(error)})
    }
  },
  fox: {
	type: "Fun",
	usage: "fox",
	description: "Fetch a random fox from randomfox.ca",
	onCall: function(msg) {
		getRequest("https://randomfox.ca/floof/")
		  .then((json) => {
			let embed = new MessageEmbed()
        .setColor(0xcc8400)
        .setDescription("Random fox from [randomfox.ca](https://randomfox.ca)");
			embed.setImage(json.image);
			msg.channel.send(embed);
		  })
		  .catch((error) => {console.error(error)})
	}
  },
  ikea: {
	type: "Fun",
	usage: "ikea",
	description: "Return a randomly generated IKEA furniture name",
	onCall: function(msg) {
		let embed = new MessageEmbed()
      .setColor(0x0051ba)
	    .setFooter("Random IKEA furniture name from the npm package ikea-name-generator");
		embed.setTitle(ikea.getName());
		msg.channel.send(embed);
	}
  },
  echo: {
	type: "Fun",
	usage: "echo [message]",
	description: "Sends the message you entered back.",
	onCall: function(msg, args) {
	  msg.channel.send(args.join(" "));
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
      if (!args[0] || args[0] === "") {
        msg.channel.send("You have to ask something!");
      } else {
        let responses = [
          "Yes, of course",
          "No, definitly not",
          "Why did you ask?",
          "I'm not sure",
          "Please ask me later",
          "That's  it, I'm shutting down.",
          "Haha, that's funny",
          "I hate you, shut up!"
        ];
        let uwu_responses = [
          "Yes, of couwse",
          "Nyo, definyitwy not",
          "W-W-Why did you ask?",
          "I'm nyot suwe",
          "Pwease ask me watew",
          "That's  it, I'm shutting down *runs away*",
          "Haha, that's funny uwu",
          "I hate you, shut up!!11"
        ]
        let index = Math.floor(Math.random() * responses.length);
        if (args[0].toLowerCase() == "ban") {
          msg.channel.send("Yes");
        } else {
          let uwu_mode = false;

          args.forEach(arg => {
            if((arg.toLowerCase().includes("uwu") || arg.toLowerCase().includes("owo")) && arg.match(/[a-zA-Z]/g).length <= 3) {
              uwu_mode = true;
            }
          });

          if(uwu_mode) {
            msg.channel.send(uwu_responses[index]);
          } else {
            msg.channel.send(responses[index]);
          }
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
          let embed = new MessageEmbed()
            .setDescription('"Inspirational" Quote from [Inspirobot](https://inspirobot.me/)')
            .setColor(0x000000);
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
    usage: "sub [Name of subreddit]",
    description: "Fetch the hottest posts of a specific subreddit",
    onCall: function(msg, args) {
      var subreddit = args[0].toLowerCase();
      if (subreddit.startsWith("r/")){
        subreddit = subreddit.replace("r/", "");
      }
      getRequest('https://www.reddit.com/r/' + subreddit + '/hot.json').then(body => {
        var json = body;
        var posts = json.data.children;
        var stylizedSubredditName = posts[0].data.subreddit_name_prefixed
        var arr0 = [];
        var arr1 = [];
        var i = 0;
        posts.forEach(data => {
          if (i != 10){
            arr0.push("[" + data.data.title + "](https://reddit.com" + data.data.permalink + ")");
            i++;
          }
        })
        var embed = new MessageEmbed()
          .setColor(0xff4500)
          .setTitle("reddit")
          .setDescription("Hottest posts")
          .setTimestamp()
          .setFooter("Data recieved");
        embed.setTitle(stylizedSubredditName);
        embed.setDescription("The 10 hottest posts from " + stylizedSubredditName);
        var finalContent = "";
        arr0.forEach(content => {
          finalContent = finalContent + content + "\n";
        })
        embed.setDescription("The 10 hottest posts from " + stylizedSubredditName + "\n\n" + finalContent);
        embed.addField("More info", "[Go to this subreddit](https://reddit.com/" + stylizedSubredditName + ")");
        msg.channel.send(embed);
      })
    }
  },
  rsub: {
    type: "Social",
    usage: "rsub",
    description: "Fetch the hottest posts of a random subreddit",
    onCall: function(msg, args) {
      var subreddits = ["dankmemes", "dogecoin", "okbuddyretard", "askreddit", "all", "discord", "osugame"];
      var subreddit = subreddits[Math.floor(subreddits.length * Math.random())];
      getRequest('https://www.reddit.com/r/' + subreddit + '/hot.json').then(body => {
        var json = body;
        var posts = json.data.children;
        var stylizedSubredditName = posts[0].data.subreddit_name_prefixed
        var arr0 = [];
        var arr1 = [];
        var i = 0;
        posts.forEach(data => {
          if (i != 10){
            arr0.push("[" + data.data.title + "](https://reddit.com" + data.data.permalink + ")");
            i++;
          }
        })
        var embed = new MessageEmbed()
          .setColor(0xff4500)
          .setTitle("reddit")
          .setDescription("Hottest posts")
          .setTimestamp()
          .setFooter("Data recieved");
        embed.setTitle(stylizedSubredditName);
        embed.setDescription("The 10 hottest posts from " + stylizedSubredditName);
        var finalContent = "";
        arr0.forEach(content => {
          finalContent = finalContent + content + "\n";
        })
        embed.setDescription("The 10 hottest posts from " + stylizedSubredditName + "\n\n" + finalContent);
        // really dumb way of fixing that weird error where there would be a new more info field every execution
        embed.spliceFields(0, 25);
        embed.addField("More info", "[Go to this subreddit](https://reddit.com/" + stylizedSubredditName + ")");
        msg.channel.send(embed);
      })
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

          let embed = new MessageEmbed()
            .setThumbnail("https://octodex.github.com/images/original.png")
            .setColor(0x000000)
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
