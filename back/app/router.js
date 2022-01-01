const { Router } = require('express');

// controllers import
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController');
const tokenController = require('./controllers/tokenController');

// middlewares import
const { checkRefreshToken, checkAccessToken } = require('./middlewares/auth');

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
router.post('/logout', checkRefreshToken, userController.logoutUser);

// routes for comments
/**
 * Get all comments
 * @route GET /allComments
 */
 router.get('/allComments', commentController.getAllComments);
/**
 * Create a new comment
 * @route POST /createComment
 */
router.post('/createComment', checkAccessToken, commentController.createComment);
/**
 * Modify a comment content
 * @route PATCH /updateComment
 */
router.patch('/updateComment/:id', checkAccessToken, commentController.updateComment);
/**
 * Increase a comment score
 * @route GET /increaseCommentScore
 */
router.get('/increaseCommentScore/:id', commentController.incrementLikes);
/**
 * Decrease a comment score
 * @route GET /decreaseCommentScore
 */
router.get('/decreaseCommentScore/:id', commentController.decrementLikes);
/**
 * Delete a comment
 * @route DELETE /deleteComment
 */
router.delete('/deleteComment/:id', checkAccessToken, commentController.deleteComment);

 // routes for tokens
/**
 * Generate new tokens
 * @route POST /refreshToken
 */
router.post('/refreshToken', checkRefreshToken, tokenController.generateNewTokens);

// router export
module.exports = router;