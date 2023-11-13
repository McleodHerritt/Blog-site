const router = require("express").Router();
const { blogPost, comments, user } = require("../../models");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const allPosts = await blogPost.findAll({
      include: [{ model: blogPost }],
    });
    res.json(allPosts); // Send the retrieved posts as a JSON response
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).send("An error occurred while fetching the posts");
  }
});

module.exports = router;
