const mongoose = require('mongoose');

const connectDb = async () => {
  const URI = process.env.MONGODB_URI;

  if (!URI) {
    console.log("❌ MONGODB_URI not found in .env file");
    return;
  }

  try {
    // Recommended setting
    mongoose.set("strictQuery", false);

    // Connect to MongoDB
    await mongoose.connect(URI);

    console.log("✅ Connected to MongoDB Successfully!");
  } catch (error) {
    console.log("❌ Database connection failed");
    console.log("Reason:", error.message);  
  }
};

module.exports = connectDb;
