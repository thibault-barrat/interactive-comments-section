const User = require("../models/user");

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
          errorMessage: "Email is not valid!"
        });
      }
      // we check password with regex
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(req.body.password)) {
        return res.status(406).send({
          errorMessage: "Password is not valid!"
        });
      }
      // we check if password and confirmPassword are the same
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(406).send({
          errorMessage: "Password and confirmPassword are not the same!"
        });
      }
      const user = new User(req.body);
      await user.createOne();
      // we check if email already exists
      if (user.checkEmail) {
        return res.status(409).send({
          errorMessage: "Email already exists!"
        });
      }
      // we check if username already exists
      if (user.checkUsername) {
        return res.status(409).send({
          errorMessage: "Username already exists!"
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
  }
};

module.exports = userController;