const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({
  path: "config.env",
});

const dbConnection = require("./config/dbConnection");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/globalError");

// Connect Database
dbConnection();

// Express App
const app = express();

// Middlewares
app.use(express.json()); // Parser

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Show Routes
  console.log(process.env.NODE_ENV);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware For Express Handle Rejection Inside Express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});

// Handle Rejection Outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down....");
    process.exit(1);
  });
});
