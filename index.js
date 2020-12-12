const express = require("express");
require("dotenv").config({ path: "config.env" });
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send({ msg: "hello world", statusCode: 200, status: "success" });
});
app.all("*", function (req, res) {
  res.send({ msg: "route not found", statusCode: 400, status: "failed" });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
