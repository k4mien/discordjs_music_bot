const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "forward",
  aliases: ["f"],
  description: "Forward the current song",
  options: "[number]",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("There is nothing in the queue right now!"),
        ],
      });
    if (!args[0]) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Please provide time in seconds!"),
        ],
      });
    }
    const time = Number(args[0]);
    if (isNaN(time) || time <= 0)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Please enter a valid number!"),
        ],
      });
    await queue.seek(queue.currentTime + time);
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setDescription(`Forwarded the song for ${time} seconds!`),
      ],
    });
  },
};
