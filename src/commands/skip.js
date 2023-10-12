module.exports = {
  name: "skip",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(`There is nothing in the queue right now!`);
    if (queue.songs.length == 1) {
      await queue.stop();
      message.channel.send(`Skipped!`);
    } else {
      await queue.skip();
      message.channel.send(`Skipped!`);
    }
  },
};
