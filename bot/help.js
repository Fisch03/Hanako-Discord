const commands = require('./commands.js')

const { MessageEmbed } = require('discord.js');

module.exports.help = function(msg, args) {
  if(args[0] != undefined) {
    let command = commands.commands[args[0]];
    if(command != undefined) {
      let embed = new MessageEmbed()
        .setTitle("__Help__")
        .setColor(0x7289DA)
        .setDescription(`**Help for the ${args[0]} command**`)
        .addField("Category:", command.type)
        .addField("Usage:", command.usage)
        .addField("Description:", command.description);
      msg.channel.send(embed);
    } else {
      msg.channel.send("That command does not exist.")
    }
  } else {
    const cmdarray = Object.values(commands.commands)
    let allcommands = {}

    for(let cmd of cmdarray) {
      if(!allcommands[cmd.type])
        allcommands[cmd.type] = [];
      allcommands[cmd.type].push(cmd.usage);
    }

    allcategories = Object.keys(allcommands)
    let embed = new MessageEmbed()
      .setTitle("__Help__")
      .setColor(0x7289DA)
      .setDescription(`**A list of all the commands**`)
      .setFooter("Text in brackets has to be replaced with additional parameters.");

    for(let category of allcategories) {
      let text = ""
      allcommands[category].forEach(function(cmd, index) {
        text += cmd
        if(index != allcommands[category].length-1)
          text += ", "
      });
      embed.addField(category, text);
    }

    msg.channel.send(embed);
  }
}
