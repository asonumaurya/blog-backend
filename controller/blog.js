const Blog = require("../model/Blog");

const getAllBlogs = async (req, res, next) => {
  const doc = await Blog.find().populate("writer").populate("comments");
  res.send({ msg: doc, statusCode: 200, status: "success" });
};

const getABlog = async (req, res, next) => {
  const doc = await Blog.findOne({ slugTitle: req.params.slugTitle })
    .populate({
      path: "writer",
      select: {
        family_name: 1,
        given_name: 1,
        profile_picture: 1,
        _id: 0,
      },
    })
    .populate("comments");
  res.send({ msg: doc, statusCode: 200, status: "success" });
};
const createABlog = async (req, res, next) => {
  const doc = await Blog.create({ ...req.body, writer: req.user._id });
  res.send({
    msg: doc,
    statusCode: 200,
    status: "success",
  });
};
const updateABlog = async (req, res, next) => {
  const doc = await Blog.findByIdAndUpdate(
    { slugTitle: req.params.slugTitle },
    req.body,
    { runValidators: true, new: true }
  );
  res.send({ msg: doc, statusCode: 200, status: "success" });
};
const deleteABlog = async (req, res, next) => {
  const doc = await Blog.findByIdAndDelete({ slugTitle: req.params.slugTitle });
  res.send({ msg: doc, statusCode: 200, status: "success" });
};

module.exports = {
  getAllBlogs,
  getABlog,
  createABlog,
  updateABlog,
  deleteABlog,
};
