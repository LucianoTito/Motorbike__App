const { body /*método del express validator */ } = require('express-validator');
const { validationResult } = require('express-validator');

/*función para validar los campos */

exports.validateFiedls = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

/*nombre, email y password validation */
exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),

  body('email')
    .notEmpty()
    .withMessage('Email.cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 charaacters'),

  this.validateFiedls,
];

/*Date, motorsNumber, description */

exports.repairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format')
    .toDate()
    .isBefore(new Date())
    .withMessage('Date must be in the past'),

  body('motorsNumber')
    .notEmpty()
    .withMessage('Motors number is required')
    .isNumeric()
    .withMessage('Motors number must be a number'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  this.validateFiedls,
];
