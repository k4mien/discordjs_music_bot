const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  const embed = new EmbedBuilder()
    .setColor("Red")
    .setDescription(
      `**[${song.name}](${song.url})** has been added to the queue.\n`
    );
  queue.textChannel.send({ embeds: [embed] });
};
