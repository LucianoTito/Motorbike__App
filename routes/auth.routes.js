const express = require('express');

/* CONTROLLERS */
const authController = require('../controllers/auth.controller');

/*MIDDLEWARE */
const validations = require('../middlewares/validations.middlewares');
const authMiddleare = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleare.protect);

router.post('/login', validations.loginUserValidation, authController.login);

module.exports = router;
