const glob = require("glob")

module.exports = {
  name: "events",
  run(client) {
    const files = glob.sync(`${process.cwd()}/events/**/*.js`)
      
    files.forEach(file => {
      let event = require(file)
      
      client.on(event.event, event.run.bind(null, client))
    })
  }
}