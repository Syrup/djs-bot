const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders")

module.exports = {
  name: "createButton",
  run(opt, type) {
    let styles = {
      primary: 1,
      secondary: 2,
      success: 3,
      danger: 4,
      link: 5
    }
    console.log(opt.style)
    
    let btn = new ButtonBuilder()
    .setStyle(styles[opt.style.toLowerCase()])
    .setLabel(opt.label)

    
    if(typeof type !== "undefined" && type === "url") btn.setURL(opt.url)
    else btn.setCustomId(opt.id)

    if(opt?.emoji) btn.setEmoji(opt?.emoji)

    //console.log(btn.toJSON())

    let row = new ActionRowBuilder().addComponents(btn)
    

    return row
  }
}