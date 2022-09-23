import Employee from '../models/Employee.js';

export default async (req, res, next) => {
  const { position } = await Employee.findByPk(req.userId);
  const manager = /manager/gi;
  if (!manager.test(position)) {
    return res.status(401).json({ errors: ['Only managers can create/delete employees'] });
  }

  return next();
};
