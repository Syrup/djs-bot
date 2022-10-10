module.exports = {
  name: "ping",
  description: "Ping a command",
  options: [
    {
      type: "boolean",
      name: "hi",
      description: "Hii",
      run(opt) {},
    },
  ],
  async run(client, msg, { hi }) {
    // await msg.deferReply()
    await msg.reply({
      content: "ping :ping_pong:",
      components: [
        client.util.createButton({
          id: "ping",
          style: "primary",
          label: "Ping",
        }),
      ],
    });

    if (hi) await msg.followUp({ content: "Hello", ephemeral: true });
    if (typeof hi !== "undefined" && hi === false)
      await msg.followUp({ content: "No Hello", ephemeral: true });
  },
};
