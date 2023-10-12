const { ActivityType } = require("discord.js");

module.exports = async function (client) {
  console.log(`${client.user.tag} is ready to play music.`);
  client.user.setActivity("d-_-b", { type: ActivityType.Custom });
};
