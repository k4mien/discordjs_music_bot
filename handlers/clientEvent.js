const fs = require("fs");

module.exports = async (client) => {
  const events = fs
    .readdirSync(`${process.cwd()}/events/client`)
    .filter((file) => file.endsWith(".js"));
  for (const file of events) {
    let eventName = file.split(".")[0];
    const event = require(`${process.cwd()}/events/client/${file}`);
    console.log(`Loading Client Events ${eventName}`);
    client.on(eventName, event.bind(null, client));
  }
};
