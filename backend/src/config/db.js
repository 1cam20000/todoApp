import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
    );
    console.log("🚀 ~ Connected to MongoDB");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
    process.exit(1);
  }
};

export default connectDB;
