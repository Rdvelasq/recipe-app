import express, { json } from "express";
import mongoose from "mongoose";
import env from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";
import cors from "cors";
env.config();

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());

app.use("/api/recipes", recipeRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("Connected to database");
  } catch (e) {
    console.log("Unable to connect to database ", e);
  }
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
};

start();
