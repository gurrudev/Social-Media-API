import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { jwt } from "jsonwebtoken";

class UserCotroller {
  static getAllUser = async (req, res, next) => {
    let users;

    try {
      users = await User.find();
    } catch (err) {
      console.log(err);
    }

    if (!users) {
      return res.status(401).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
  };

  static signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.error(err);
    }

    if (existingUser) {
      return res.status(201).json({ message: "User already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });

    try {
      await user.save();
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ user });
  };

  static logIn = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userToSend = { ...existingUser._doc };
    delete userToSend.password;

    // Generate a token
    const token = jwt.sign({ userId: existingUser._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    return res.status(200).json({ user: userToSend, token });
  };

  static updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const {
      name,
      email,
      password,
      profile_pic,
      user_title,
      bio,
      location,
      skills,
    } = req.body;

    let user;
    const hashedPassword = bcrypt.hashSync(password);

    try {
      user = await User.findByIdAndUpdate(userId, {
        name,
        email,
        password: hashedPassword,
        profile_pic,
        user_title,
        bio,
        location,
        skills,
        blogs: [],
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      return console.log(error);
    }

    if (!user) {
      return res.status(401).json({ message: "No user with this id." });
    }

    return res.status(200).json({ message: "user details has been updated!" });
  };
}

export default UserCotroller;
