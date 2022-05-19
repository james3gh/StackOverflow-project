import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password, dateOfBirth } = req.body;
  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User do not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json(`Something went wrong`);
  }
};
