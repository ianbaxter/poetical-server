const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const checkAuth = require("./routes/api/checkAuth");
dotenv.config();

// Routes
const blogHomeRouter = require("./routes/api/blogHome");
const authRouter = require("./routes/api/auth");

// Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

// Cors
app.use(cors({ origin: true, credentials: true }));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// Use routes
app.use("/api/blogHome", blogHomeRouter);
app.use("/api/auth", authRouter);
app.get("/api/secret", checkAuth, (req, res) =>
  res.send({ text: "Auth success!" })
);

// Start server
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
