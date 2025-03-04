const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const auth = require('../middleware/auth');

router.post('/get-solution',aiController.getResponse) 

module.exports = router;
