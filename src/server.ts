import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const startServer = async () => {
  try {
    await mongoose.connect(config.db_url);
    console.log("🟢 MongoDB Connected");

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect:", err);
  }
};

startServer();
