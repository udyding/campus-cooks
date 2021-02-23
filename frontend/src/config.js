require("dotenv").config();

const DEV_CONFIG = {
  REACT_APP_FRONTEND_ADDRESS: "http://localhost:3000",
  REACT_APP_BACKEND_ADDRESS: "http://localhost:5555",
  REACT_APP_DATABASE_URI: "mongodb://localhost:27017/campus-cooks",
};

const PROD_CONFIG = {
  REACT_APP_BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
  REACT_APP_FRONTEND_ADDRESS: process.env.FRONTEND_ADDRESS,
  REACT_APP_DATABASE_URI: process.env.DATABASE_URI,
};

module.exports =
  process.env.NODE_ENV === "development" ? DEV_CONFIG : PROD_CONFIG;
