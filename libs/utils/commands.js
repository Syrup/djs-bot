const { REST, Routes } = require("discord.js")
const { checkOptionType } = require("./functions")
const { SlashCommandBuilder } = require("@discordjs/builders")
const glob = require("glob")
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

module.exports = {
  name: "commands",
  async run(client) {
    const files = glob.sync(`${process.cwd()}/commands/**/*.js`)

    console.log("Starting registering application commands")
    try {
      let commands = []
      files.forEach(async file => {
        let module = require(file)
        // console.log(module)

        
  
        let builder = new SlashCommandBuilder()
        .setName(module.name)
        .setDescription(module.description)

        if(module.options) {
          checkOptionType(module.options, builder)
        }

        if(module.subcommands) {
          module.subcommands.forEach(sbc => {
            
            builder.addSubcommand(subc => {
              
              
              if(sbc.options)
                checkOptionType(sbc.options, subc)
              return subc
                .setName(sbc.name)
                .setDescription(sbc.description)
            })
            
          })
        }

        let json = builder.toJSON()
        module.category = file.split("/")[5]
        // console.log(json.category)
        commands.push(json)

        

        client.commands.set(module.name, module)
        console.log(`Registering ${module.name}.`)
      })

      
      await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
      
    } catch (err) {
      console.error(err)
    }
    console.log("Finish registering application commands.")
  }
}