const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
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
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "**Now Playing:**" : `${i}.`} [${song.name}](${
            song.url
          }) - \`[${song.formattedDuration}]\`, added by: **${
            song.user.displayName
          }**\n`
      )
      .join("\n");
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`In Queue\n\n`)
          .setDescription(`${q}`),
      ],
    });
  },
};
