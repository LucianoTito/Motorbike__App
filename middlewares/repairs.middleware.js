const Repair = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Middleware para validar si existe una reparación pendiente con un ID específico
exports.validExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Busca una reparación con el ID específico y que tenga el estado "pending"
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  // Si no se encuentra la reparación, devuelve un error 404
  if (!repair) {
    return next(new AppError('Repair with status:pending, not found', 404));
  }

  // Si se encuentra la reparación, la agrega al objeto de solicitud y llama al siguiente middleware
  req.repair = repair;
  next();
});
