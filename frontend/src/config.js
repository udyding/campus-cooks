require("dotenv").config();

const DEV_CONFIG = {
  FRONTEND_ADDRESS: "http://localhost:3000",
  BACKEND_ADDRESS: "http://localhost:5555",
  DATABASE_URI: "mongodb://localhost:27017/campus-cooks",
};

const PROD_CONFIG = {
  BACKEND_ADDRESS: process.env.REACT_APP_BACKEND_ADDRESS,
  FRONTEND_ADDRESS: process.env.REACT_APP_FRONTEND_ADDRESS,
  DATABASE_URI: process.env.REACT_APP_DATABASE_URI,
};

module.exports =
  process.env.NODE_ENV === "development" ? DEV_CONFIG : PROD_CONFIG;
