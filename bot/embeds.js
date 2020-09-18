const { MessageEmbed } = require("discord.js");

module.exports.embeds = {
  catgirlEmbed: new MessageEmbed()
    .setColor(0xff00e5)
    .setDescription("Random catgirl from [Nekos.Life](https://nekos.life/)"),
  catEmbed: new MessageEmbed()
    .setColor(0x4c4cad)
    .setDescription("Random cat from [random.cat](https://random.cat)"),
  quoteEmbed: new MessageEmbed()
    .setDescription("Inspirational Quote from [Inspirobot](https://inspirobot.me/)")
    .setColor(0x000000),
  githubEmbed: new MessageEmbed()
    .setThumbnail("https://octodex.github.com/images/original.png")
    .setColor(0x000000)
}

/* DEPRECATED! FOR REFERENCE USE ONLY
export function RedditEmbed(subname, content) {
  {
    //Embed for Subreddit listings
    let contentstring = "";
    content.forEach(function(link, index) {
      contentstring += `${index + 1}: `;
      contentstring += `[${link.substring(0, 36)}...](${link})`;
      if (index != content.length - 1) contentstring += "\n";
    });
    const embed = new MessageEmbed()
      .setTitle("r/" + subname)
      .setThumbnail(
        "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png"
      )
      .setColor(0xff4500)
      .setDescription(
        `Here are the hottest ${content.length} posts from r/${subname}: \n ${contentstring}`
      )
      .addField(
        "More info:",
        `[Subreddit Homepage](https://www.reddit.com/r/${subname})`
      )
      .setTimestamp()
      .setFooter("Data recieved:");
    return embed;
  }
}
*/
