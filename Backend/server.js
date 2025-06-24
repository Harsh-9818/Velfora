const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();
app.use(express.json());

// ====== START CORS CONFIG FIX ======
const corsOptions = {
  origin: [
    "https://velforaclothing.vercel.app",  // your frontend
    "http://localhost:5173",            // for local dev
  ],
  methods: "GET,POST,PUT,DELETE,PATCH",
  // allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
// ====== END CORS CONFIG FIX ======

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome in velfora");
});

//Api Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscriberRoutes);

//Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
