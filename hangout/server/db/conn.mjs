import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log('connection successful')
} catch(e) {
  console.error(e);
}

let db = conn.db("test1");

export default db;
