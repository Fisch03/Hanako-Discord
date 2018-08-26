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
      .setDescription("Hier sind die heißesten " + number + " Posts von r/" + subname + ": \n" + newcontent)
      .addField("Mehr Info:", "[Subreddit Homepage](https://www.reddit.com/r/" + subname + ")")
      .setTimestamp()
      .setFooter("Daten empfangen:");
    return embed;
  }
}

module.exports.CatgirlEmbed = function(link) {
  const embed = new RichEmbed()
      .setTitle("Catgirl")
      .setColor(0xFF00E5)
      .setImage(link)
      .setDescription("Zufälliges Catgirl von [Nekos.Life](https://nekos.life/)")
  return embed;
}

module.exports.HelpEmbed = function() {
  const embed = new RichEmbed()
    .setTitle("__Hilfe__")
    .setColor(0x7289DA)
    .setDescription("**Eine Auflistung aller Befehle des Bots**")
    .addField("Fun", "howgay [name], ratewaifu [name], ping, catgirl, lenny, rlenny")
    .addField("Games", "rps [Schere/Stein/Papier], start [Spielname] [Spielart]")
    .addField("Reddit", "sub [Name] [Anzahl der Posts], rsub [Anzahl der Posts]")
    .addField("Hilfe", "help, gamehelp")
    .addField("Botinfo", "code [dateiname], github")
    .addField("Dev", "restart")
    .setFooter("Text in eckigen Klammern kann durch Parameter ersetzt werden");
  return embed;
}

module.exports.GamehelpEmbed = function() {
  const embed = new RichEmbed()
    .setTitle("__Spiel Hilfe__")
    .setColor(0x7289DA)
    .setDescription("**Spiele werden mit start [Spielname] [Spielart] gestartet.\nFolgende Spiele sind verfügbar:**")
    .addField("labyrinth", "Navigiere mit Reactions durch die Level. Ohne angegebene Spielart spielst du nur ein Level. Spielarten:\ncont: Spiele durch alle Level in zufälliger Reihenfolge\ncat: Am Ende des Levels erwartet dich ein Catgirl")
    .setFooter("Beispiel: ?start labyrinth cont");
  return embed;
}

module.exports.PastebinEmbed = function(data) {
  const embed = new RichEmbed()
    .setTitle("Code")
    .setColor(0x00F6FF)
    .setDescription("Hier ist der aktuelle Code des Bots: " + data)
    .setTimestamp()
    .setFooter("Dieser Link läuft nach 1 Stunde ab");
  return embed;
}
