const Repair = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.validExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return next(new AppError('Repair with status:pending, not found', 404));
  }
  req.repair = repair;
  next();
});
