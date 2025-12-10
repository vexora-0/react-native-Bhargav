const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/grocery_homework";

const seedProducts = [
  {
    name: "Red Apple",
    price: 40,
    imageUrl: "https://via.placeholder.com/150",
    category: "Fruits",
    stock: 50,
    description: "Fresh red apples",
  },
  {
    name: "Banana Bunch",
    price: 30,
    imageUrl: "https://via.placeholder.com/150",
    category: "Fruits",
    stock: 100,
  },
  {
    name: "Spinach Pack",
    price: 20,
    imageUrl: "https://via.placeholder.com/150",
    category: "Vegetables",
    stock: 70,
  },
  {
    name: "Milk 1L",
    price: 50,
    imageUrl: "https://via.placeholder.com/150",
    category: "Dairy",
    stock: 200,
  },
  {
    name: "Paneer 200g",
    price: 120,
    imageUrl: "https://via.placeholder.com/150",
    category: "Dairy",
    stock: 40,
  },
  {
    name: "Carrot kg",
    price: 35,
    imageUrl: "https://via.placeholder.com/150",
    category: "Vegetables",
    stock: 80,
  },
];

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to mongo — seeding...");
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Seed complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

