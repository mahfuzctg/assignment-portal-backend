import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error(" Missing JWT_SECRET in environment variables");
}

if (!process.env.DATABASE_URL) {
  throw new Error(" Missing DATABASE_URL in environment variables");
}

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
};
