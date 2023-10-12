const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "leave",
  description: "Disconnect bot from the channel",
  options: "",
  run: async (client, message) => {
    const voiceChannel = message.member.voice.channel;
    const botMember = message.guild.members.cache.get(message.client.user.id);

    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("You have to be in a voice channel!"),
        ],
      });
    } else if (botMember.voice?.channelId) {
      const botVoiceChannelId = botMember.voice.channelId;
      if (voiceChannel?.id == botVoiceChannelId) {
        client.distube.voices.leave(message);
        return message.channel.send({
          embeds: [
            new EmbedBuilder().setColor("Blue").setDescription("Disconnected!"),
          ],
        });
      } else if (voiceChannel?.id != botVoiceChannelId) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("Blue")
              .setDescription("You have to be in the same channel"),
          ],
        });
      }
    } else {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("I'm already disconnected!"),
        ],
      });
    }
  },
};
