import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  const opts = {
    bufferCommands: false,
  };

  cached.promise = mongoose.connect(uri, opts).then((mongoose) => mongoose);
  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectDB;
