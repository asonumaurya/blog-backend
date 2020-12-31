const Comment = require("../model/comment");

const getAllComments = async (req, res, next) => {
  const doc = await Comment.find({});
  res.send({ msg: doc, statusCode: 200, status: "success" });
};
const getAComment = async (req, res, next) => {
  const doc = await Comment.findOne({ slugTitle: req.params.slugTitle });
  res.send({ msg: doc, statusCode: 200, status: "success" });
};
const createAComment = async (req, res, next) => {
  const doc = await Comment.create(req.body);
  res.send({ msg: doc, status: "success", statusCode: 200 });
};

const updateAComment = async (req, res, next) => {
  const doc = await Comment.findByIdAndUpdate(
    { slugTitle: req.params.slugTitle },
    req.body,
    { runValidators: true, new: true }
  );
  res.send({ msg: doc, statusCode: 200, status: "success" });
};
const deleteAComment = async (req, res, next) => {
  const doc = await Comment.findByIdAndDelete({
    slugTitle: req.params.slugTitle,
  });
  res.send({ msg: doc, statusCode: 200, status: "success" });
};

module.exports = {
  getAllComments,
  getAComment,
  createAComment,
  updateAComment,
  deleteAComment,
};
