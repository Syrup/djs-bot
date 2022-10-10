module.exports = {
  name: "balance",
  description: "Check your money in your wallet/bank",
  category: "economy",
  options: [
    {
      type: "user",
      name: "user",
      description: "Check other user balance",
    },
  ],
  run(client, msg, { user }) {
    let bal;

    if (user) {
      // bal = client.db.get(`users.${user}`)
      console.log(user);
    }
  },
};
