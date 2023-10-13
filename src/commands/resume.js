const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "resume",
  description: "Resume the queue",
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
      await queue.resume();
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Resumed the song for you :)"),
        ],
      });
    } else {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("The queue is not paused!"),
        ],
      });
    }
  },
};
