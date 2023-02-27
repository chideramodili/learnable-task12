const express = require("express");
const router = express.Router();
router.use(express.json());

const User = require("./Typescript/User");
const { validation } = require("./validation");

router.post("/api/users", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router.post;
