const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const { comparePassword } = require("../../utils/auth");
const withAuth = require("../../middleware/authMiddleware");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user: user, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
