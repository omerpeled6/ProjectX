import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import counterRoutes from "./routes/counterRoutes.ts";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/counter", counterRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURI!, { dbName: "demo_db" })
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "Connected to db & listening on port",
        process.env.PORT || 4000
      );
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
