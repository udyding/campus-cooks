require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { FRONTEND_ADDRESS, DATABASE_URI } = require("./config");
const mongoose = require("mongoose");

let app = express();
const PORT = 5555;

const login = require("./signIn/routes");
const postings = require("./postings/routes");
const post = require("./post/routes");
const user = require("./userInfo/routes");
const updateInfo = require("./updateInfo/routes");
const deletePost = require("./deletePost/routes");

const router = express.Router();
// third party middleware
app.use(
  cors({
    origin: FRONTEND_ADDRESS,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": FRONTEND_ADDRESS,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, authentication",
    "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": true,
  });
  next();
});

app.use("/login", login);
app.use("/postings", postings);
app.use("/post", post);
app.use("/user", user);
app.use("/updateInfo", updateInfo);
app.use("/deletePost", deletePost);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

// connect to the database
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(`Failed to connect to database. ${err}`));
