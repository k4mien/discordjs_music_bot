const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pause",
  description: "Pause the queue",
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
    if (queue.paused) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("The current song is already paused"),
        ],
      });
    } else {
      await queue.pause();
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Paused the song for you :)"),
        ],
      });
    }
  },
};
