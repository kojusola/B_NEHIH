const router = require('express').Router();
const { verifyToken } = require('../middleware/admin.authorization');
const commentController = require('../controllers/comments.articles.controller')

router.post('/create',  commentController.createComment);
router.delete('/delete',verifyToken,  commentController.deleteComment);

module.exports = router;