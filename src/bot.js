const { Client, GatewayIntentBits } = require("discord.js");
const { prefix, token } = require("./config.json");
const { DisTube } = require("distube");
const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.distube = new DisTube(client, {
  searchSongs: 0,
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: false,
  emitAddListWhenCreatingQueue: true,
  emitAddSongWhenCreatingQueue: true,
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 4,
  },
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

client.distube
  .on("addList", (queue, playlist) => {
    const embed = new EmbedBuilder().setColor("Blue").setDescription(
      `**[${playlist.name}](${playlist.url})** playlist has been added to the queue.
        \`(${playlist.songs.length} songs)\``
    );
    queue.textChannel.send({ embeds: [embed] });
  })
  .on("addSong", (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(
        `**[${song.name}](${song.url})** has been added to the queue.\n`
      );
    queue.textChannel.send({ embeds: [embed] });
  })
  .on("empty", (queue) => {
    queue.textChannel.send("Channel is empty. Disconnected!");
  })
  .on("error", (channel, e) => {
    if (channel)
      channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`);
    else console.error(e);
  })
  .on("playSong", (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Playing")
      .setDescription(
        `[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``
      )
      .setThumbnail(song.thumbnail);
    queue.textChannel.send({ embeds: [embed] });
  })
  .on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
  });

client.prefix = prefix;
client.login(token);

module.exports = client;
