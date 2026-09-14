import { MongoClient } from "mongodb";

export function getClient(uri) {
  return new MongoClient(uri);
}

export async function createNewCollection(
  client,
  databaseName,
  collectionName,
) {
  try {
    await client.connect();
    const database = await client.db(databaseName);
    await database.createCollection(collectionName);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function insertNewUserAccount(
  UserAccount,
  client,
  databaseName,
  collectionName,
) {
  try {
    await client.connect();
    const database = await client.db(databaseName);
    const collection = await database.collection(collectionName);
    const result = await collection.insertOne(UserAccount);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

export async function checkIfUserAccountExist(email, client) {
  let flag = false;
  try {
    await client.connect();
    const userAccounts = client.db("bank").collection("test");
    const userCursor = userAccounts.find();

    for await (const userAcc of userCursor) {
      if (email == userAcc.email) {
        flag = true;
        break;
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    return flag;
  }
}
