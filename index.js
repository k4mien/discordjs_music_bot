const { Client, Partials, IntentsBitField } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
  intents: new IntentsBitField(131071),
  shards: "auto",
});

client.prefix = config.prefix;

fs.readdirSync(`./handlers`).forEach((file) => {
  let fileName = file.split(".")[0];
  console.log(`Loading Handler: ${fileName}`);
  require(`./handlers/${file}`)(client);
});

client.on("stateChange", (oldState, newState) => {
  const oldNetworking = Reflect.get(oldState, "networking");
  const newNetworking = Reflect.get(newState, "networking");

  const networkStateChangeHandler = () => {
    const newUdp = Reflect.get(newNetworkState, "udp");
    clearInterval(newUdp?.keepAliveInterval);
  };

  oldNetworking?.off("stateChange", networkStateChangeHandler);
  newNetworking?.on("stateChange", networkStateChangeHandler);
});

client.on("error", (error) => console.log(error));
client.on("warn", (info) => console.log(info));
process.on("unhandledRejection", (error) => console.log(error));
process.on("uncaughtException", (error) => console.log(error));

client.login(config.token);
