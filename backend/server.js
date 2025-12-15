require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

// --- CORS ---
const corsOptions = {
  origin: "*", // production me temporarily open
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
};
app.use(cors(corsOptions));

// --- Body parser ---
app.use(express.json());

// --- TEST ROUTES ---
app.get("/ping", (req, res) => {
  res.send("Backend working perfectly 🚀");
});
app.get("/api/form", (req, res) => {
  res.send("Form API alive ✅");
});

// --- API ROUTES ---
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

// --- Error middleware ---
app.use(errorMiddleware);

// --- Start server ---
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ server is running at port: ${PORT}`);
  });
});
