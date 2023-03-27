const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRoutes = require('./routes/users.routes');
const repairRoutes = require('./routes/repair.routes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log('Hello from the middleware ✅');
  next();
});

app.use('/api/v1/users', usersRoutes);

app.use('/api/v1/repairs', repairRoutes);

module.exports = app;
