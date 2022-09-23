import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Employee from '../models/Employee';

dotenv.config();

class TokenController {
  async storage(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credentials invalid.'],
        });
      }

      const employee = await Employee.findOne({ where: { email } });

      if (!employee) {
        return res.status(401).json({ errors: ['Employee not found.'] });
      }
      const { id } = employee;

      const checkPass = await employee.checkPassword(password);

      if (!checkPass) {
        return res.status(401).json({
          errors: ['Password incorrect.'],
        });
      }

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ auth: true, token });
    } catch (e) {
      console.log(e);
      return res.status(400).json(null);
    }
  }
}
export default new TokenController();
