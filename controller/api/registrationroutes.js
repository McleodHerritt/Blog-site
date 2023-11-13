const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const { hashPassword } = require("../../utils/auth");
const withAuth = require("../../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
