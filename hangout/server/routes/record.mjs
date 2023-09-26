import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all method
router.get("/", async (req, res) => {
  let collection = await db.collection("hangout");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// get by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("hangout");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// post method
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    date: req.body.date,
  };
  let collection = await db.collection("hangout");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// update by id
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      date: req.body.date,
    }
  };

  let collection = await db.collection("hangout");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// delete by id
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("hangout");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// delete all
router.delete("/deleteAll", async (req, res) => {
  const collection = db.collection("hangout");
  
  let result = await collection.deleteMany({});
  res.send(result).status(200);
});

export default router;