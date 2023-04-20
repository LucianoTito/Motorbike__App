const Repair = require('../models/repair.model');

// Obtener todas las reparaciones pendientes
exports.findAllRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });
  // Devolver respuesta con las reparaciones obtenidas
  res.status(200).json({
    status: 'success',
    message: 'The query has been done',
    results: repairs.length,
    repairs,
  });
};

// Obtener una reparación por su ID
exports.findOneRepair = async (req, res) => {
  const { repair } = req;

  // Devolver respuesta con la reparación encontrada
  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    repair,
  });
};

// Crear una nueva reparación
exports.createRepair = async (req, res) => {
  const { date, id } = req.body;

  // Crear nueva reparación con los datos proporcionados en el cuerpo de la solicitud
  const repair = await Repair.create({
    date,
    id,
  });

  // Devolver respuesta con la reparación creada
  res.status(201).json({
    status: 'success',
    message: 'The repair was successfully created',
    repair,
  });
};

// Actualizar el estado de una reparación a "completado"
exports.updateRepair = async (req, res) => {
  const { repair } = req;

  // Actualizar estado de la reparación a "completado"
  await repair.update({
    status: 'completed',
  });

  // Devolver respuesta con la reparación actualizada
  return res.status(200).json({
    status: 'completed',
    message: 'The repair has been updated',
    repair,
  });
};

// Eliminar una reparación estableciendo su estado a "cancelado"
exports.deleteRepair = async (req, res) => {
  const { repair } = req;

  // Establecer estado de la reparación a "cancelado"
  await repair.update({
    status: 'cancelled',
  });

  // Devolver respuesta confirmando que la reparación ha sido eliminada
  res.status(200).json({
    status: 'cancelled',
    message: 'The repair has been deleted',
  });
};
