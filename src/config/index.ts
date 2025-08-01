import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.DATABASE_URL || "mongodb://localhost:27017/assignment-db",
  jwt_secret: process.env.JWT_SECRET || "defaultSecret",
};
