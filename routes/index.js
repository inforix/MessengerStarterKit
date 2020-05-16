var express = require('express');
var router = express.Router();
var workflowController = require('../controllers/workflowController');

/* GET home page. */
router.get('/', workflowController.workflow);

module.exports = router;
