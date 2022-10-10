const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders")


module.exports = {
  name: "createSelectMenu",
  run(opt) {
    const menu = new SelectMenuBuilder()
      .setCustomId(opt.id)
      .setPlaceholder(opt.placeholder)
      .addOptions(...opt.options)

    if(opt?.min) menu.setMinValues(opt.min)
    if(opt?.max) menu.setMaxValues(opt.max)

    const row = new ActionRowBuilder().addComponents(menu)

    return row
    
  }
}