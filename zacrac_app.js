require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./src/connection/zacrac_database");
const userRoutes = require("./src/users_profile/routes/user.routes");

const app = express();

connectDB();
const port = process.env.PORT || 3050;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(mongoSanitize());

app.use("/api/v1/user", userRoutes);


app.listen(port, () => {
  console.log(`Zacra App is running on port, http://localhost:${port}`);
});
