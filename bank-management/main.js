import * as BankUtils from "./libs/bankUtils.js";
import MongoLogin from "./private.json" with { type: "json" };
import UserAccount from "./models/UserAccount.js";

main();

async function main() {
  const uri = `mongodb+srv://${MongoLogin.user}:${MongoLogin.pass}@cluster0.8eecrrx.mongodb.net/?appName=Cluster0`;
  const client = BankUtils.getClient(uri);

  await BankUtils.insertNewUserAccount(
    new UserAccount("xx@gmail.com", "THEBEST", 239338).jsonClassMembers,
    client,
    "bank",
    "test",
  );

  let result = await BankUtils.checkIfUserAccountExist("12@gmail.com", client);
  console.log(result);
}
