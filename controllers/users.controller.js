const User = require('../models/users.model');

// Controlador para obtener todos los usuarios que están activos en la base de datos
exports.findAllUsers = async (req, res) => {
  // Utilizamos el método `findAll` de Sequelize para obtener todos los usuarios que tienen el estado "true"
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  // Enviamos la respuesta con los usuarios obtenidos
  res.status(200).json({
    status: 'success',
    message: 'The query has been done',
    results: users.length,
    users,
  });
};

// Controlador para obtener un usuario específico
exports.findOneUser = async (req, res) => {
  const { user } = req;

  // Enviamos la respuesta con el usuario obtenido
  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    user,
  });
};

// Controlador para crear un usuario
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Utilizamos el método `create` de Sequelize para crear un nuevo usuario en la base de datos
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Enviamos la respuesta con el usuario creado
  res.status(201).json({
    status: 'success',
    message: 'The user was successfully created',
    user,
  });
};

// Controlador para actualizar un usuario existente
exports.updateUser = async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  // Utilizamos el método `update` de Sequelize para actualizar los datos del usuario
  await user.update({
    name,
    email,
  });

  // Enviamos la respuesta indicando que la actualización se ha realizado con éxito
  return res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { user } = req;

  // Utilizamos el método `update` de Sequelize para cambiar el estado del usuario a "disabled"
  await user.update({
    status: 'disabled',
  });

  // Enviamos la respuesta indicando que el usuario ha sido eliminado
  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
};
