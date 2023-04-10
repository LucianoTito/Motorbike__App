class AppError extends Error {
  /* Creamos la clase AppError que extiende la clase nativa de JavaScript Error */
  constructor(message, statusCode) {
    /* Creamos el método constructor que recibe dos parámetros: message y statusCode */
    super(message);
    /* Llamamos al constructor de la clase padre Error y pasamos el parámetro message */

    this.statusCode = statusCode;
    /* Asignamos el valor del parámetro statusCode a la propiedad statusCode de la instancia de la clase AppError */

    this.status = `statusCode`.startsWith('4') ? 'error' : 'fail';
    /* Definimos la propiedad status de la instancia de la clase AppError. Si el statusCode comienza con el número 4, se define como 'error', de lo contrario, se define como 'fail' */

    this.isOperational = true;
    /* Definimos la propiedad isOperational como true. Esta propiedad indica si el error es un error operacional o un error de programación. En este caso, se establece como un error operacional */

    Error.captureStackTrace(this, this.constructor);
    /* Usamos Error.captureStackTrace para capturar la pila de llamadas en el momento en que se crea la instancia de la clase AppError. Esto ayuda a identificar la ubicación del error en el código */
  }
}

module.exports = AppError;
