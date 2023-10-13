const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skipto",
  description: "Skip to the indicated song",
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
            .setDescription("Please enter a song position!"),
        ],
      });
    }
    const position = Number(args[0]);
    if (isNaN(position)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Please enter a valid number!"),
        ],
      });
    } else if (!(position > 0 && position <= queue.songs.length - 1)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("There is no song at this position!"),
        ],
      });
    } else if (queue.songs.length == 1) {
      await queue.stop();
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    } else {
      await queue.jump(position);
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setColor("Blue").setDescription("Song skipped!"),
        ],
      });
    }
  },
};
