const catchAsync = (fn) => {
  /* Definimos una función llamada catchAsync que toma una función fn como parámetro */
  return (req, res, next) => {
    /* La función catchAsync devuelve otra función que toma los parámetros req, res y next */
    fn(req, res, next).catch(
      next
    ) /* Ejecutamos la función fn pasando los parámetros req, res y next. Si hay un error, lo capturamos con el método catch y lo pasamos al siguiente middleware a través del parámetro next */;
  };
};

module.exports = catchAsync;

//En resumen, esta función catchAsync se utiliza como un middleware para capturar y manejar errores asincrónicos que puedan ocurrir en una aplicación Node.js.
//Esta función devuelve una función anidada que ejecuta la función asincrónica fn y si hay un error, lo envía al siguiente middleware a través del parámetro next.
