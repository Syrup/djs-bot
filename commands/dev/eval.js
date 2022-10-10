const { inspect } = require("util");

module.exports = {
  name: "eval",
  description: "evaluate code",
  options: [
    {
      type: "string",
      name: "code",
      description: "Code to evaluate",
      required: true,
    },
    {
      type: "boolean",
      name: "async",
      description: "Run code inside asynchronous function",
    },
    {
      type: "boolean",
      name: "silent",
      description: "Run without send log message",
    },
  ],

  run(client, msg, { code, async, silent }) {
    let result = eval(async ? `(async()=>{${code}})()` : code);
    let inspectedResult =
      typeof result === "string" ? result : inspect(result, { depth: 0 });
    console.log(typeof result, typeof inspectedResult);

    result = inspectedResult.replace(
      new RegExp(process.env.TOKEN, "gi"),
      "[TOKEN]"
    );

    if (silent) msg.reply("No return");

    msg.reply({ content: `\`\`\`js\n${result}\n\`\`\`` });
  },
};
