var express = require('express');
const router = express.Router();
const { productController } = require('../controllers');
const { verifyUser } = require('../middleware/auth.middleware');

router.get('/', verifyUser, productController.get);

module.exports = router;
