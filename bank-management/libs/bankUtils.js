import { MongoClient } from "mongodb";
import UserAccount from "../models/UserAccount.js";

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
  client,
  UserAccount,
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

export async function checkIfUserAccountExist(client, email) {
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

export async function getAllUserAccounts(client) {
  let userAccounts = [];

  try {
    await client.connect();
    const userAccCollection = client.db("bank").collection("test");
    const userCursor = userAccCollection.find();

    for await (const userAcc of userCursor) {
      userAccounts.push(
        new UserAccount(
          userAcc.email,
          userAcc.password,
          userAcc.amount,
          userAcc._id,
        ),
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    return userAccounts;
  }
}

export async function updateUserAccountAmount(client, email, amount) {
  try {
    await client.connect();
    const userAccCollection = await client.db("bank").collection("test");
    await userAccCollection.updateOne(
      { email: email },
      { $set: { amount: amount } },
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
