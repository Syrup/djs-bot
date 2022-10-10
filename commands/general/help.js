const { EmbedBuilder, Collection, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Do you know? there are several commands available in this bot",
  options: [
    {
      type: "string",
      name: "command",
      description: "Command name",
      autocomplete: true,
    },
  ],

  async run(client, msg, { command }) {
    await msg.deferReply({ ephemeral: false })
    const embed = new EmbedBuilder()
      .setColor("#4e5d94")
      .setFooter({ text: "Help" });

    if (!command) {
      let commands = [...new Set(client.commands.values())];
      let category = new Collection();
      const categoriess = new Set();
      const fields = [];

      commands.forEach((cmd) => {
        if (cmd.ownerOnly && !owners.includes(message.author.id)) return;
        const cmdCategory = cmd.category || "Misc";
        categoriess.add(cmdCategory);
      });
      
      categoriess.forEach((cat) => {
        const field = [];
        commands.forEach((cmd) => {
          if (cmd.ownerOnly && !owners.includes(message.author.id)) return;
          if (!cmd.category && cat == "Misc") field.push(cmd);
          if (cmd.category == cat) field.push(cmd);
        });
        let fieldName = cat[0].toUpperCase() + cat.substr(1);

        fields.push({
          name: fieldName,
          value: field.map((cmd) => `\`${cmd.name}\``).join(" - "),
          inline: false,
        });
      });

      embed
        .setTitle(`${client.user.tag} helps`)
        .setDescription(
          "use `command:` option to see detailed information about command"
        )
        //.addFields(...fields);
      let categories = [...categoriess]

      const row = new ActionRowBuilder().addComponents([
        new SelectMenuBuilder()
          .setCustomId("help-category")
          .setPlaceholder(
            `Select Categories`
          )
          .setMaxValues(1)
          .setMinValues(1)
          /// Map the categories to the select menu
          .setOptions(
            categories.map((category) => {
              return new SelectMenuOptionBuilder()
                .setLabel(category)
                .setValue(category);
            })
          ),
      ]);


      await msg
        .editReply({ embeds: [embed], components: [row], fetchReply: true })
        .then(async (msgg) => {
          let filter = (i) =>
            i.isSelectMenu() && i.user && i.message.author.id == client.user.id;
          let collector = await msgg.createMessageComponentCollector({
            filter,
            time: 60000,
          });
          collector.on("collect", async (m) => {
            if (m.isSelectMenu()) {
              if (m.customId === "help-category") {
                await m.deferUpdate();
                let [directory] = m.values;
                //console.log(m, m.values, directory)

                const cmd = commands.filter((c) => c.name === "music");

                const embed = new EmbedBuilder()
                  .setAuthor({
                    name: `${client.user.tag} Help Command!`,
                    iconURL: msg.guild.iconURL({ dynamic: true }),
                  })
                  .setDescription(`Hi`)
                  .setThumbnail(
                    client.user.displayAvatarURL({ dynamic: true, size: 2048 })
                  )
                  .setColor('#000001')
                  .addFields({
                    name: `❯  ${directory.charAt(0) + directory.slice(1)}`,
                    value: `${commands
                      .filter((c) => c.category === directory)
                      .map((c) => `\`${c.name}\``)
                      .join(" - ")}`,
                    inline: false,
                  })
                  .setFooter({
                    text: `Total Commands: ${commands.length}`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                  });

                msgg.edit({ embeds: [embed] });
              }
            }
          });

          collector.on("end", async (collected, reason) => {
            if (reason === "time") {
              const timed = new EmbedBuilder()
                .setDescription(
                  `⏰ | Timeout`
                )
                .setColor('#000001');

              msgg.edit({ embeds: [timed], components: [] });
            }
          });
        });
    }
    console.log(command)

    const cmd = client.commands.get(command);

    if (!cmd) return msg.editReply(`Command \`${command}\` not found`);
    const options = cmd.options.map((x) => {
      return {
        name: "Options:",
        value: `${x.name} (${x.type}): ${x.description}`,
      };
    });

    embed
      .setTitle(cmd.name)
      .setDescription(cmd.description)
      .addFields(...options);

    msg.editReply({
      content: `This is information about ${cmd.name} command, can i help you?`,
      embeds: [embed],
    });
  },
};
