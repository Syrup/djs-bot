const glob = require("glob")

module.exports = {
  name: "buttons",
  run(client) {
    const files = glob.sync(`${process.cwd()}/buttons/**/*.js`)
    
    files.forEach(file => {
      const btn = require(file)

      client.buttons.set(btn.id, btn)
    })
  }
}