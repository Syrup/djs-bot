const glob = require("glob")

const modules = glob.sync(`${process.cwd()}/libs/utils/**/*.js`)

modules.forEach(module => {
  if(module.endsWith("index.js")) return

  const mod = require(module)

  exports[mod.name] = mod.run
})