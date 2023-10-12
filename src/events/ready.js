const { ActivityType } = require("discord.js");

module.exports = async function (client) {
  console.log(`${client.user.tag} is ready to play music.`);
  client.user.setActivity("your-message", { type: ActivityType.Custom });
};
