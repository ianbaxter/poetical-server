const router = require("express").Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Load post model
const Post = require("../../model/Post");
const Comment = require("../../model/Comment");

// @route GET api/home
// @description Get all posts or Get all posts with matching tag
// @access Public
router.get("/", (req, res) => {
  if (req.query.tag) {
    console.log("Get posts tagged: " + req.query.tag);
    Post.find({ tags: req.query.tag })
      .then((posts) => res.json(posts))
      .catch((err) =>
        res.status(404).json({ error: "No posts were found with tag" + tag })
      );
  } else if (req.query.username) {
    console.log("Get posts by: " + req.query.username);
    Post.find({
      $or: [
        { username: req.query.username },
        { "collaborators.username": req.query.username },
      ],
    })
      .then((posts) => res.json(posts))
      .catch((err) =>
        res.status(404).json({ error: "No posts were found by " + username })
      );
  } else {
    console.log("Get all posts");
    Post.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(404).json({ error: "No posts were found" }));
  }
});

// @route POST api/home
// @description Add new post
// @access Public
router.post("/", (req, res) => {
  console.log("Adding new post");
  Post.create(req.body)
    .then((post) => res.json({ msg: "Post added successfully" }))
    .catch((err) => res.status(400).send("Unable to save data"));
});

// @route GET api/home/:id
// @description Get a single post or all comments for a post
// @access Public
router.get("/:id", (req, res) => {
  console.log("Getting single post and comments");
  Post.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "parentId",
        as: "comments",
      },
    },
  ])
    .then((post) => res.json(post[0]))
    .catch((err) => res.status(404).json({ error: "No post was found" }));
});

// @route GET api/home/:id
// @description Delete post
// @access Public
router.delete("/:id", (req, res) => {
  console.log("Deleteing post with ID: " + req.params.id);
  let deletePost = Post.findByIdAndDelete(req.params.id);
  let deleteComments = Comment.deleteMany({
    parentId: ObjectId(req.params.id),
  });
  Promise.all([deletePost, deleteComments])
    .then(() => res.json({ msg: "Post deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such post exists" }));
});

// @route PUT api/home/:id
// @description Update post
// @access Public
router.put("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post.currentUser || !req.body.currentUser) {
        console.log("Updating " + req.params.id);
        Post.findByIdAndUpdate(req.params.id, req.body).then((post) =>
          res.json({ msg: "Post updated successfully" })
        );
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => res.status(404).json({ error: "No such post exists" }));
});

// @route POST api/home/:id
// @description Add new comment
// @access Public
router.post("/:id", (req, res) => {
  console.log("Adding new comment to post: " + req.params.id);
  Comment.create(req.body)
    .then((comment) => res.json({ msg: "Comment added successfully" }))
    .catch((err) => res.status(400).send("Unable to save data"));
});

module.exports = router;
