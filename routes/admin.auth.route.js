const router = require('express').Router();
const userController = require('../controllers/admin.auth.controller')
const testimonialController = require('../controllers/testimonials.controller')
const newsletterController = require('../controllers/newsletter.controller');
const joinNehihController = require('../controllers/joinNehih.controller')
const { verifyToken } = require('../middleware/admin.authorization');

router.post('/register',verifyToken, userController.adminRegister);
router.post('/login', userController.adminLogin);
router.post('/authorize-admin-users',verifyToken, userController.authorizeAdmin );
router.post('/admin-users',verifyToken, userController.getAllUsers);
router.post('/delete-admin-users',verifyToken, userController.deleteAdmin);
router.post('/create-testimonial',verifyToken, testimonialController.createtestimonial);
router.get('/delete-testimonial',verifyToken, testimonialController.deleteTestimonial);
router.get('/newsletters',verifyToken, newsletterController.getAllNewsletterMail);;
router.get('/applications',verifyToken, joinNehihController.getAllNehihApplications );;


module.exports = router;