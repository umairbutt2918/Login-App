const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const sql = "INSERT INTO users (username,email,password) VALUES (?,?,?)";

  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      res.status(500).send("Signup failed");
    } else {
      res.send("Signup successful");
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});