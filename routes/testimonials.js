const router = require('express').Router();
const testimonialController = require('../controllers/testimonials.controller')

router.post('/add',verifyToken, testimonialController.getAlltestimonials);

module.exports = router;