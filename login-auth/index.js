import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./Schema/User.js";
import bcrypt from "bcryptjs";
import credentials from "../private.json" with { type: "json" };

main();

function main() {
  const app = express();
  const port = 3000;
  const workingDir = path.resolve();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.sendFile(path.join(workingDir, "/views/index.html"));
  });

  app.get("/login-page", (req, res) => {
    res.sendFile(path.join(workingDir, "/views/login.html"));
  });

  app.get("/signup-page", (req, res) => {
    res.sendFile(path.join(workingDir, "/views/signup.html"));
  });

  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
  });

  app.post("/signup", async (req, res) => {
    await mongoose.connect(credentials.uri);

    bcrypt.hash(req.body.password, 8, async (err, hashedPassword) => {
      if (err) {
        return err;
      }

      const userSchema = mongoose.model("test", User);
      const newUser = new userSchema({
        username: req.body.username,
        password: hashedPassword,
      });

      await newUser.save();
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
