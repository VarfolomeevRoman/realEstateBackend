import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import registerValidation from "./validations/auth";
import { validationResult } from "express-validator";
import UserModel from "./models/User";
import bcrypt from "bcrypt";

mongoose
  .connect(
    "mongodb+srv://Admin:Password@realestatecluster.jta6bwb.mongodb.net/real?retryWrites=true&w=majority"
  )
  .then(() => console.log("Data base okay"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());
const port = 4444;

app.post(
  "/auth/register",
  registerValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();
    res.json(user);
  }
);
app.listen(port, (err?: Error) => {
  if (err) {
    return console.error(err);
  }
  console.log("Server ok");
});
