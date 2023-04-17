const express = require('express');
const morgan = require('morgan'); // middleware para logear requests en consola
const cors = require('cors'); // middleware para manejar CORS

const AppError = require('./utils/appError'); // clase personalizada para manejar errores
const globalErrorHandler = require('./controllers/error.controller'); // controlador personalizado para manejar errores

const usersRoutes = require('./routes/users.routes');
const repairRoutes = require('./routes/repair.Routes');
const authRouter = require('./routes/auth.routes');

const app = express();

/*Middleware para logear requests en consola solo en modo desarrollo. 
En esta sección, se verifica si el ambiente de desarrollo está activado para luego utilizar la librería Morgan, 
la cual permite ver información de las solicitudes HTTP en la consola. */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // middleware para parsear el body de las requests a formato JSON
app.use(cors()); // middleware para manejar CORS

/* RUTAS */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairRoutes);

/*Middleware para manejar errores en caso de que la ruta no exista.
Si se accede a una ruta que no está definida en la aplicación,
se ejecuta este middleware que devuelve un error 404 utilizando la clase AppError.*/
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server 🚧`, 404)
  );
});

// Middleware para manejar errores globales
app.use(globalErrorHandler);

module.exports = app;
