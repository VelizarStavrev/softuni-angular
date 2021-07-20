const router = require('express').Router();

const requestController = require('./controllers/requestController');

router.use('/', requestController);

module.exports = router;