const express = require('express');

/*CONTROLLER */
const repairController = require('../controllers/repairs.controller');

/*MIDDLEWARES */
const repairMiddleware = require('../middlewares/repairs.middleware');
const validationMiddleware = require('../middlewares/validations.middlewares');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas las rutas que se ejecuten debajo de router.use() van a estar protegidas
router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairController.findAllRepairs)
  .post(
    validationMiddleware.repairValidation,
    repairMiddleware.validExistRepair,
    repairController.createRepair
  );

router
  .route('/:id')
  .use(authMiddleware.restrictTo('employee'))
  .get(repairMiddleware.validExistRepair, repairController.findOneRepair)
  .patch(
    validationMiddleware.repairValidation,
    repairMiddleware.validExistRepair,
    repairController.updateRepair
  )
  .delete(repairMiddleware.validExistRepair, repairController.deleteRepair);

module.exports = router;
