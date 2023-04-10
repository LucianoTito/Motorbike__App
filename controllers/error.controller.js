const AppError = require('../utils/appError');
/* importamos la clase AppError para poder utilizarla en la función handleCastError22P02 */
const handleCastError22P02 = () =>
  new AppError('Some type of data send does not match as expected', 400);
/* esta función genera un error de tipo de datos (por ejemplo, cuando se espera un número y se envía una cadena) con la clase AppError */

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack:
      err.stack /*en esta línea enviamos el error pero más detallado, es una propiedad del stack de errores */,
    error: err,
  });
};
/* función para manejar los errores en fase de desarrollo, que devuelve información detallada del error (incluyendo el stack trace) para poder depurar el problema */

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};
/* función para manejar los errores en fase de producción, que devuelve información limitada del error para no exponer información sensible al usuario final */

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = err;

    /* Comprobamos si el error es un error de tipo de datos relacionado con la base de datos, que tiene un código específico (22P02).
    Si es así, generamos un nuevo error con la función handleCastError22P02 y lo enviamos con sendErrorProd. */
    if (error.parent?.code === '22P02') error = handleCastError22P02();

    sendErrorProd(error, res);
  }
};
/* función de middleware que maneja los errores globales de la aplicación.
Si el entorno de ejecución es de desarrollo, se llama a la función sendErrorDev para manejar el error.
Si el entorno de ejecución es de producción, se llama a sendErrorProd para manejar el error y, si el error es de tipo de datos de la base de datos, se genera un nuevo error con handleCastError22P02. */

module.exports = globalErrorHandler;
