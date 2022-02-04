require("pretty-error").start();
const log = require("log4js").getLogger("scrap-consumer");
log.level = "info";
const rabbitConn = require("../util/rabbitConn");

async function consumePublisher() {
  try {
    const connection = await rabbitConn();
    const channel = await connection.createChannel();
    await channel.assertQueue("number");
    channel.consume("number", (message) => {
      const input = JSON.parse(message.content.toString());
      log.debug("data from publisher:", input);
      channel.ack(message);
    });
    log.info(`Waiting for messages...`);
  } catch (ex) {
    console.error(ex);
  }
}

module.exports = consumePublisher;
