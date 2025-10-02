import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import counterRoutes from "./routes/counterRoutes";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running!!!" });
});

app.use("/counter", counterRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURI!, { dbName: "demo_db" })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        "Connected to db & listening on port",
        process.env.PORT || 3000
      );
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
