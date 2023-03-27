const Repair = require('../models/repair.model');

exports.validExistRepair = async (req, res, next) => {
  const { userId } = req.params;
  const repair = await Repair.findOne({
    where: {
      userId,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Repair with userId: ${userId} not found`,
    });
  }
  req.repair = repair;
  next();
};
