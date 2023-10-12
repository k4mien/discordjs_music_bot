const Discord = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`There is nothing playing!`);
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "**Now Playing:**" : `${i}.`} [${song.name}](${
            song.url
          }) - \`[${song.formattedDuration}]\`, added by: **${
            song.user.username
          }**\n`
      )
      .join("\n");
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor("Red")
          .setTitle(`In Queue\n\n`)
          .setDescription(`${q}`),
      ],
    });
  },
};
