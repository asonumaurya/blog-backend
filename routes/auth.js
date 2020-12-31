const express = require("express");
const authRoute = express.Router();
const { generateURL, getAuthTokens, getMe } = require("../controller/auth");

authRoute.get("/get_url", generateURL);
authRoute.post("/get_tokens", getAuthTokens);
authRoute.get("/get_me", getMe);
module.exports = authRoute;
