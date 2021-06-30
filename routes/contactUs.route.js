const router = require('express').Router();
const contactUsController = require('../controllers/contactUs.controller')

router.post('/', contactUsController.contactUs);

module.exports = router;