const router = require('express').Router();
const newsletterController = require('../controllers/newsletter.controller')

router.post('/add', newsletterController.emailRegister);

module.exports = router;