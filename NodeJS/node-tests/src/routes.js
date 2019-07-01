const express = require("express");

const routes = express.Router();

const { User } = require("./app/models");

routes.get("/", async (req, res) => {
  const user = await User.create({
    name: "Wagner",
    email: "wagnerdutra1010@gmail.com"
  });

  return res.json({ user });
});

module.exports = routes;
