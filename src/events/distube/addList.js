const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {
  const embed = new EmbedBuilder().setColor("Red").setDescription(
    `**[${playlist.name}](${playlist.url})** playlist has been added to the queue.
      \`(${playlist.songs.length} songs)\``
  );
  queue.textChannel.send({ embeds: [embed] });
};
