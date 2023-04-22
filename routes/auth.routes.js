const express = require('express');

/* CONTROLLERS */
const authController = require('../controllers/auth.controller');

/*MIDDLEWARE */
const validations = require('../middlewares/validations.middlewares');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/signup', validations.createUserValidation, authController.signup);

router.post('/login', validations.loginUserValidation, authController.login);

module.exports = router;
