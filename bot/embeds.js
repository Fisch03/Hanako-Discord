const { RichEmbed } = require('discord.js');

  module.exports.RedditEmbed = function(subname, content, number) { { //Embed for Subreddit listings
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
      .setDescription("Here are the hottest " + number + " posts from r/" + subname + ": \n" + newcontent)
      .addField("More info:", "[Subreddit Homepage](https://www.reddit.com/r/" + subname + ")")
      .setTimestamp()
      .setFooter("Data recieved:");
    return embed;
  }
}

module.exports.CatgirlEmbed = function(link) {
  const embed = new RichEmbed()
      .setTitle("Catgirl")
      .setColor(0xFF00E5)
      .setImage(link)
      .setDescription("Random catgirl from [Nekos.Life](https://nekos.life/)")
  return embed;
}

module.exports.CatEmbed = function(link) {
  const embed = new RichEmbed()
      .setTitle("Cat")
	  .setColor(0x4C4CAD)
	  .setImage(link)
	  .setDescription("Random cat from [random.cat](httpss://random.cat)")
  return embed;
}


module.exports.HelpEmbed = function() {
  const embed = new RichEmbed()
    .setTitle("__Help__")
    .setColor(0x7289DA)
    .setDescription("**All bot commands**")
    .addField("Fun", "howgay [name],?WeebLv [name], ratewaifu [name], ping, catgirl, lenny, rlenny, cat")
    .addField("Games", "rps [Scissors/Stone/Paper], start [Gamename] [Gametype]")
    .addField("Reddit", "sub [name] [Amount of posts], rsub [Amount of posts]")
    .addField("Help", "help, gamehelp")
    .addField("Botinfo", "github")
    .addField("Dev", "restart")
    .setFooter("Text in brackets can be replaced by arguments.");
  return embed;
}

module.exports.GamehelpEmbed = function() {
  const embed = new RichEmbed()
    .setTitle("__Game Help__")
    .setColor(0x7289DA)
    .setDescription("**Games are started with start [Gamename] [Gametype] and stopped with ?stop .\nThe following games are avalible:**")
    .addField("labyrinth", "Navigate through the level with reactions. Without a gametype, you only play one level. Gametypes:\ncont: Play through every single level randomly\ncat: At the end of the level a catgirl waits for you.")
    .setFooter("Example: ?start labyrinth cont");
  return embed;
}
