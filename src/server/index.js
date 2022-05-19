const express = require("express");
const app = express();
const path = require("path");
const sirv = require("sirv");
const port = 3000;
const db = require("../db");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname.replace("/server", ""), "/client"));
app.use(sirv(path.join(__dirname.replace("/server", ""), "/client")));
app.use(express.json());

// handle get on / url
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/users", async (req, res) => {
  await db.connect();
  const users = await db.getUsers();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  await db.connect();
  await db.addUser(req.body);
  res.json({
    msg: "ok",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
