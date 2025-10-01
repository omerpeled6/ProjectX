import express from "express";
import Counter from "../models/counterModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const counter =
    (await Counter.findOne()) || (await Counter.create({ count: 0 }));
  res.json({ counter });
  console.log(counter.count);
});

router.post("/update", async (req, res) => {
  const { count } = req.body;
  const counter = await Counter.findOneAndUpdate(
    {},
    { count },
    { new: true, upsert: true }
  );
  res.json({ counter });
  console.log(counter.count);
});

export default router;
