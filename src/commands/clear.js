module.exports = {
  name: "clear",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(`There is nothing in the queue right now!`);
    queue.stop();
    message.channel.send(`Cleared all songs in queue!`);
  },
};
