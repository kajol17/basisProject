const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter.js");
const postRouter = require("./routes/postRouter.js");
const commentRouter = require("./routes/commentRouter.js");

require("dotenv").config();
mongodb_connection_string = process.env.DATABASE_URL;
mongoose.connect(mongodb_connection_string, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
app.use(express.json());
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

var server_port = process.env.SERVER_PORT;
app.listen(server_port, () => console.log("Server started"));
