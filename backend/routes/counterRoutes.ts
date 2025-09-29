import express from "express";
import Counter from "../models/counterModel.js";

const router = express.Router();

// get one counter by userId
router.post("/getOne", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const counter = await Counter.findOne({ userId });
  res.json({ counter });
});

// create a new counter
router.post("/create", async (req, res) => {
  const userId = req.body.userId;
  const count = req.body.count;
  const counter = await Counter.create({ userId, count });
  res.json({ counter });
});

// update the count
router.post("/update", async (req, res) => {
  const userId = req.body.userId;
  const count = req.body.count;

  const counter = await Counter.findOneAndUpdate(
    { userId },
    { count },
    { new: true }
  );

  res.json({ counter });
});

export default router;
