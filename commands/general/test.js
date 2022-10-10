module.exports = {
  name: "test",
  description: "test command",
  subcommands: [
    {
      name: "hello",
      description: "Hey",
      options: [
        {
          type: "boolean",
          name: "hy",
          description: "Hey",
          run(opt) {},
        },
      ],
    },
    {
      name: "attachment",
      description: "attachment option",
      options: [
        {
          type: "attachment",
          name: "setattachment",
          description: "Set Attachment",
          run(opt) {},
        },
      ],
    },
  ],

  run(client, msg, { hello, attachment }) {
    console.log(attachment);
    if (attachment)
      return msg.reply({
        content: attachment[0]?.attachment.name,
        files: [attachment[0]?.attachment],
      });

    // console.log()

    msg.reply({
      content: "testing",
      components: [
        client.util.createButton(
          { url: "https://discord.js.org/", label: "discordjs", style: "link" },
          "url"
        ),
        client.util.createSelectMenu({
          id: "animals",
          placeholder: "Apa hewan favoritmu?",
          options: [
            {
              label: "Kucing",
              value: "kucing",
              description: "Ini kucing",
            },
          ],
        }),
      ],
    });
  },
};
