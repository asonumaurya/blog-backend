const express = require("express");
const cookieParser = require("cookie-parser");
const blogRoute = require("./routes/blog");
const authRoute = require("./routes/auth");
const commentRoute = require("./routes/comment");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/auths", authRoute);
app.use("/api/v1/comments", commentRoute);

app.all("*", function (req, res) {
  res.send({ msg: "route not found", statusCode: 400, status: "failed" });
});

module.exports = app;
