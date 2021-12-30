const { Router } = require('express');

// controllers import
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController');

// router
const router = Router();

// routes for users
/**
 * Get all users
 * @route GET /allUsers
 */
router.get('/allUsers', userController.getAllUsers);

// routes for comments
/**
 * Get all comments
 * @route GET /allComments
 */
 router.get('/allComments', commentController.getAllComments);

// router export
module.exports = router;