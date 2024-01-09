const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require("./config/db");
colors = require("colors");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { verifyToken } = require("./middleware/verifyToken")


colors.setTheme({
  warn: "yellow",
  debug: "blue",
  error: "red",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database setup
(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`.warn);
  });
})();

// Enable CORS for all routes
app.use(cors());

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", verifyToken, userRoutes);

// error handler
app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error!" });
});



