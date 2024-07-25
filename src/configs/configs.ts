import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: process.env.APP_HOST,

  MONGO_URL: process.env.MONGO_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRE_IN: process.env.JWT_ACCESS_EXPIRE_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE_IN: process.env.JWT_REFRESH_EXPIRE_IN,

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
