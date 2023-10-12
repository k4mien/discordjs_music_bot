const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
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
    if (queue.songs.length == 1) {
      queue.stop();
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    } else {
      queue.skip();
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    }
  },
};
