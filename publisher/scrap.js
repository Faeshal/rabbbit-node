require("pretty-error").start();
const axios = require("axios").default;
const log = require("log4js").getLogger("scrap-publisher");
log.level = "info";
const rabbitConn = require("../util/rabbitConn");

async function scrapPublisher(options) {
  try {
    // * Fetch Data
    const result = await axios.get(options.url).catch((err) => log.error(err));
    const msgBuffer = Buffer.from(JSON.stringify({ user: Date() }));

    // * Prepare Push to rabbit
    const connection = await rabbitConn();
    const channel = await connection.createChannel();
    await channel.assertQueue("number");
    await channel.sendToQueue("number", msgBuffer);
    log.info("success push to rabbit....");

    // * Close the connection
    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}

module.exports = scrapPublisher;
