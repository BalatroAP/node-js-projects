import User from "./classes/User.js";

function main() {
  let newUser = new User(1, "Balatro", "BalatroAP@protonmail.com", 27);

  newUser.displayAllInfo();
}

main();
