module.exports = {
  event: "ready",
  run(client) {
    console.log(`${client.user.tag} is ready!`)
    console.log("Hi, jovan!")
  }
}