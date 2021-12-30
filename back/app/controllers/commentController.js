const Comment = require("../models/comment");

const commentController = {
  /**
   * Return json with all comments
   * @param {Object} req 
   * @param {Object} res 
   */
  getAllComments: async (req, res) => {
    try {
      const comment = new Comment();
      await comment.findAll();
      res.status(200).send(comment.allComments);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = commentController;