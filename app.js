require("dotenv").config();

const express = require("express");
const connectDB = require("./db/index.js");
const userRoute = require("./routes/user.route.js");
const app = express();

const port = process.env.PORT || 8000;

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/api/v1", userRoute);

//setup server to listen on port 8000
const serverStart = async () => {
  app.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${port}`);
  });

  await connectDB();
};
serverStart();
