exports.checkOptionType = (module, command) => {
  module.forEach(option => {
    switch(option.type) {
      case "integer":
        command.addIntegerOption(opt => {           return opt             .setName(option.name)             .setDescription(option.description)             .setRequired(option?.required ? true : false)
                                        })
        break;

      case "boolean":
        command.addBooleanOption(opt => {           return opt             .setName(option.name)             .setDescription(option.description)             .setRequired(option?.required ? true : false)         })
        break;
      
      case "string":
        command.addStringOption(opt => {           return opt             .setName(option.name)             .setDescription(option.description)             .setRequired(option?.required ? true : false)         })
        break;

      case "number":
        command.addNumberOption(opt => {
          return opt
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(option?.required ? true : false)
        })
        break;

      case "role":
        command.addRoleOption(opt => {
          return opt
            .setName(option.name)
            .setDescription(option.description)
            .setRequired(option?.required ? true : false)
        })
          
        break;

      case "mentionable":
        command.addMentionableOption(opt => {           return opt             .setName(option.name)             .setDescription(option.description)             .setRequired(option?.required ? true : false)         })
        break;

      case "channel":
        command.addChannelOption(opt => {           return opt             .setName(option.name)             .setDescription(option.description)             .setRequired(option?.required ? true : false)         })
        break;

      case "attachment":
        command.addAttachmentOption(opt => {           return opt             .setName(option.name)             .setDescription(option.description)             .setRequired(option?.required ? true : false)         })
        break;
    }
  })
}