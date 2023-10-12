const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = async (client, message, result) => {
  let i = 0;
  const songsList = new EmbedBuilder()
    .setColor("Red")
    .setTitle("**Choose an option from below**")
    .setDescription(
      `${result
        .map(
          (song) => `**${++i}**. ${song.name} - \`[${song.formattedDuration}]\``
        )
        .join("\n\n")}`
    );

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder().setCustomId("1").setLabel("1").setStyle("Primary")
    )
    .addComponents(
      new ButtonBuilder().setCustomId("2").setLabel("2").setStyle("Primary")
    )
    .addComponents(
      new ButtonBuilder().setCustomId("3").setLabel("3").setStyle("Primary")
    )
    .addComponents(
      new ButtonBuilder().setCustomId("4").setLabel("4").setStyle("Primary")
    )
    .addComponents(
      new ButtonBuilder().setCustomId("5").setLabel("5").setStyle("Primary")
    );
  message.channel.send({ embeds: [songsList], components: [buttons] });
};
