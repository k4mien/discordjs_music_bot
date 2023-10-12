const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  options: "",
  description: "Show all available commands",
  run: async (client, message) => {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle("Commands")
          .setDescription(
            client.commands
              .map(
                (cmd) => `\`!${cmd.name}${cmd.options}\`\t - ${cmd.description}`
              )
              .join("\n")
          ),
      ],
    });
  },
};
