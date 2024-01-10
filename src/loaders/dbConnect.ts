import mongoose from "mongoose";
import config from "../config/config";
const DB_URL: string = config.DB_URL || ""
export function db(): void {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((error) => {
      console.error(`Error connecting to the database: ${error}`);
    });
}
