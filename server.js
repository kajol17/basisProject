const express = require("express");
const app = express();
const mongoose = require("mongoose");
const basisRouter = require("./routes/basisRouter");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
app.use(express.json());
app.use("/basisRouter", basisRouter);
app.listen(3000, () => console.log("Server started"));
