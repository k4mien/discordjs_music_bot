const { Collection } = require("discord.js");
const fs = require("fs");

module.exports = async (client) => {
  client.commands = new Collection();
  client.aliases = new Collection();

  const commands = fs
    .readdirSync(`${process.cwd()}/commands/`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commands) {
    const command = require(`${process.cwd()}/commands/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(command.name, command);
    if (command.aliases)
      command.aliases.forEach((alias) =>
        client.aliases.set(alias, command.name)
      );
  }
};
