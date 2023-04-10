const express = require('express');

/*CONTROLLER */
const repairController = require('../controllers/repairs.controller');

/*MIDDLEWARES */
const repairMiddleware = require('../middlewares/repairs.middleware');
const validationMiddleware = require('../middlewares/validations.middlewares');

const router = express.Router();

router
  .route('/')
  .get(repairController.findAllRepairs)
  .post(
    validationMiddleware.repairValidation,
    repairMiddleware.validExistRepair,
    repairController.createRepair
  );

router
  .route('/:id')
  .get(repairMiddleware.validExistRepair, repairController.findOneRepair)
  .patch(
    validationMiddleware.repairValidation,
    repairMiddleware.validExistRepair,
    repairController.updateRepair
  )
  .delete(repairMiddleware.validExistRepair, repairController.deleteRepair);

module.exports = router;
