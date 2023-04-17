const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.login = catchAsync(async (req, res, next) => {
  //1. Traernos la información de la req.body
  const { email, password } = req.body;

  //2. Buscar el usuario y revisar si existe

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'active',
    },
  });

  //3. Validar si la constraseña es correcta
  if (!user) {
    return next(new AppError('User could not be found', 404));
  }

  /*comparar las contraseñas */
  if (!(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError('The email or password entered is incorrect', 401)
    );
  }

  // 4. Si todo está correcto, generar el jsonWebToken

  const token = await generateJWT(user.id);

  //5. Enviar la respuesta al cliente

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
