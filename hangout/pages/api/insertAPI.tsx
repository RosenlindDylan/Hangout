import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test1");
    const { name, time } = req.body;

    const post = await db.collection("test1").insertOne({
      name,
      time,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
  }
};