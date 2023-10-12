const distube = require("../distube");

module.exports = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string)
      return message.channel.send(
        `Please enter a song url or query to search.`
      );
    distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
    });
  },
};
