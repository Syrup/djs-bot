const glob = require("glob")

module.exports = {
  name: "selectMenu",
  run(client) {
    const files = glob.sync(`${process.cwd()}/selectMenus/**/*.js`)

    files.forEach(file => {
      const sm = require(file)
      console.log(file, sm)

      client.selectMenus.set(sm.id, sm)
    })
  }
}