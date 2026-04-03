import dns from "node:dns";
import mongoose from "mongoose";
import { ENV } from "./env.js";

// Manually set DNS servers to Google DNS to bypass potential network blocks on SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    // Log the URI with masked password for debugging
    const maskedUri = MONGO_URI.replace(/:([^@]+)@/, ":****@");
    console.log("Connecting to MongoDB:", maskedUri);

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    // process.exit(1); 
  }
};
