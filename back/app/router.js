const { Router } = require('express');

// controllers import
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController');

// router
const router = Router();

// routes for users
/**
 * Sign up route
 * @route POST /register
 */
router.post('/register', userController.createNewUser);
/**
 * Sign in route
 * @route POST /login
 */
router.post('/login', userController.loginUser);
/**
 * Logout route
 * @route POST /logout
 */
router.post('/logout', userController.logoutUser);

// routes for comments
/**
 * Get all comments
 * @route GET /allComments
 */
 router.get('/allComments', commentController.getAllComments);

// router export
module.exports = router;