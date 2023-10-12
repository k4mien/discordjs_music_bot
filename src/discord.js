const { Client, GatewayIntentBits } = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.prefix = prefix;

module.exports = client;

client.login(token);
