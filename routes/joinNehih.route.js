const router = require('express').Router();
const joinNehihController = require('../controllers/joinNehih.controller')

router.post('/join', joinNehihController.nehihApplications);

module.exports = router;