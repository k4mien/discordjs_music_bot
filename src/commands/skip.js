const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the current song",
  options: "",
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
      await queue.stop();
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    } else {
      await queue.skip();
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    }
  },
};
