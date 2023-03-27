const Repair = require('../models/repair.model');

exports.findAllRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'The query has been done',
    results: repairs.length,
    repairs,
  });
};

exports.findOneRepair = async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    repair,
  });
};

exports.createRepair = async (req, res) => {
  const { date, id } = req.body;

  const repair = await Repair.create({
    date,
    id,
  });
  res.status(201).json({
    status: 'success',
    message: 'The user was successfully created',
    repair,
  });
};

exports.updateRepair = async (req, res) => {
  const { repair } = req;
  await repair.update({
    status: 'completed',
  });

  return res.status(200).json({
    status: 'completed',
    message: 'The repair has been updated',
    repair,
  });
};

exports.deleteRepair = async (req, res) => {
  const { repair } = req;
  await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'cancelled',
    message: 'The repair has been deleted',
  });
};
