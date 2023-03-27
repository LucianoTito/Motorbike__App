const express = require('express');

const usersController = require('../controllers/users.controller');

const userMiddleware = require('../middlewares/users.middleware');

const router = express.Router();

router
  .route('/')
  .get(usersController.findAllUsers)
  .post(userMiddleware.validUsers, usersController.createUser);

router
  .route('/:id')
  .get(userMiddleware.validExistUser, usersController.findOneUser)
  .patch(
    userMiddleware.validUsers,
    userMiddleware.validExistUser,
    usersController.updateUser
  )
  .delete(userMiddleware.validExistUser, usersController.deleteUser);

module.exports = router;
