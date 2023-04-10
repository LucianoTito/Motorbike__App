const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.validUsers = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    return next(new AppError('the name is required', 400));
  }

  if (!email) {
    return next(new AppError('the email is required', 400));
  }
  if (!password) {
    return next(new AppError('the password is required', 400));
  }

  next();
});

exports.validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('User by status: true, not found', 404));
  }
  req.user = user;
  next();
});
