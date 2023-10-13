const { EmbedBuilder } = require("discord.js");
const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
  options: "",
  description: "Display all songs in the queue",
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

    const previousButton = new ButtonBuilder()
      .setLabel("Previous")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("previous-button")
      .setDisabled(true);

    const nextButton = new ButtonBuilder()
      .setLabel("Next")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("next-button");

    const buttonRow = new ActionRowBuilder().addComponents(
      previousButton,
      nextButton
    );

    let currentPage = 0;

    const embeds = embedGenerator(queue);

    const queueEmbed = await message.channel.send({
      embeds: [embeds[currentPage]],
      components: [buttonRow],
    });

    const filter = (i) => i.user.id === message.author.id;

    const collector = queueEmbed.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter,
      //time: 10_000
    });

    collector.on("collect", (interaction) => {
      if (interaction.customId === "next-button") {
        if (currentPage < embeds.length - 1) {
          currentPage += 1;
          interaction.update({
            embeds: [embeds[currentPage]],
            components: [buttonRow],
          });
        }
      } else if (interaction.customId === "previous-button") {
        if (currentPage !== 0) {
          currentPage -= 1;
          interaction.update({
            embeds: [embeds[currentPage]],
            components: [buttonRow],
          });
        }
      }
    });

    collector.on("end", () => {
      previousButton.setDisabled(true);
      nextButton.setDisabled(true);

      queueEmbed.edit({
        components: [buttonRow],
      });
    });
  },
};

function embedGenerator(queue) {
  const embeds = [];
  let songs = 16;
  for (let i = 0; i < queue.songs.length; i += 15) {
    const current = queue.songs.slice(i + 1, songs);
    songs += 15;
    let j = i;
    const info = current
      .map(
        (song) =>
          `${++j}.[ ${song.name}](${song.url}) - \`[${
            song.formattedDuration
          }]\`, added by: **${song.user.displayName}**`
      )
      .join("\n");
    const msg = new EmbedBuilder()
      .setTitle("In Queue:\n\n")
      .setColor("Blue")
      .setDescription(
        `**Now Playing:** [${queue.songs[0].name}](${queue.songs[0].url}) - \`[${queue.songs[0].formattedDuration}]\`, added by: **${queue.songs[0].user.displayName}**\n\n${info}`
      );
    embeds.push(msg);
  }
  return embeds;
}
