const { DisTube } = require("distube");
const fs = require("fs");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

module.exports = async (client) => {
  const distube = new DisTube(client, {
    searchSongs: 0,
    leaveOnStop: false,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
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

  client.distube = distube;

  const events = fs
    .readdirSync(`${process.cwd()}/events/distube`)
    .filter((file) => file.endsWith(".js"));
  for (const file of events) {
    let eventName = file.split(".")[0];
    const event = require(`${process.cwd()}/events/distube/${file}`);
    console.log(`Loading Distube Events ${eventName}`);
    client.distube.on(eventName, event.bind(null, client));
  }
};
