const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { name, email, gender, DOB, password } = req.body;

  // let day=  DOB.slice(0,DOB.indexOf("/"))
  // let month=DOB.slice(DOB.indexOf('/')+1,DOB.indexOf("/")+3)
  // let year=  DOB.slice(DOB.lastIndexOf('/')+1)

  // console.log(day,'day',month,'month',year,'year');

  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }
  const user = await User.findOne({ email: email });

  if (user) {
    return res
      .status(401)
      .send(`User already exist with this email ${user.email}`);
  }
  if (password.length < 5) {
    return res.status(400).send({
      message: "User password can not be less than 5 characters",
    });
  }
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    name: name,
    email: email,
    gender: gender,
    DOB: DOB,
    password: hashPassword,
  });
  newUser
    .save()
    .then((data) => {
      res.status(200).send({ message: "User Added", data });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(401).send({ Error: "Email does not exist" });
    return;
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401).send({ Error: "Password is Incorrect" });
    return;
  }
  try {
    const token = jwt.sign(
      { user_id: user._id, email, role: "user" },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .send({
        message: `LoggedIn Successfully..`,
        status: 200,
        token: token,
        user: user,
      });
  } catch (error) {
    console.log(error);
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};

exports.allUsers = async (req, res) => {
  const user = await User.find();
  if (!user) {
    res.status(401).send({ Error: "No Users" });
    return;
  }

  try {
    res.status(200).send({
      message: `All Users displayed`,
      status: 200,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};

exports.editUser = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  try {
    const response = await User.findByIdAndUpdate(
      id,
      { $set: { name: name } },
      { new: true }
    );
    console.log("res", response);
    if (response === null) {
      return res
        .status(400)
        .send({ message: `No data found against this id ${id}` });
    }
    if (response) {
      res
        .send({
          message: "data Updated Successfully",
        })
        .status(200);
    }
  } catch (error) {
    console.log("error", error);
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("idddd", id);
  const user = await User.findById(id);
  if (!user) {
    res.send("user not found with this id");
    return;
  }

  try {
    const response = await User.findOneAndDelete({ _id: id });
    if (response) {
      res
        .send({
          message: "User Deleted Successfully",
        })
        .status(200);
    }
  } catch (error) {
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};
