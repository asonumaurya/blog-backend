const mongoose = require("mongoose");
const slug = require("slug");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slugTitle: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    category: {
      type: Array,
    },
    writer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

blogSchema.virtual("comments", {
  ref: "Comment", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "blogId", // is equal to `foreignField`
  justOne: false,
  options: { sort: { date: -1 }, limit: 5 }, // Query options, see http://bit.ly/mongoose-query-options
});

blogSchema.pre("save", function (next) {
  this.slugTitle = slug(this.title) + "-" + Date.now();
  next();
});

blogSchema.pre(/^find/, function (next) {
  //   console.log(this);

  this._conditions = { isPublished: true };
  //   console.log(this);
  next();
});

const Blog = mongoose.model("Blog", blogSchema, "blogs");

module.exports = Blog;
