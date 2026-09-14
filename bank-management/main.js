import * as BankUtils from "./libs/bankUtils.js";
import MongoLogin from "./private.json" with { type: "json" };

main();

async function main() {
  const uri = `mongodb+srv://${MongoLogin.user}:${MongoLogin.pass}@cluster0.8eecrrx.mongodb.net/?appName=Cluster0`;
  const client = BankUtils.getClient(uri);

  let userAccounts = await BankUtils.getAllUserAccounts(client);

  console.log("[DEBUG] BEFORE UPDATE");
  for (const userAcc of userAccounts) {
    userAcc.displayUserAccountData();
  }

  await BankUtils.updateUserAccountAmount(client, "testing@gmail.com", 1);

  userAccounts = await BankUtils.getAllUserAccounts(client);

  console.log("[DEBUG] AFTER UPDATE");
  for (const userAcc of userAccounts) {
    userAcc.displayUserAccountData();
  }
}
