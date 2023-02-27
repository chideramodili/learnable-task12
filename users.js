app.post("/api/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    await user.save(function(err) {
      if (!err) {
        return res
          .status(500)
          .json({ message: "Error when creating User", error: err });
      }
      return res
        .status(200)
        .json({ message: "User created successfully", data: user });
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
