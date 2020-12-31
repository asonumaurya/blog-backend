const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "Email must be provided."],
  }, // String is shorthand for {type: String}
  family_name: String,
  given_name: String,
  profile_picture: String,
  phone: Number,
  role: {
    type: String,
    enum: ["superAdmin", "admin", "writer", "premimumReader", "reader"],
    default: "reader",
  },
  image: {
    type: String,
    default: "https://source.unsplash.com/random/100x100",
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
