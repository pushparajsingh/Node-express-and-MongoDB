const Users = require("../models/userSchema");
const errorMiddleware = require("../middleware/error");
const sendCookie = require("../utils/features");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  try {
    const { name, phoneNo, email, password, cpassword } = req.body;
    const user = await Users.findOne({ email });
    if (user)
      return errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "User already Exist",
        },
        res
      );
    if (password === cpassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Users.create({
        name,
        phoneNo,
        email,
        password: hashedPassword,
      });
      errorMiddleware(
        {
          statusCode: 200,
          success: true,
          message: "User register successfully",
        },
        res
      );
    } else {
      return errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "password and confirm password not be same",
        },
        res
      );
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select("+password");
    if (!user)
      return errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "Invalid Email or Password",
        },
        res
      );
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      errorMiddleware(
        {
          statusCode: 400,
          success: false,
          message: "Password is incorrect",
        },
        res
      );
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      statusCode:200,
      success: true,
      message: "Logout successfully..."
    });
};

module.exports = {
  register,
  login,
  logout,
};
