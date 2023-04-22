require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initmodels');

db.authenticate()
  .then(() => console.log('Database Authenticate ✔'))
  .catch((error) => console.log(error));

/*Sincronización con la base de datos */

initModel();

db.sync()
  .then(() => console.log('Database Synced ✔'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`App running on port ${port} ✔ ...`);
});
