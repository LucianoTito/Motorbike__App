const User = require('./users.model');
const Repair = require('./repair.model');
const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'userId' });
  Repair.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = initModel;
