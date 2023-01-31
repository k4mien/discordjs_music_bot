module.exports = async (channel, e) => {
  if (channel)
    channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`);
  else console.error(e);
};
