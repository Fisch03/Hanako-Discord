const { RichEmbed } = require('discord.js');

  module.exports.RedditEmbed = function(subname, content) { { //Embed for Subreddit listings
    var contentstring = "";
    content.forEach(function(link, index) {
      contentstring += `${index+1}: `
      contentstring += `[${link.substring(0,36)}...](${link})`;
      if(index != content.length-1)
        contentstring += "\n"
    })
    const embed = new RichEmbed()
      .setTitle("r/" + subname)
      .setThumbnail("https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png")
      .setColor(0xFF4500)
      .setDescription(`Here are the hottest ${content.length} posts from r/${subname}: \n ${contentstring}`)
      .addField("More info:", `[Subreddit Homepage](https://www.reddit.com/r/${subname})`)
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
