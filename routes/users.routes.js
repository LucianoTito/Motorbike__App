const express = require('express');

/*CONTROLLERS */
const usersController = require('../controllers/users.controller');

/*MIDDLEWARES */
const userMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middlewares');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(usersController.findAllUsers)
  .post(
    validationMiddleware.createUserValidation,
    userMiddleware.validUsers,
    usersController.createUser
  );

router

  .route('/:id')
  .use(authMiddleware.protectAccountOwner)
  .get(userMiddleware.validExistUser, usersController.findOneUser)
  .patch(
    validationMiddleware.createUserValidation,
    userMiddleware.validUsers,
    userMiddleware.validExistUser,
    usersController.updateUser
  )
  .delete(
    userMiddleware.validExistUser,
    authMiddleware.restrictTo('client'),
    usersController.deleteUser
  );

module.exports = router;
