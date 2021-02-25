const { MessageEmbed } = require("discord.js");

module.exports.embeds = {
  catgirlEmbed: new MessageEmbed()
    .setColor(0xff00e5)
    .setDescription("Random catgirl from [nekos.life](https://nekos.life/)"),
  catEmbed: new MessageEmbed()
    .setColor(0x4c4cad)
    .setDescription("Random cat from [random.cat](https://random.cat)"),
  dogEmbed: new MessageEmbed()
    .setColor(0xa3480f)
    .setDescription("Random dog from [dog.ceo](https://dog.ceo)"),
  quoteEmbed: new MessageEmbed()
    .setDescription("Inspirational Quote from [Inspirobot](https://inspirobot.me/)")
    .setColor(0x000000),
  githubEmbed: new MessageEmbed()
    .setThumbnail("https://octodex.github.com/images/original.png")
    .setColor(0x000000),
  jokeEmbed: new MessageEmbed()
    .setColor(0x000000)
	.setFooter("Random joke from sv443.net"),
  foxEmbed: new MessageEmbed()
	.setColor(0xcc8400)
	.setDescription("Random fox from [randomfox.ca](https://randomfox.ca)"),
  ikeaEmbed: new MessageEmbed()
    .setColor(0x0051ba)
	.setFooter("Random IKEA furniture name from the npm package ikea-name-generator"),
  redditEmbed: new MessageEmbed()
  .setColor(0xff4500)
  .setTitle("reddit")
  .setDescription("Hottest posts")
  .setTimestamp()
  .setFooter("Data recieved")
}