const User = require('../models/users.model');

exports.findAllUsers = async (req, res) => {
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
};

exports.findOneUser = async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    user,
  });
};

exports.createUser = async (req, res) => {
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
};

exports.updateUser = async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been update',
  });
};

exports.deleteUser = async (req, res) => {
  const { user } = req;
  await user.update({
    status: 'disabled',
  });
  res.status(200).json({
    status: 'success',
    message: 'The product has been deleted',
  });
};
