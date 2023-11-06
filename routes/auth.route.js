var express = require('express');
const router = express.Router();
const { authController } = require('../controllers')
const validate = require('../validation/validate');
const { loginSchema, registerSchema } = require('../validation/auth.validation')

router.post('/login', validate.body(loginSchema), authController.login);

router.post('/register', validate.body(registerSchema), authController.register);

module.exports = router;
