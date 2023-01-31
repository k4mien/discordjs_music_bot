const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmd", "command"],
  data: new Discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all available commands"),
  run: async (client, message) => {
    const embed = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setTitle("Commands")
      .setDescription(
        client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
      );
    message.channel.send({ embeds: [embed] });
  },
};
