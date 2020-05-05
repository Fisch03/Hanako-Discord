const { MessageEmbed } = require("discord.js");

module.exports.RedditEmbed = function(subname, content) {
  {
    //Embed for Subreddit listings
    var contentstring = "";
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
};

module.exports.CatgirlEmbed = function(link) {
  const embed = new MessageEmbed()
    .setTitle("Catgirl")
    .setColor(0xff00e5)
    .setImage(link)
    .setDescription("Random catgirl from [Nekos.Life](https://nekos.life/)");
  return embed;
};

module.exports.QuoteEmbed = function(link) {
  const embed = new MessageEmbed()
    .setTitle("Inspirational Quote")
    .setColor(0x000000)
    .setImage(link);
  return embed;
};

module.exports.CatEmbed = function(link) {
  const embed = new MessageEmbed()
    .setTitle("Cat")
    .setColor(0x4c4cad)
    .setImage(link)
    .setDescription("Random cat from [random.cat](httpss://random.cat)");
  return embed;
};

module.exports.RepoEmbed = function(username, repomsg, avatarurl) {
  var octocats = [
    "https://octodex.github.com/images/total-eclipse-of-the-octocat.jpg",
    "https://octodex.github.com/images/original.png",
    "https://octodex.github.com/images/class-act.png",
    "https://octodex.github.com/images/octobiwan.jpg",
    "https://octodex.github.com/images/drupalcat.jpg",
    "https://octodex.github.com/images/forktocat.jpg",
    "https://octodex.github.com/images/repo.png",
    "https://octodex.github.com/images/setuptocat.jpg"
  ];
  var octocat = Math.floor(Math.random() * octocats.length);
  const embed = new MessageEmbed()
    .setAuthor(username, avatarurl)
    .setColor(0x000000)
    .setThumbnail(octocats[octocat])
    .setDescription(repomsg);
  return embed;
};

module.exports.SralEmbed = function() {
  var srals = [
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fimage0.jpg?v=1582835240348",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fimage1.jpg?v=1582835247820",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FIMG_20191113_201513.jpg?v=1582835253565",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FIMG_5517.jpg?v=1582835255105",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fimage3.jpg?v=1582835255455",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fimage2.jpg?v=1582835255646",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FIMG-20190930-WA0004.jpg?v=1582835255953",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FLars_Iphone_11_ProMax_Flex2.jpg?v=1582835256053",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FLars_Iphone_11_ProMax_Flex.jpg?v=1582835256175",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FIMG_20200108_141857_0.jpg?v=1582835267086",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fsralcoin.png?v=1582835267170",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fsral.jpg?v=1582835268063",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fsral_hatsunemiku.png?v=1582835272908",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2FObamaSral.png?v=1582835282251",
    "https://cdn.glitch.com/e3d2abb0-c73f-4de3-b777-ec2a6f8ae218%2Fsral1_transparent.png?v=1582835288688"
  ];
  var sral = Math.floor(Math.random() * srals.length);
  const embed = new MessageEmbed()
    .setImage(srals[sral])
    .setTitle("Hier ist ein SRAL damit du dich zufrieden gibst.")
    .setTimestamp()
    .setURL("https://bit.ly/2T5b4i7");
  return embed;
};
