const { RichEmbed } = require('discord.js');

module.exports = {
  RedditEmbed:function(subname, content, number) { //Embed for Subreddit listings 
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
}