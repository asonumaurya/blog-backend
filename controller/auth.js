const {
  getGoogleAuthURL,
  getTokens,
  getUserInfo,
} = require("../utils/googleapis");
const User = require("../model/User");

const generateURL = (req, res, next) => {
  res.send({ msg: getGoogleAuthURL(), statusCode: 200, status: "success" });
};

const getAuthTokens = async (req, res, next) => {
  const data = await getTokens(req.query.code);
  res.cookie("authTokens", data, {
    maxAge: 5000000,
    httpOnly: true,
  });
  res.send({ msg: data, statusCode: 200, status: "success" });
};

const getMe = async (req, res, next) => {
  try {
    const data = await getUserInfo(req.cookies.authTokens);

    let doc;
    doc = await User.findOne({ email: data.email });
    if (!doc) {
      doc = await User.create({
        email: data.email,
        family_name: data.family_name,
        given_name: data.given_name,
        profile_picture: data.picture,
      });
    }
    res.send({ msg: doc, statusCode: 200, status: "success" });
  } catch (err) {
    res.send({ msg: err });
  }
};

const routeProtector = async function (req, res, next) {
  try {
    if (!req.cookies.authTokens) {
      throw new Error("you are not authrized please login");
    }
    const data = await getUserInfo(req.cookies.authTokens);
    if (data.verified_email !== true) {
      throw new Error("credential error please login again");
    }
    let doc;
    doc = await User.findOne({ email: data.email });
    req.user = doc;
    next();
  } catch (err) {
    res.send({ msg: err.message });
  }
};

module.exports = { generateURL, getAuthTokens, getMe, routeProtector };
