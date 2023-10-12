const fs = require("fs");

const handleEvents = (client) => {
  const events = fs
    .readdirSync(`${process.cwd()}/events/`)
    .filter((file) => file.endsWith(".js"));
  for (const file of events) {
    let eventName = file.split(".")[0];
    const event = require(`${process.cwd()}/events/${file}`);
    console.log(`Loading Event: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  }
};

module.exports = handleEvents;
