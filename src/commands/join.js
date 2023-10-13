const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "join",
  description: "Connect bot to the channel",
  options: "",
  run: async (client, message) => {
    let voiceChannel = message.member.voice.channel;
    const botMember = message.guild.members.cache.get(message.client.user.id);

    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setDescription("You have to be in a voice channel!"),
        ],
      });
    } else if (!botMember.voice?.channelId) {
      await client.distube.voices.join(voiceChannel);
      return message.channel.send({
        embeds: [new EmbedBuilder().setColor("Blue").setDescription("Joined!")],
      });
    } else if (botMember.voice?.channelId) {
      const botVoiceChannelId = botMember.voice.channelId;
      if (voiceChannel?.id != botVoiceChannelId) {
        await client.distube.voices.join(voiceChannel);
        return message.channel.send({
          embeds: [
            new EmbedBuilder().setColor("Blue").setDescription("Joined!"),
          ],
        });
      } else {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("Blue")
              .setDescription("I'm already in this channel"),
          ],
        });
      }
    }
  },
};
