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
const homeRouter = require("./routes/api/home");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const accountRouter = require("./routes/api/account");

// Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
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
app.use("/api/home", homeRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/account", checkAuth, accountRouter);

// Start server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log(`Server listening on ${port}`));
