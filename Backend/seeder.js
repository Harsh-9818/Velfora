const mongoose = require("mongoose");
const Product = require("./models/Product");
const dotenv = require("dotenv");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed the database
const seedData = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const user = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });
    console.log("Admin user created:", user);

    //Assign the default user ID to each product
    const userId = user._id;

    const sampleProducts = products.map((product) => {
      return { ...product,user: userId }; // Assign the user ID to each product
    });

    // Insert sample products into the database
    await Product.insertMany(sampleProducts);
    console.log("Sample products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with failure
  }
};

seedData()