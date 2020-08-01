const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// DB
const connectDB = require("./db/db");
connectDB();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/product"));

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
