const { Router } = require('express');

// controllers import
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController');
const tokenController = require('./controllers/tokenController');

// middlewares import
const { checkRefreshToken } = require('./middlewares/auth');

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

 // routes for tokens
/**
 * Generate new tokens
 * @route POST /refreshToken
 */
router.post('/refreshToken', checkRefreshToken, tokenController.generateNewTokens);

// router export
module.exports = router;