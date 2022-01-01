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
  },
  /**
   * Modify a comment content
   * @param {Object} req
   * @param {Object} res
   */
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = new Comment(req.body);
      // we find the comment to update to check if the user is the owner
      await comment.findOne(id);
      if (comment.serviceById.length === 0) {
        return res.status(404).send({
          errorMessage: `Comment with id ${id} not found!`,
        });
      }
      if (comment.serviceById[0].user.id !== req.user.id) {
        return res.status(401).send({
          errorMessage: "You can't modify this comment!",
        });
      }
      await comment.updateContentOne(id);
      res.status(200).send({
        updated: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  /**
   * Increment a comment's likes
   * @param {Object} req
   * @param {Object} res
   */
  incrementLikes: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = new Comment();
      await comment.findOne(id);
      if (comment.serviceById.length === 0) {
        return res.status(404).send({
          errorMessage: `Comment with id ${id} not found!`,
        });
      }
      comment.score = comment.serviceById[0].score + 1;
      await comment.updateScoreOne(id);
      res.status(200).send({
        score: comment.score,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  /**
   * Decrement a comment's likes
   * @param {Object} req
   * @param {Object} res
   */
  decrementLikes: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = new Comment();
      await comment.findOne(id);
      if (comment.serviceById.length === 0) {
        return res.status(404).send({
          errorMessage: `Comment with id ${id} not found!`,
        });
      }
      comment.score = comment.serviceById[0].score - 1;
      await comment.updateScoreOne(id);
      res.status(200).send({
        score: comment.score,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

module.exports = commentController;