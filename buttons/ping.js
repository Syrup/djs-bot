module.exports = {
  id: "ping",
  run(client, btn) {
    btn.reply({ content: "Button clicked!", ephemeral: true })
  }
}