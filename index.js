//const Joi = require("joi");
const authRouter = require("./auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./Typescript/User.js");

dotenv.config();

mongoose.connect(
  " mongodb+srv://dandelion:dandilion@cluster0.1r2a8mm.mongodb.net/test",

  { useNewUrlParser: true },
  () => console.log("connected to db")
);
const express = require("express");
const app = express();
app.use(express.json());

let rooms = [
  {
    id: 1,
    name: "room1"
  },
  { id: 2, name: "room2" },
  { id: 3, name: "room3" }
];

//to get all rooms
app.get("/api/rooms", (req, res) => {
  res.send(rooms);
});
// to add a room
app.post("/api/rooms", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    res.status(400).send(error);
  }

  const room = {
    id: rooms.length + 1,
    name: req.body.name
  };
  rooms.push(room);

  res.send(room);
});

//to get a specific room
app.get("/api/rooms/:roomid", (req, res) => {
  let room = rooms.find(c => c.id === parseInt(req.params.roomid));
  if (!room) res.status(404).send("the room with the given id was not found");
  res.send(room);
});
// to update a room
app.put("/api/rooms/:roomid", (req, res) => {
  let room = rooms.find(c => c.id === parseInt(req.params.roomid));
  if (!room) res.status(404).send("the room with the given id was not found");

  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    res.status(400).send(error);
  }
  room.name = req.body.name;
  res.send(room);
});

/*function validate(room) {
  schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(room, schema);
}*/
app.delete("/api/rooms/:roomid", (req, res) => {
  let room = rooms.find(c => c.id === parseInt(req.params.roomid));
  if (!room) res.status(404).send("the room with the given id was not found");

  const index = rooms.indexOf(room);
  rooms.splice(index, 1);

  res.send(room);
});
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

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`running on port ${port}......`));
