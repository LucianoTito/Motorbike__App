const User = require('./users.model');
const Repair = require('./repair.model');

// Definimos la función que establece la relación entre los modelos
const initModel = () => {
  // Establecemos que un usuario puede tener muchas reparaciones
  User.hasMany(Repair, { foreignKey: 'userId' });
  // Establecemos que una reparación pertenece a un solo usuario
  Repair.belongsTo(User, { foreignKey: 'userId' });
};

// Exportamos la función para poder usarla en otros archivos
module.exports = initModel;
