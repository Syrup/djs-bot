const Client = require("./libs/Client")
const client = new Client()

client.on("debug", console.log)
client.on("error", console.log)

client.start()

//hy ad ap yh
// hy juga tdk apap