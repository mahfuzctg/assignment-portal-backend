export const authConstants = {
  jwt: {
    secret: process.env.JWT_SECRET || "superSecretKey",
    expiresIn: "7d",
  },
};
