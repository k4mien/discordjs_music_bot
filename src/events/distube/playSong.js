const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Playing")
    .setDescription(
      `[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``
    )
    .setThumbnail(song.thumbnail);
  queue.textChannel.send({ embeds: [embed] });
};
