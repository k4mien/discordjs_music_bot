const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "loop",
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

    let mode = null;

    if (!args[0]) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription(
              "The current loop mode is: " + (mode == 1 ? "on" : "off")
            ),
        ],
      });
    }

    switch (args[0]) {
      case "off":
        mode = 0;
        break;
      case "on":
        mode = 1;
        break;
    }

    if (mode != null) {
      mode = queue.setRepeatMode(mode);
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription(
              mode == "0"
                ? "The player is no longer on repeat"
                : "The player will now repeat the current track"
            ),
        ],
      });
    }
  },
};
