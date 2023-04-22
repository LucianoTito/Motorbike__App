const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

// Controlador para obtener todos los usuarios que están activos en la base de datos
exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done',
    results: users.length,
    users,
  });
});

// Controlador para obtener un usuario específico
exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    user,
  });
});

// Controlador para crear un usuario
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was successfully created',
    user,
  });
});

// Controlador para actualizar un usuario existente
exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
});

// Controlador para eliminar un usuario
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});
