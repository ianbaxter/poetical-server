const router = require("express").Router();

// Load post model
const Post = require("../../model/Post");

// @route GET api/home
// @description Get all posts
// @access Public
router.get("/", (req, res) => {
  console.log("Get all posts");
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ error: "No posts were found" }));
});

// @route GET api/home
// @description Get a single post
// @access Public
router.get("/:id", (req, res) => {
  console.log("Getting single post");
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ error: "No post was found" }));
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
// @description Delete post
// @access Public
router.delete("/:id", (req, res) => {
  console.log("Deleteing post with ID: " + req.params.id);
  Post.findByIdAndDelete(req.params.id)
    .then((post) => res.json({ msg: "Post deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such post exists" }));
});

// @route PUT api/home/:id
// @description Update post
// @access Public
router.put("/:id", (req, res) => {
  console.log("Updating " + req.params.id);
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then((post) => res.json({ msg: "Post updated successfully" }))
    .catch((err) => res.status(404).json({ error: "No such post exists" }));
});

module.exports = router;
