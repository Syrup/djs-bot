const { Client, GatewayIntentBits } = require("discord.js")
const Keyv = require("keyv")
const util = require("./utils")
const keyv = new Keyv(process.env.POSTGRES_URL)

class MyClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds]
    })

    this.db = keyv
    this.util = util
    this.commands = new Map()
    this.buttons = new Map()
    this.selectMenus = new Map()
  }

  async start() {
    await this.login(process.env.TOKEN)
    this.util.events(this)
    this.util.buttons(this)
    this.util.commands(this)
    this.util.selectMenu(this)
  }
}

module.exports = MyClient