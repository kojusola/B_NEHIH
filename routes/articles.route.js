const router = require('express').Router();
const { verifyToken } = require('../middleware/admin.authorization');
const articleController = require('../controllers/articles.controller')

router.post('/create', articleController.createArticle);
router.post('/update', articleController.updateArticle);
router.post('/updateImage', articleController.updateArticleImage);
router.delete('/delete', articleController.deleteArticle);
router.get('/', articleController.getAllArticle);
router.get('/single', articleController.getOneArticle);
router.get('/publish', articleController.publishArticle);

module.exports = router;