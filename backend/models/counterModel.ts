import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Counter = mongoose.model("Counter", counterSchema);
export default Counter;
