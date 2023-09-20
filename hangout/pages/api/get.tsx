import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test1");

    const posts = await db.collection("test1").find({}).limit(20).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
  }
};
