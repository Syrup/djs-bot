module.exports = {
  id: "animals",
  run(client, sm) {
    sm.reply({ content: `Aku juga suka ${sm.values[0]} :heart:`, ephemeral: true })
  }
}