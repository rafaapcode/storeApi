import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Employee from '../models/Employee';

dotenv.config();

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      error: ['Token required.'],
    });
  }

  try {
    const { id, email } = jwt.verify(authorization, process.env.TOKEN_SECRET);

    const employee = await Employee.findOne({ where: { id, email } });

    if (!employee) {
      res.status(401).json({
        errors: ['Token expired or invalid'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expired or invalid'],
    });
  }
};
