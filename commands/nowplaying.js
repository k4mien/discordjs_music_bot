const Discord = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(`There is nothing in the queue right now!`);
    const song = queue.songs[0];
    const embed = new Discord.EmbedBuilder()
      .setColor("Red")
      .setTitle("Now playing")
      .setDescription(
        `[${song.name}](${song.url})
      \`[${queue.formattedCurrentTime} / ${song.formattedDuration}]\``
      )
      .setThumbnail(song.thumbnail)
      .addFields({ name: " ", value: " " })
      .setFooter({
        text: `Requested by: ${song.user.username}`,
        iconURL: song.user.displayAvatarURL(),
      });
    message.channel.send({ embeds: [embed] });
  },
};
