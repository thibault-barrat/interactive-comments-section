const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwt");

const userController = {
  /**
   * Create a new user
   * @param {Object} req 
   * @param {Object} res 
   */
  createNewUser: async (req, res) => {
    try {
      // we check if all the fields are filled
      for (const property in req.body) {
        if (req.body[property] === "") {
          return res.status(400).send({
            errorMessage: `${property} can't be empty!`
          });
        }
      }
      // we check email with regex
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(406).send({
          errorMessage: "Email is not valid",
          field: "email"
        });
      }
      // we check password with regex
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(req.body.password)) {
        return res.status(406).send({
          errorMessage: "Password must contains at least 6 characters, one uppercase letter, one number and one special character",
          field: "password"
        });
      }
      // we check if password and confirmPassword are the same
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(406).send({
          errorMessage: "Passwords do not match",
          field: "confirmPassword"
        });
      }
      const user = new User(req.body);
      await user.createOne();
      // we check if email already exists
      if (user.checkEmail) {
        return res.status(409).send({
          errorMessage: "Email already exists",
          field: "email"
        });
      }
      // we check if username already exists
      if (user.checkUsername) {
        return res.status(409).send({
          errorMessage: "Username already exists",
          field: "username"
        });
      }
      // if everything is ok, we send a success message
      return res.status(201).send({
        successMessage: "User created successfully!"
      });
    } catch (error) {
      // we send an error message
      res.status(500).send({
        message: error.message,
      });
    }
  },
  /**
   * Login a user
   * @param {Object} req
   * @param {Object} res
   */
  loginUser: async (req, res) => {
    try {
      const user = new User(req.body);
      // we check if user exists
      await user.checkUserEmail(req.body.email);
      if(!user.checkEmail) {
        return res.status(404).send({
          errorMessage: "User not found!"
        });
      }
      // we check if password is correct
      await user.checkUserPassword();
      if(!user.checkPassword) {
        return res.status(401).send({
          errorMessage: "Password is not correct!"
        });
      }
      // we generate tokens
      const newAccessToken = generateAccessToken({
        id: user.userByEmail[0].id,
      });
      const newRefreshToken = generateRefreshToken({
        id: user.userByEmail[0].id,
      });
      // we save the refresh token in the database
      const refreshTokenObject = new RefreshToken();
      await refreshTokenObject.insertNewToken(newRefreshToken);
      // we send the response
      return res.status(200).send({
        connected: true,
        id: user.userByEmail[0].id,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      // we send an error message
      res.status(500).send({
        message: error.message,
      });
    }
  },
  /**
   * Logout a user
   * @param {Object} req
   * @param {Object} res
   */
  logoutUser: async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const token = new RefreshToken();
    // we delete refresh token from database
    await token.deleteToken(refreshToken);
    // we send a success message
    return res.status(200).send({
      connected: false,
    });
  },
};

module.exports = userController;