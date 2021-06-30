const router = require('express').Router();
const testimonialController = require('../controllers/testimonials.controller')

router.post('/add', testimonialController.getAlltestimonials);

module.exports = router;