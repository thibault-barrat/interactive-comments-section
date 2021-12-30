const User = require("../models/user");

const userController = {
  /**
   * Return json with all users
   * @param {Object} req 
   * @param {Object} res 
   */
  getAllUsers: async (req, res) => {
    try {
      const user = new User();
      await user.findAll();
      res.status(200).send(user.allUsers);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;