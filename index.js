const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(cookieParser());
require("dotenv").config();

require("./routes/userRoutes")(app);
mongoose
  .connect("mongodb://localhost/User")
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => console.log("Could not connect to mongodb..", err.message));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to main route" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
