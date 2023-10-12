const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear the queue",
  options: "",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("There is nothing in the queue right now!"),
        ],
      });
    queue.stop();
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setDescription("Cleared all songs in the queue!"),
      ],
    });
  },
};
