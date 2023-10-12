const { EmbedBuilder } = require("discord.js");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
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

    const previousPage = new ButtonBuilder()
      .setLabel("<--")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("btnPrevious");

    const nextPage = new ButtonBuilder()
      .setLabel("-->")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("btnNext");

    const buttonRow = new ActionRowBuilder().addComponents(
      previousPage,
      nextPage
    );

    const embed = new EmbedBuilder()
      .setTitle("In Queue\n\n")
      .setColor("Blue")
      .setDescription("tmp");

    const reply = await message.channel.send({
      embeds: [embed],
      components: [buttonRow],
    });

    const filter = (i) => i.user.id === message.author.id;

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter,
    });

    collector.on("collect", (interaction) => {
      if (interaction.customId === "btnPrevious") {
        // generate previous embed with previous songs in the queue, if 1st page, then do nothing
        return;
      }
      if (interaction.customId === "btnNext") {
        // generate next embed with next songs in the queue, if last page, then do nothing
        return;
      }
    });

    collector.on("end", () => {
      previousPage.setDisabled(true);
      nextPage.setDisabled(true);

      reply.edit({
        content: "test",
        components: [buttonRow],
      });
    });
    // const q = queue.songs
    //   .map(
    //     (song, i) =>
    //       `${i === 0 ? "**Now Playing:**" : `${i}.`} [${song.name}](${
    //         song.url
    //       }) - \`[${song.formattedDuration}]\`, added by: **${
    //         song.user.displayName
    //       }**\n`
    //   )
    //   .join("\n");
  },
};
