module.exports = async function (client) {
  client.on("error", (error) => {
    console.error(error);
  });

  client.on("warn", (info) => {
    console.log(info);
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
  });

  process.on("uncaughtException", (error) => {
    console.log(error);
  });
};
