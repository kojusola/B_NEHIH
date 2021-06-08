const router = require('express').Router();
const { verifyToken } = require('../middleware/admin.authorization');
const articleController = require('../controllers/articles.controller')

router.post('/create',verifyToken, articleController.createArticle);
router.post('/update',verifyToken, articleController.updateArticle);
router.post('/updateImage',verifyToken, articleController.updateArticleImage);
router.delete('/delete',verifyToken, articleController.deleteArticle);
router.get('/', articleController.getAllArticle);
router.get('/single', articleController.getOneArticle);
router.get('/publish',verifyToken, articleController.publishArticle);

module.exports = router;