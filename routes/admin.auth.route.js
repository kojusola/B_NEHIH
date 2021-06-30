const router = require('express').Router();
const userController = require('../controllers/admin.auth.controller')
const testimonialController = require('../controllers/testimonials.controller')
const newsletterController = require('../controllers/newsletter.controller');
const joinNehihController = require('../controllers/joinNehih.controller')
const { verifyToken } = require('../middleware/admin.authorization');

router.post('/register', userController.adminRegister);
router.post('/login', userController.adminLogin);
router.post('/create-testimonial', testimonialController.createtestimonial);
router.get('/delete-testimonial', testimonialController.deleteTestimonial);
router.get('/newsletters', newsletterController.getAllNewsletterMail);;
router.get('/applications', joinNehihController.getAllNehihApplications );;


module.exports = router;