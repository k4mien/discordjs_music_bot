const client = require("./bot.js");
const error = require("./events/error.js");
const handleCommands = require("./handlers/commandHandler");
const handleEvents = require("./handlers/eventHandler");

error(client);
handleCommands(client);
handleEvents(client);
