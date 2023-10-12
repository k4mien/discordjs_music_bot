const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const query = args.join(" ");
    if (!query)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("Please enter a song url or query to search."),
        ],
      });
    try {
      client.distube.play(voiceChannel, query, {
        member: message.member,
        textChannel: message.channel,
        message,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
