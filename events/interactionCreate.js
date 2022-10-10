module.exports = {
  event: "interactionCreate",
  run(client, interaction) {
    if(interaction.isChatInputCommand()) {
      let command = client.commands.get(interaction.commandName)
      let args = {}
      
      if(interaction.options.data)
interaction.options.data.forEach(opt=> opt.options ? args[opt.name] = opt.options : args[opt.name] = opt.value)
  
      if(command) {
        command.run(client, interaction, args)
      }
    }

    if(interaction.isButton()) {
      let button = client.buttons.get(interaction.customId)
      console.log(client.buttons)
      
      if(button) {
        button.run(client, interaction)
      }
    }

    if(interaction.isSelectMenu()) {
      let sm = client.selectMenus.get(interaction.customId)
      console.log(sm)

      if(sm) sm.run(client, interaction)
    }
  }
}