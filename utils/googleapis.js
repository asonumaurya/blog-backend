const { google } = require("googleapis");
const axios = require("axios");
require("dotenv").config({ path: "config.env" });

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIET_ID,
  process.env.GOOGLE_CLIET_SECRET,
  `http://127.0.0.1:5000`
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

function getGoogleAuthURL() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
}

async function getTokens(code) {
  let tokensData = null;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    tokensData = tokens;
  } catch (err) {
    tokensData = err;
  }
  return tokensData;
}

async function getUserInfo(tokens) {
  let googleUser = null;
  try {
    // Fetch the user's profile with the access token and bearer
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    );
    googleUser = res.data;
  } catch (err) {
    googleUser = err;
  }

  return googleUser;
}

module.exports = { getGoogleAuthURL, getTokens, getUserInfo };
