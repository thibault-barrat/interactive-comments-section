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
  /**
   * Create a new comment
   * @param {Object} req
   * @param {Object} res
   */
  createComment: async (req, res) => {
    try {
      const userId = req.user.id;

      for (let property in req.body) {
        if (req.body[property].length === 0 && property !== "replying_to") {
          return res.status(400).send({
            errorMessage: `${property} can't be empty!`,
          });
        }
      }

      const comment = new Comment(req.body);
      await comment.createOne(userId);
      res.status(201).send({
        created: true,
      });
    } catch (error) {
      console.log('erreur', error);
      res.status(500).send(error);
    }
  }
};

module.exports = commentController;